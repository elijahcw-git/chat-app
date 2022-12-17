from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv
import os
import psycopg2
import db_functions

app = Flask(__name__, static_folder="./build", static_url_path="/")
cors = CORS(app)
api = Api(app)
load_dotenv()

database_name = os.getenv("DATABASE")
database_username = os.getenv("DATABASE_USERNAME")
database_password = os.getenv("DATABASE_PASSWORD")
headers = {
    "Accept" : "application/json"
}

messages = [{'user' : 'testUser1',
             'message' : 'test message 1'},
             {'user' : 'testUser2',
             'message' : 'test message 2'},
             {'user' : 'testUser3',
             'message' : 'test message 3'},
             {'user' : 'testUser4',
             'message' : 'test message 4'},]

users = [{'user' : 'Brauner'}, {'user' : 'Some User'}, {'user': 'Some other user'}]

@app.route("/app/messages", methods=["GET"])
def get_messages():
    return jsonify({'messages' : messages})

@app.route("/app/messages", methods=["POST"])
def create_messages(): 
    message = {
        'user' : request.json['user'],
        'message' : request.json['message']
    }
    messages.append(message)
    return jsonify({'messages' : messages})

@app.route("/app/users", methods=["GET"])
def get_users():
    return jsonify({"users" : users})

@app.route("/app/users", methods=["POST"])
def create_users():
    new_user = {
        "user" : request.json["user"],
    }
    users.append(new_user)
    return jsonify({'users' : users})


@app.route("/", defaults={"path": ""})
@app.route("/<string:path>")
def index(path):
    try:
        return app.send_static_file(path)
    except:
        return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(port=5001, debug=True)