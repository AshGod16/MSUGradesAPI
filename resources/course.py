from flask_restful import Resource
from models.course import CourseModel


class Course(Resource):

    def get(self, search):
        search_list = search.split('_')  # search query must be space separated
        query = {'term': 'term', 'subject': 'subject', 'code': 'code'}
        for elem in search_list:
            if elem[:2].isalpha() and elem[2:].isdigit():
                query['term'] = "'"+elem[:2].upper()+elem[2:]+"'"
            if elem.isdigit():
                query['code'] = "'"+elem+"'"
            if elem.isalpha() and 1 < len(elem) < 5:
                query['subject'] = "'"+elem.upper()+"'"
        course = CourseModel.find_by_course(query)
        if course['courses']:
            return course
        return {'message': 'Course not found'}, 404


class CourseList(Resource):
    def get(self):
        return {'courses': list(map(lambda x: x.json(), CourseModel.query.all()))}
