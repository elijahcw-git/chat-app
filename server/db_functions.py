import psycopg2

conn = psycopg2.connect(
    host=  "localhost",
    database = "chat_app",
    user = "postgres",
    password= "chatapp",
    port = 5432
)


# def get_users():
#     cursor = conn.cursor()
#     cursor.execute("select * from users")
#     conn.commit()
#     cursor.close()
#     conn.close()

def user_login(username, password):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=(%s) AND password=(%s)", (username, password))

    result = cursor.fetchone()
    conn.commit()
    cursor.close()
    if result == None:
        return "No userfound", 403
    else:
        return "user found", 200

    
    # return result
   


def create_new_user(username, email, password):
    print("create users")
    cursor = conn.cursor()
    cursor.execute("insert into users (username, email, password) values (%s, %s, %s)", (username, email, password,))
    conn.commit()
    cursor.close()
    



# def get_messages():
#     print("get messages")

# def get_message(id):
#     print("get message id")

# def create_message(user, text):
#     print("create message")


# messages = [{'user' : 'testUser1',
#              'message' : 'test message 1'},
#              {'user' : 'testUser2',
#              'message' : 'test message 2'},
#              {'user' : 'testUser3',
#              'message' : 'test message 3'},
#              {'user' : 'testUser4',
#              'message' : 'test message 4'},]

# users = [{'user' : 'Brauner'}, {'user' : 'Some User'}, {'user': 'Some other user'}]



# @app.route("/app/messages", methods=["GET"])
# def get_messages():
#     return jsonify({'messages' : messages})

# @app.route("/app/messages", methods=["POST"])
# def create_messages(): 
#     message = {
#         'user' : request.json['user'],
#         'message' : request.json['message']
#     }
#     messages.append(message)
#     return jsonify({'messages' : messages})

# @app.route("/app/users", methods=["GET"])
# def get_users():
#     return jsonify({"users" : users})