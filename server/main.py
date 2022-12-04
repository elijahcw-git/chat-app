from flask import Flask

app = Flask(__name__)

@app.route("/")
def test_function():
    response = {
        "name" : "Elijah",
        "about" : "Flask Test"
    }

    return response


if __name__ == "__main__":
    app.run(host="localhost", port=5001, debug=True)