"""Seed database with dummy data."""

# Use Flask-SQLAlchemy 
from flask import Flask 
from flask_sqlalchemy import SQLAlchemy

# Import datetime, date, time classes from Python module datetime
from datetime import (datetime, datetimeoffset, date)

# Create an instance of SQLAlchemy() 
db = SQLAlchemy() 

# Create an instance of Flask() 
app = Flask() 
app.secret_key = "SECRET"


############## Define database objects here #####################

class UserDetails(db.Model): 
    """User details."""

    __tablename__ = "user_details"

    user_id = db.Column(db.Integer,
                        primary_key=True, 
                        autoincrement=True,
                        )
    project_id - db.Column(db.Integer, 
                            db.ForeignKey('projects.project_id'),
                            nullable=False,
                          )


class Projects(db.Model): 
    """Details about projects; a project is a sequence of Pomodoro sessions."""

    __tablename__ = "projects"

    project_id = db.Column(db.Integer, 
                           primary_key=True, 
                           autoincrement=True,
                           )
    project_name = db.Column(db.String, nullable=False, unique=True,)
    project_type = db.Column(db.String, nullable=False, unique=False,)
    project_notes = db.Column(db.Text, unique=False,)
    project_rate = db.Column(db.Float, unique=False,)

    # Check w/Kat if this field is ok; is DateTime an object in psql? CHECK
    project_start = db.Column(db.Datetime)
    project_end = db.Column(db.Datetime) 


class Pomodoros(db.Model):
    """Details about each Pomodoro session."""

    __tablename__ = "pomodoros"

    pomodoro_id = db.Column(db.Integer,
                            primary_key=True,
                            autoincrement=True,
                            )
    pomodoro_type = db.Column(db.String, nullable=False, unique=False)
    pomodoro_length = db.Column(db.Integer, nullable=False, unique=False)
    pomodoro_start = db.Column(db.Datetime)
    pomodoro_end = db.Column(db.Datetime) 
    pomodoro_notes = db.Column(db.Text)



################ Define functions here ############################

# Connect app with db 
def connect_to_db(app, db_name): 
    """Connect to pSQL database."""

    app.config["SQLAlchemy_DATABASE_URI"] = f"postgresql:///{db_name}"
    app.config["SQLAlchemy_ECHO"] = True
    app.config["SQLAlchemy_TRACK_MODIFICATIONS"] = False

    db.app = app 
    db.init_app(app)



############### Call functions here ################################

# Call function using tablenames. Replace <__tablename__> later w/actual names.
connect_to_db(app, "<__tablename__>")



