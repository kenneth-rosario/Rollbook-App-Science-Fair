from __future__ import print_function
from flask import Flask, render_template, url_for, request, json, jsonify, session
from flask.ext.sqlalchemy import SQLAlchemy
import os
import sys

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.update(
    PROPAGATE_EXCEPTIONS = True
)
db = SQLAlchemy(app)
from model import Users,Group,Students, group_to_students

@app.route('/')
def index():
    return render_template('roll-book.html')

@app.route('/create-new-user', methods=['POST'])
def new_user():
    data = json.loads(request.data)
    newUser = Users(data['fullname'], data['email'], data['school'], data['password'])
    db.session.add(newUser)
    db.session.commit()
    return jsonify(data)

@app.route('/ajax-login', methods=['POST'])
def login():

        data = json.loads(request.data)
        check = Users.query.filter_by(email=data["email"]).count()
        if check == 1:
            temp = Users.query.filter_by(email=data["email"]).one()
            if data["password"]==temp.password:
                toReturn = temp.restReturn
                toReturn.update({
                    "status": "SUCCESS"
                })
                return jsonify(toReturn)
            else:
                return jsonify({
                    "status":"FAILED"
                })
        else:
            return jsonify({
                "status":"FAIlED"
            })


@app.route('/get-user/<int:id>')
def get_user_by_id(id):
    objectToReturn = Users.query.filter_by(id=id).one()
    print(objectToReturn.restReturn, file=sys.stderr)
    return jsonify(objectToReturn.restReturn)


@app.route('/create-group', methods=["POST"])
def create_group():
    data = json.loads(request.data)
    print(data["owner_id"], file=sys.stderr)
    newGroup = Group(owner_id=data["owner_id"], name=data["name"])
    db.session.add(newGroup)
    db.session.commit()
    user = Users.query.filter_by(id=data["owner_id"]).one()
    data = user.restReturn
    return jsonify(data)

@app.route('/create-new-student', methods=['POST'])
def add_student():
    data = json.loads(request.data)
    print(data, file=sys.stderr)
    if data['multipleGroups']:
        ## Here we are going to add a single student to multiple groups
        print("inside multiple groups", file=sys.stderr)
        try:
            data_to_send = []
            ids = []
            newStudent = object()
            for i in data['group']:
                ids.append(int(i))
            groups =[]
            ## We find the groups selected
            for i in ids:
                groups.append(Group.query.filter_by(id=i).one())
            #CHECK
            counter = 0
            counter_two = 0
            emails=[]
            ## iterate through each one
            for i in groups:
                rest = i.restReturn
                ## we check if the student already exists in that group
                if counter_two==0 and len(rest['students']) != 0:
                    for y in rest['students']:
                        emails.append(y["email"])
                    counter_two+=1
                if data["email"] in emails:
                    data_to_send.append({
                        "status":"FAILED",
                        "reason":"user already exists in group",
                        "groupName":rest['name']
                    })
                ## if he does we will continue to the next iteration and ignore this group
                    continue
                ## if it is the first time we iterate we will bind newStudent to student
                ## instance so we can add it to the db
                if counter == 0:
                        newStudent = Students(name=data["name"], email=data["email"],teacher_id= data["teacher_id"])
                        i.students.append(newStudent)
                        counter+=1
                        db.session.add(i)
                else:
                ## we just add the student to the session
                        i.students.append(newStudent)
                        db.session.add(i)
            ##we commit and return the updated user with the added students to the client
            db.session.commit()
            print(data["teacher_id"], file=sys.stderr)
            user = Users.query.filter_by(id=data["teacher_id"]).one()
            print(user, file=sys.stderr)
            return jsonify(user.restReturn)
        except:
            e=sys.exc_info()[0]
            print(e,file=sys.stderr)
    else:
         try:
             group = Group.query.filter_by(id=int(data['group'])).one()
             rest = group.restReturn
             user = Users.query.filter_by(id=data["teacher_id"]).one()
             if len(rest["students"]) > 0:
                 for i in rest["students"]:
                     if i["email"]==data["email"]:
                         return jsonify(user.restReturn)
             newStudent = Students(name=data["name"], email=data["email"],
                                       teacher_id=data["teacher_id"])
             group.students.append(newStudent)
             db.session.add(group)
             db.session.commit()
             return jsonify(user.restReturn)
         except:
             e = sys.exc_info()[0]
             print(e, file=sys.stderr)




