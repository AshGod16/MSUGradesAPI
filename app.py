from flask import Flask
from flask_restful import Api

from flask_cors import CORS
from resources.course import Course

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grades.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'MSUGrades'
api = Api(app)

api.add_resource(Course, "/grades/<string:search>")


@app.route('/')
def index():
    fp = open("index.html", "r")
    return fp.read()


@app.route('/contactus')
def index():
    fp = open("contactus.html", "r")
    return fp.read()


@app.route('/interactive')
def index():
    fp = open("interactive.html", "r")
    return fp.read()


def main():
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)


if __name__ == "__main__":
    main()
