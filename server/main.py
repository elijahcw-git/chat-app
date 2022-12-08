from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from dotenv import load_dotenv
import os
import psycopg2



app = Flask(__name__)
cors = CORS(app)
api = Api(app)

load_dotenv()

database_name = os.getenv("DATABASE")
database_username = os.getenv("DATABASE_USERNAME")
database_password = os.getenv("DATABASE_PASSWORD")

@app.route('/profile')
def my_profile():
    data = {
        "name": "Elijah",
        "about" :"Hello! I'm a full stack developer that loves python and javascript"
    }

    return data


conn = psycopg2.connect(
    host="localhost",
    database = database_name,
    user = database_username,
    password= database_password
)

cursor = conn.cursor()

cursor.execute("DROP TABLE IF EXISTS chats")
cursor.execute('CREATE TABLE chats (id serial PRIMARY KEY,'
                                 'message varchar (150) NOT NULL,'
                                 'username varchar (50) NOT NULL,'
                                 'pages_num integer NOT NULL,'
                                 'review text,'
                                 'date_added date DEFAULT CURRENT_TIMESTAMP);'
                                 )

conn.commit()
cursor.close()
conn.close()

if __name__ == "__main__":
    app.run(port=5001, debug=True)