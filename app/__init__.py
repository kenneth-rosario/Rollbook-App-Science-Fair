from __future__ import print_function
from customHelperModules import first_row_excel_length
from flask import Flask, render_template, url_for, request, json, jsonify, session
from flask import redirect as route_redirect
from flask_sqlalchemy import SQLAlchemy
import flask_excel as excel
from datetime import datetime
import random,string
import os
import sys
import traceback
from flask_mail import Mail, Message

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.update(
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME='rollbook.app@gmail.com',
    MAIL_PASSWORD='--------'
)
mail = Mail(app)
db = SQLAlchemy(app)
from model import Users, Group, Students, Parents, Grades, Assistance


@app.route('/')
def redirect():
    state = ''.join(random.choice(string.ascii_uppercase + string.digits)
                    for x in xrange(32))
    session["state"] = state
    print(session, file=sys.stderr)
    return route_redirect('/index?auth_state=%s'%state)
@app.route('/index')
def index():
    print(session,file=sys.stderr)
    try:
        print(request.args.get('auth_state'), file=sys.stderr )

        print(request.args.get('auth_state') == session["state"], file=sys.stderr)
        if request.args.get('auth_state') != session['state']:
                return route_redirect('/')
    except:
        return route_redirect('/')
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
    print(session, file=sys.stderr)
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

@app.route('/add-assistance', methods=["POST"])
def assistance():
    try:
        #First The server receives the data
        data = json.loads(request.data)
        #We will loop through the list of objects which contain an id a checked boolean and techer_id
        for i in data:
            #Retrieve the student with the given ID
            student = Students.query.filter_by(id = i["id"]).one().restReturn
            pushed = False
            #Check if todays date is already in the days Missed
            for j in student["days_missed"]:
                print("comparing:"+j["date"]+" with:"+datetime.utcnow()
                      .strftime("%Y-%m-%d"), file=sys.stderr)
                if j["date"] == datetime.utcnow().strftime("%Y-%m-%d"):
                #If true we will then check if the field is checked or unchecked

                    if not i["checked"]:
                    #If unchecked we will delete the entry from the db
                        to_remove = Assistance.query.filter_by(id=int(j["id"])).one()
                        db.session.delete(to_remove)
                        db.session.commit()
                        pushed = True
                        break
                    #Else we will leave it as if
                    else:
                        pushed = True
                        break
            #If todays date is not in the days missed by the student
            if not pushed:
                #If it is checked we will add it to the db if not we will leave it as if
                if i["checked"]:
                    print(datetime.utcnow().strftime("%Y-%m-%d"), file=sys.stderr)
                    new_assistance = Assistance(student_id= i["id"]
                                                ,date=datetime.utcnow()
                                                .strftime("%Y-%m-%d"))
                    db.session.add(new_assistance)
        db.session.commit()
        #Finally we will find the updated user and respond with a JSON token to the client
        user = Users.query.filter_by(id=int(data[0]["teacher_id"])).one()
        return jsonify(user.restReturn)
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)
        return "Error Sending message"

@app.route('/delete-assistance', methods=["POST"])
def delete_assistance():
    try:
        data = json.loads(request.data)
        toRemove = Assistance.query.filter_by(id=data["id"]).one()
        db.session.delete(toRemove)
        db.session.commit()
        updated_user = Users.query.filter_by(id=data["user_id"]).one()
        return jsonify(updated_user.restReturn)
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)
        return "Error Sending message"

@app.route('/upload-excel', methods=["POST"])
def upload():
    data = request.get_array(field_name="file")
    user_id = request.form["user_id"]
    ##First check; Does the first row contain just one column and if so is that group name
    ## taken in his account?
    print(data[0], file=sys.stderr)
    try:
        if first_row_excel_length(data[0])== 1:
            check_group = Group.query.filter_by(name=data[0][0], owner_id=user_id).count()
            if check_group == 0:
                new_group = Group(name=data[0][0], owner_id=int(user_id))
                db.session.add(new_group)
                db.session.flush()
            else:
                return jsonify({
                    "status":"FAILED",
                    "reason":"The Name given to the group already exists in your account"
                })
            ##Second Check: check that the length of the second row equals 5
            if first_row_excel_length(data[1])== 5:
                #We will now add the entries to the data base
                destination_group = Group.query.filter_by(name=data[0][0],
                                                          owner_id=user_id).one()
                emails_used = []
                email_info_objects = []
                for indx, value in enumerate(data):
                    if indx == 0 or indx == 1:
                        continue
                    else:
                        #Check if parent information exists
                        check_parent = Parents.query.filter_by(email=value[4]).count()
                        the_parent_id = None
                        if check_parent == 1 :
                            parent = Parents.query.filter_by(email = value[4]).one()
                            if value[2] == parent.name:
                                the_parent_id = parent.id
                                print(str(the_parent_id), file=sys.stderr)
                            else:
                                return jsonify({
                                    "status":"FAILED",
                                    "reason":"parent email in row "+ str(indx+1)+" is already in "
                                                                                 "use"
                                })
                        else:
                            new_parent = Parents(name=value[2], email=value[4], telephone=value[3])
                            db.session.add(new_parent)
                            db.session.flush()
                            the_parent_id = Parents.query.filter_by(email=value[4]).one().id
                        ## Now we must add the student
                        print(value[1] in emails_used, file=sys.stderr)
                        if value[1] not in emails_used:
                            new_student = Students(name=value[0], email=value[1], parent_id=the_parent_id, teacher_id=user_id, group_id=destination_group.id)
                            db.session.add(new_student)
                            db.session.flush()
                            emails_used.append(value[1])
                            email_info_objects.append({
                                "row":indx + 1,
                                "email":value[1]
                            })
                            print(emails_used, file=sys.stderr)
                        else:
                            the_index_email = emails_used.index(value[1])
                            print("Inside else", file=sys.stderr)
                            print(emails_used[the_index_email], file=sys.stderr)
                            return jsonify({
                                "status":"FAILED",
                                "reason":"the student email in row: "+str(indx + 1)+" "
                                                                                "already exists in row: "+ str(email_info_objects[the_index_email]["row"])
                            })
                db.session.commit()
                user = Users.query.filter_by(id=int(user_id)).one().restReturn
                user.update({
                    "status":"SUCCESS"
                })
                return jsonify(user)

            else:
                return jsonify({
                    "status":"FAILED",
                    "reason": "The header should be of length 5; found "
                            + str(first_row_excel_length(data[1]))
        })
        else:
            return jsonify({
                "status":"FAILED",
                "reason":"First Row in excel document should contain only one column, instead found "
                         +str(first_row_excel_length(data[0]))
            })
    except:
        e = sys.exc_info()
        traceback.print_exception(*e)
        return "Error Sending message"

@app.route('/view-excel-guidelines')
def guidelines():
    return render_template('excel-template.html')
