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
    # with open('templates/index.html', 'r') as f:
    #     return f.read()


@app.route('/contactus')
def contactus():
    return render_template("contactus.html")
    # with open('templates/contactus.html', 'r') as f:
    #     return f.read()


@app.route('/interactive')
def interactive():
    return render_template("interactive.html")
    # with open('templates/interactive.html', 'r') as f:
    #     return f.read()


def main():
    from db import db
    db.init_app(app)
    app.run(host="0.0.0.0", port=5000, threaded=True)


if __name__ == "__main__":
    main()
