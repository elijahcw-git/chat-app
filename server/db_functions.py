import psycopg2

conn = psycopg2.connect(
    host=  "localhost",
    database = "chat_app",
    user = "postgres",
    password= "chatapp",
    port = 5432
)

# cursor = conn.cursor()

# cursor.execute("insert into users (userId, username) values (%s, %s)", (1, "Elijah"))

# conn.commit()
# cursor.close()
# conn.close()







# def get_users():
#     cursor = conn.cursor()
#     cursor.execute("select * from users")
#     conn.commit()
#     cursor.close()
#     conn.close()


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


