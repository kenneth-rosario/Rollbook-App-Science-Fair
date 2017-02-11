from __future__ import print_function
from flask import Flask, render_template, url_for, request, json, jsonify, session
from flask.ext.sqlalchemy import SQLAlchemy

import os
import sys
import traceback
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.update(
    PROPAGATE_EXCEPTIONS=True,
    DEBUG=True,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='rollbook.app@gmail.com',
    MAIL_PASSWORD='58pencil3'
)
mail = Mail(app)
db = SQLAlchemy(app)
from model import Users, Group, Students, Parents, Grades


@app.route('/')
@app.route('/index')
def index():
    return render_template('roll-book.html')


@app.route('/create-new-user', methods=['POST'])
def new_user():
    data = json.loads(request.data)
    newUser = Users(fullname=data['fullname'], email=data['email'], school=data['school'], password=data['password'])
    db.session.add(newUser)
    db.session.commit()
    return jsonify(data)

##Server Script meant to be invoked via Ajax
@app.route('/ajax-login', methods=['POST'])
def login():
    #Gets Information sent
    data = json.loads(request.data)
    check = Users.query.filter_by(email=data["email"]).count()
    if check == 1:
        #If the user exists it will authenticate him by comparing
        #the password sent to the one in the database
        temp = Users.query.filter_by(email=data["email"]).one()
        #If it works it will return a Success ,message if not a Failed one
        if data["password"] == temp.password:
            toReturn = temp.restReturn
            toReturn.update({
                "status": "SUCCESS"
            })
            return jsonify(toReturn)
        else:
            return jsonify({
                "status": "FAILED"
            })
    else:
        return jsonify({
            "status": "FAIlED"
        })


@app.route('/get-user/<int:id>')
def get_user_by_id(id):
    objectToReturn = Users.query.filter_by(id=id).one()
    print(objectToReturn.restReturn, file=sys.stderr)
    return jsonify(objectToReturn.restReturn)


@app.route('/create-group', methods=["POST"])
def create_group():
    try:
        data = json.loads(request.data)
        print(data["owner_id"], file=sys.stderr)
        groups = Group.query.filter_by(owner_id=data["owner_id"]).all()
        for i in groups:
            if i.restReturn["name"] == data["name"]:
                return jsonify({
                    "status": "FAILED",
                    "reason": "User already ownes group with the given name"
                })
        newGroup = Group(owner_id=data["owner_id"], name=data["name"])
        db.session.add(newGroup)
        db.session.commit()
        user = Users.query.filter_by(id=data["owner_id"]).one()
        data = user.restReturn
        data.update({
            "status": "SUCCESS"
        })
        return jsonify(data)
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)

@app.route('/create-new-student', methods=['POST'])
def add_student():
    data = json.loads(request.data)
    group = Group.query.filter_by(id=int(data["group"])).one()
    rest = group.restReturn
    print(data, file=sys.stderr)
    try:
        for i in rest["students"]:
            if i["email"] == data["email"]:
                user = Users.query.filter_by(id=data["teacher_id"]).one()
                temp = user.restReturn
                temp.update({
                    "status": "FAILED",
                    "reason": "Student already exists in group"
                })
                return jsonify(temp)
        try:
            parent = Parents.query.filter_by(email=data["pemail"]).one()
        except:
            print("Parent does not exist adding to the db", file=sys.stderr)
            parent = Parents(name=data["fname"], email=data["pemail"], telephone=data["ptel"])
            db.session.add(parent)
            db.session.commit()
        finally:
            parent = Parents.query.filter_by(email=data["pemail"]).one()

        newStudent = Students(parent_id=parent.id, name=data["name"], email=data["email"],
                              teacher_id=int(data["teacher_id"]), group_id=int(data["group"]))
        db.session.add(newStudent)
        db.session.commit()
        newStudent = Students.query.filter_by(email=data["email"],
                                              group_id=group.id).one()
        try:
            theRange = rest["students"][0]["grades"]
            toAdd = []
            for i in range(len(theRange)):
                toAdd = Grades(student_id=newStudent.id, name=theRange[i]["test"], grade=0)
                db.session.add(toAdd)
            if toAdd:
                db.session.commit()
        except:
            print("No prior grades where detected in the group", file=sys.stderr)
        user = Users.query.filter_by(id=int(data["teacher_id"])).one()
        temp = user.restReturn
        temp.update({
            "status": "SUCCESS"
        })
        return jsonify(temp)
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)


@app.route("/remove-grade", methods=["POST"])
def remove_grade():
    try:
        data = json.loads(request.data)
        group = Group.query.filter_by(id=data["group_id"]).one()
        students = group.restReturn["students"]
        print(students, file=sys.stderr)
        for i in students:
            print (i["id"], file=sys.stderr)
            grade_to_remove = Grades.query.filter_by(
                name=data["name"],
                student_id=i["id"]
            ).all()[0]
            db.session.delete(grade_to_remove)
        db.session.commit()
        user = Users.query.filter_by(id=group.owner_id).one()
        temp = user.restReturn
        temp.update({
            "status":"SUCCESS"
        })
        return jsonify(temp)
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)


@app.route("/create-grade", methods=["POST"])
def createGrade():
    counter = 0
    extra_messages = {"ERRORS": []}
    try:
        data = json.loads(request.data)
        print(data, file=sys.stderr)
        print(data[-1], file=sys.stderr)

        integer = [data[-1]]

        for i in data:
            print(i, file=sys.stderr)
            if type(i) is not int:
                student = Students.query.filter_by(email=i["Email"], group_id=data[-1]).one()
                for j in i:
                    if type(i[j]) is not dict:
                        print(i[j], file=sys.stderr)
                        continue
                    else:
                        try:
                            print(j, file=sys.stderr)
                            print(student.id, file=sys.stderr)
                            newGrade = Grades.query.filter_by(name=j, student_id=student.id).one()
                            newGrade.grade = int(i[j]["grade"])
                        except:
                            newGrade = Grades(student_id=student.id, grade=int(i[j]["grade"]), name=str(j))
                        finally:
                            db.session.add(newGrade)
                            db.session.commit()

        user = Users.query.filter_by(id=student.teacher_id).one()
        return jsonify(user.restReturn)
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)


@app.route('/delete-group', methods=['POST'])
def delete_group():
    data = json.loads(request.data)
    to_delete = Group.query.filter_by(id=data["id"]).one()
    try:
        db.session.delete(to_delete)
        db.session.commit()
        user = Users.query.filter_by(id=data["owner_id"]).one()
        temp = user.restReturn
        temp.update({
            "status":"SUCCESS"
        })
        return jsonify(temp)
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)


@app.route('/delete-student', methods=['POST'])
def delete_student():
    try:
        data = json.loads(request.data)
        student_to_delete = Students.query.filter_by(id=data["id"]).one()
        the_id = student_to_delete.teacher_id
        db.session.delete(student_to_delete)
        db.session.commit()
        updated_user = Users.query.filter_by(id = the_id).one()
        return jsonify(updated_user.restReturn)
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)


@app.route('/send-performance-mail', methods=["POST"])
def send_mail():
    try:
        data = json.loads(request.data)
        msg = Message("Performance Overview",
                      sender="rollbook.app@gmail.com",
                      recipients=[data["parents"]["email"],data["email"]])
        msg.body = "Probando Data"
        msg.html = render_template('performance-email-template.html',student=data["student"],
                                   performance=data["performance"],
                                   grades=data["grades"],comments=data["comments"],
                                   teacher=data["teacher"], group=data["group"])
        mail.send(msg)
        return "Mail Sent"
    except :
        e = sys.exc_info()
        traceback.print_exception(*e)
        return "Error Sending message"

