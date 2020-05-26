from db import db
import sqlite3


class CourseModel(db.Model):
    __tablename__ = 'grades'
    id = db.Column(db.Integer, primary_key=True)
    term = db.Column(db.String(4))
    subject = db.Column(db.String(4))
    code = db.Column(db.Integer())
    title = db.Column(db.String(80))
    instructor = db.Column(db.String(80))
    total = db.Column(db.Integer())
    average = db.Column(db.Float(precision=4))
    four = db.Column(db.Integer())
    threefive = db.Column(db.Integer())
    three = db.Column(db.Integer())
    twofive = db.Column(db.Integer())
    two = db.Column(db.Integer())
    onefive = db.Column(db.Integer())
    one = db.Column(db.Integer())
    zero = db.Column(db.Integer())
    incomplete = db.Column(db.Integer())
    withdrawn = db.Column(db.Integer())
    passed = db.Column(db.Integer())
    nograde = db.Column(db.Integer())

    def __init__(self, id, term, subject, code, title, instructor, total, average, four, threefive, three, twofive, two, onefive, one, zero, incomplete, withdrawn, passed, nograde):
        self.id = id
        self.term = term
        self.subject = subject
        self.code = code
        self.title = title
        self.instructor = instructor
        self.total = total
        self.average = average
        self.four = four
        self.threefive = threefive
        self.three = three
        self.twofive = twofive
        self.two = two
        self.onefive = onefive
        self.one = one
        self.zero = zero
        self.incomplete = incomplete
        self.withdrawn = withdrawn
        self.passed = passed
        self.nograde = nograde

    def json(self):
        return {'term': self.term, 'subject': self.subject, 'code': self.code, 'title': self.title,
                'instructor': self.instructor, 'total': self.total, 'average': self.average, 'four': self.four,
                'threefive': self.threefive, 'three': self.three, 'twofive': self.twofive, 'two': self.two,
                'onefive': self.onefive, 'one': self.one, 'zero': self.zero, 'incomplete': self.incomplete,
                'withdrawn': self.withdrawn, 'passed': self.passed, 'nograde': self.nograde}

    @classmethod
    def find_by_course(cls, search):
        # query = "SELECT * FROM grades WHERE term="+search['term']+"" \
        #         " AND subject = "+search['subject']+" AND code="+search['code']
        query = "SELECT * FROM grades WHERE term=? AND subject = ? AND code= ?"
        inp = (search['term'], search['subject'], search['code'])
        connection = sqlite3.connect("grades.db")
        cursor = connection.cursor()
        cursor.execute(query, inp)
        courses = cursor.fetchall()
        json = {'courses': []}
        for course in courses:
            c = CourseModel(course[0], course[1], course[2], course[3], course[4], course[5], course[6],
                            course[7], course[8], course[9], course[10], course[11],
                            course[12], course[13], course[14], course[15], course[16],
                            course[17], course[18], course[19])
            json['courses'].append(c.json())
        return json

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
