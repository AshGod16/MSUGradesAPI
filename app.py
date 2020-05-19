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
    with open('index.html', 'r') as f:
        return f.read()


@app.route('/contactus')
def contactus():
    with open('contactus.html', 'r') as f:
        return f.read()


@app.route('/interactive')
def interactive():
    with open('interactive.html', 'r') as f:
        return f.read()


def main():
    from db import db
    db.init_app(app)
    app.run(port=5000, threaded=True)


if __name__ == "__main__":
    main()
