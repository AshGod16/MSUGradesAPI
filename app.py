from flask import Flask, render_template
from flask_restful import Api
from flask_cors import CORS
from flask_assets import Bundle, Environment

from resources.course import Course

app = Flask(__name__)
CORS(app)

js = Bundle('msuGrades.js', output='main.js')
assets = Environment(app)
assets.register('main_js', js)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grades.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'MSUGrades'

api = Api(app)
api.add_resource(Course, "/grades/<string:search>")


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/contactus')
def contactus():
    return render_template("contactus.html")


@app.route('/interactive')
def interactive():
    return render_template("interactive.html")


def main():
    from db import db
    db.init_app(app)
    app.run(host="3.14.6.168", port=8000, threaded=True)  # <- for actual production
    # app.run(threaded=True) #  <-for local testing


if __name__ == "__main__":
    main()
