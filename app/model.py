from app import db, jsonify
# from sqlalchemy.dialects.postgresql import JSON
# One to Many Relationship with Group
# A user or teacher can have many groups in his account but each group corresponds to one specific teacher account
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    fullname = db.Column(db.String(100))
    password = db.Column(db.String(100))
    school = db.Column(db.String(100))
    student = db.relationship('Students', backref="teacher", lazy="joined")

    @property
    def restReturn(self):
        groups = self.group
        newObjects = []
        for i in groups:
            newObjects.append(i.restReturn)
        return{
            "id": self.id,
            "email": self.email,
            "fullname": self.fullname,
            "school": self.school,
            "groups":newObjects
        }

    def __init__(self, fullname, email, school, password):
        self.fullname = fullname
        self.email = email
        self.school = school
        self.password = password


class Parents(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telephone = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    student = db.relationship('Students', backref='parents', lazy="joined")

    def __init__(self, name, email, telephone):
        self.name = name
        self.email = email
        self.telephone = telephone

    @property
    def restReturn(self):
        return{
            "id": self.id,
            "telephone": self.telephone,
            "email": self.email,
            "name": self.name,
        }

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(50))
    users = db.relationship('Users',backref="group", lazy="joined")

    def __init__(self, owner_id, name):

        self.owner_id = owner_id
        self.name = name

    @property
    def restReturn(self):
        students = self.students
        newObjects = []
        for i in students:
            newObjects.append(i.restReturn)
        newObjects.sort(key = lambda x: x["name"])
        return{
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "students": newObjects
        }
# One to many relationship between Students and Grade
# A student can have many grades but a grade can only belong to one specific student
class Students(db.Model):
    '''This is the student table written as a class object
    This is used to get information from the database from within
    python itself.'''

    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'))
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    group_id = db.Column(db.Integer, db.ForeignKey("group.id"))
    groups = db.relationship("Group", backref="students", lazy="joined")
    def __init__(self, name, email, teacher_id, group_id, parent_id):
        self.name = name
        self.email = email
        self.teacher_id = teacher_id
        self.group_id = int(group_id)
        self.parent_id = parent_id
    #Aditional helper method restReturn. it returns the grades sorted by name
    @property
    def restReturn(self):
        toParent=[]
        grades = []
        for i in self.grades:
            grades.append(i.restReturn)
        grades.sort(key=lambda x: x["test"])
        return{
            "id":self.id,
            "name":self.name,
            "email": self.email,
            "teacher_id":self.teacher_id,
            "parents":self.parents.restReturn,
            "grades": grades,
            "group_id": int(self.group_id)
        }

class Grades(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    grade = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String("50"))
    students = db.relationship('Students',
                               backref='grades', lazy="joined", order_by=name)
    
    def __init__(self, student_id, grade, name):
        self.student_id = student_id
        self.grade = grade
        self.name = name
    @property
    def restReturn(self):
        return {
            "test":self.name,
            "id":self.id,
            "grade":self.grade,
            "student_id":self.student_id
        }