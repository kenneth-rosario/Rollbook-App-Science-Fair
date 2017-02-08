from app import db
# from sqlalchemy.dialects.postgresql import JSON


# One to Many Relationship with Group
# A user or teacher can have many groups in his account but each group corresponds to one specific teacher account
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    fullname = db.Column(db.String(100))
    password = db.Column(db.String(100))
    school = db.Column(db.String(100))
    # Groups = db.relationship('Group', backref=db.backref("users", lazy='joined'), lazy='joined')
    students = db.relationship('Students', backref="teacher", lazy="joined")

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
    #
    # id = db.Column(db.Integer, primary_key=True)
    # teacher_id = db.Column(db.Integer, db.ForeignKey('Users.id'))
    # name = db.Column(db.String(50))
    # email = db.Column(db.String(50))
    #
    # def __init__(self, name, email):
    #     self.name = name
    #     self.email = email


# Many to Many Relationship between Group and Students Tables
# A group can have many students, but each student can have many Groups within one teacher account
group_to_students = db.Table(
    # Helper table to map the student id to its corresponding group
    "group_to_students",
    db.Column('group_id', db.Integer, db.ForeignKey('group.id')),
    db.Column('student_id', db.Integer, db.ForeignKey('students.id'))
)

class Parents(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    telephone = db.Column(db.Integer)
    email = db.Column(db.Integer)
    name = db.Column(db.String(50))
    student = db.relationship('Students', backref='parents', lazy="joined" )
    @property
    def restReturn(self):
        return{
            "id":self.id,
            "child_id":self.child_id,
            "telephone":self.telephone,
            "email":self.email,
            "name":self.name,
        }
class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(50))
    students = db.relationship('Students', secondary=group_to_students,
                               backref='group', lazy='dynamic')
    users = db.relationship('Users',backref="group", lazy="joined")

    @property
    def restReturn(self):
        students = self.students
        newObjects = []
        for i in students:
            newObjects.append(i.restReturn)
        return{
            "id": self.id,
            "name": self.name,
            "owner_id": self.owner_id,
            "students": newObjects
        }
# One to many relationship between Students and Grade
# A student can have many grades but a grade can only belong to one specific student
class Students(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    groups = db.relationship("Group", secondary=group_to_students, backref="studentsList", lazy="dynamic")
    parent = db.relationship("Parents")
    def __init__(self, name, email, teacher_id):
        self.name = name
        self.email = email
        self.teacher_id = teacher_id
    @property
    def restReturn(self):
        return{
            "id":self.id,
            "name":self.name,
            "email": self.email,
            "teacher_id":self.teacher_id,
            "parents":self.parents
        }
class Grades(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    grade = db.Column(db.Integer, nullable=False)
    name = db.Column(db.Integer)
    students = db.relationship('Students',
                               backref=db.backref('grades', lazy='dynamic'))
