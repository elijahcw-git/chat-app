from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv
import os
import psycopg2
import db_functions as database

app = Flask(__name__, static_folder="./build", static_url_path="/")
cors = CORS(app)
api = Api(app)
load_dotenv()

database_name = os.getenv("DATABASE")
database_username = os.getenv("DATABASE_USERNAME")
database_password = os.getenv("DATABASE_PASSWORD")
database_password = os.getenv("DATABASE_PASSWORD")
headers = {
    "Accept" : "application/json"
}

@app.route("/app/login", methods=["POST"])
def login():
    user = request.get_json()
    username = user['username']
    password = user['password']
    result = database.user_login(username, password)
    return result

@app.route("/app/users", methods=["POST"])
def create_users():
    new_user = request.get_json()
    username = new_user['username']
    email = new_user['userEmail']
    password = new_user['userPassword']
    database.create_new_user(username, email, password)
    return new_user, 200

@app.route("/app/users", methods=["GET"])
def get_users():
    all_users = database.get_all_users()
    # return jsonify({"users" : users})
    return jsonify(all_users)




@app.route("/app/messages", methods=["GET"])
def get_messages():
    return jsonify()

@app.route("/app/messages", methods=["POST"])
def create_messages(): 
    message = {
        'user' : request.json['user'],
        'message' : request.json['message']
    }
    
    return jsonify()


@app.route("/", defaults={"path": ""})
@app.route("/<string:path>")
def index(path):
    try:
        return app.send_static_file(path)
    except:
        return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run(port=5001, debug=True)