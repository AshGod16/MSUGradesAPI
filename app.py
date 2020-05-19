from flask import Flask
from flask_restful import Api

from flask_cors import CORS, cross_origin
from resources.course import Course

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grades.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'MSUGrades'
api = Api(app)

api.add_resource(Course, "/grades/<string:search>")


@cross_origin(headers=['https://msu-grades-api.herokuapp.com/'])
def main():
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)


if __name__ == "__main__":
    main()
