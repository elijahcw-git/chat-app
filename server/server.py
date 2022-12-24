from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO, send, emit
from functools import wraps
import os
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__, static_folder="./build", static_url_path="/")
cors = CORS(app)
api = Api(app)
socketio = SocketIO(app, cors_allowed_origins="*")
load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

database_name = os.getenv("DATABASE")
database_username = os.getenv("DATABASE_USERNAME")
database_password = os.getenv("DATABASE_PASSWORD")
database_host = os.getenv("DATABASE_HOST")
database_port = os.getenv("DATABASE_PORT")

conn = psycopg2.connect(
    host=  database_host,
    database = database_name,
    user = database_username,
    password= database_password,
    port = database_port
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    created_date = db.Column(db.DateTime, server_default=db.func.now())
    messages = db.relationship('Message', backref='user')

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    content = db.Column(db.Text)
    created_date = db.Column(db.DateTime, server_default=db.func.now())

# with app.app_context():
#     db.create_all()


@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).first()

    if not user:
        return jsonify({'message' : 'User not found'})

    user_data = {}
    user_data['id'] = user.id
    user_data['username'] = user.username
    
    return jsonify({'user' : user_data})

@app.route('/app/user', methods=['POST'])
def create_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['userPassword'], method='sha256')
    new_user = User(username=data['username'], password=hashed_password)
    username_taken = db.session.query(User).filter_by(username=data['username']).scalar() is not None
    if username_taken == None:
        print(username_taken)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message' : 'User Created Successfully'}),200
    else:
        print("False")
        return jsonify({'message' : "Username already taken"}), 401
    
@app.route('/app/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username).first()
    print(user.id)

    if not user:
         return make_response('Incomplete login information', 403, {'WWW-Authenticate' : 'Basic realm="Login required'})

    if check_password_hash(user.password, password):
        token = jwt.encode({'id' : user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)}, app.config['SECRET_KEY'])
        id = user.id
        response = {
            'token' : token,
            'id' : id
        }
        return jsonify(response), 200

    return make_response('Incomplete login information', 403, {'WWW-Authenticate' : 'Basic realm="Login required'}) 

@app.route('/user', methods=['GET'])
def get_all_users():
    users = User.query.all()
    output = []
    for user in users:
        user_data = {}
        user_data['id'] = user.id
        user_data['username'] = user.username
        output.append(user_data)

    return jsonify({'users' : output})

@app.route('/app/message', methods=['POST'])
def create_message():

    jwt = request.headers.get('Authorization')
    print(jwt)
    # Check if jwt is valid
    data = request.get_json()

    print(data)
    new_message = Message(content=data['messagetext'], user_id=data['user'])
    db.session.add(new_message)
    db.session.commit()

    return jsonify({'message' : "message created!"}), 200


@app.route('/message', methods=['GET'])
def get_all_messages(current_user):
    messages = Message.query.filter_by(id=current_user.id).all()

    output = []

    for message in messages:
        message_data = {}
        message_data['id'] = message.id
        message_data['user_id'] = message.user_id
        message_data['text'] = message.text
        output.append(message_data)

    return jsonify({'messages' : output})

@app.route('/message/<id>', methods=['GET'])
def get_one_message(current_user, id):
    message = Message.query.filter_by(id=id, user_id=current_user.user_id).first()

    if not message:
        return jsonify({'message' : 'No message found!'})

    message_data = {}
    message_data['id'] = message.id
    message_data['user_id'] = message.user_id
    message_data['text'] = message.text

    return jsonify(message_data)

@app.route("/", defaults={"path": ""})
@app.route("/<string:path>")
def index(path):
    try:
        return app.send_static_file(path)
    except:
        return app.send_static_file("index.html")

if __name__ == "__main__":
    socketio.run(app, host='localhost', port=5001, debug=True)