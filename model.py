"""Create model objects for database."""

from flask_sqlalchemy import SQLAlchemy
from datetime import (datetime, time, date)

# Create an instance of SQLAlchemy() 
db = SQLAlchemy() 



############## Define database objects here #####################

class User(db.Model): 
    """User details."""

    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                        primary_key=True, 
                        autoincrement=True,
                        )
    project_id = db.Column(db.Integer, 
                            db.ForeignKey('projects.project_id'),
                            nullable=False,
                          )
    user_name = db.Column(db.String, nullable=False, unique=True)
    user_email = db.Column(db.String, nullable=False, unique=True)
    user_password = db.Column(db.String, nullable=False, unique=True)


    def __repr__(self): 
        """Print user details info to terminal."""

        # Get project_name for projects.project_id and put in f-str? 

        return f'<User: user_id={self.user_id} projects.project_name={self.project_id}>'
               # Is this ^ how we retrieve project.name from another table? 



class Project(db.Model): 
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


    def __repr__(self): 
        """Print project details to terminal."""
        return f'<Projects project_id={self.project_id} project_name={self.project_name}>'


class Pomodoro(db.Model):
    """Details about each Pomodoro session."""

    __tablename__ = "pomodoros"

    pomodoro_id = db.Column(db.Integer,
                            primary_key=True,
                            autoincrement=True,
                            )
    pomodoro_type = db.Column(db.String, nullable=False, unique=False)
    pomodoro_length = db.Column(db.Integer, nullable=False, unique=False)
    pomodoro_notes = db.Column(db.Text)
    pomodoro_date = db.Column(db.String)
    # Need to add these fields to sample_pomodoros.json 
    pomodoro_start = db.Column(db.Datetime)
    pomodoro_end = db.Column(db.Datetime) 


    def __repr__(self): 
        """Print pomodoro details to terminal."""
        info = (
                f'<Pomodoros pomodoro_id={self.pomodoro_id} pomodoro_type={pomodoro_type} pomodoro_length={self.pomodoro_length}>'
               )

        return info


################ Connect to database ############################

def connect_to_db(flask_app, db_name, echo=True): 
    """Connect to pSQL database."""

    app.config["SQLAlchemy_DATABASE_URI"] = f"postgresql:///{db_name}"
    app.config["SQLAlchemy_ECHO"] = True
    app.config["SQLAlchemy_TRACK_MODIFICATIONS"] = False

    db.app = flask_app 
    db.init_app(flask_app)

    print("Connected to the db!")


############### dunder main ################################

if __name__ == '__main__': 

    # We want to use Flask-SQLAlchemy so import Flask 
    from flask import Flask 

    app = Flask(__name__)

    connect_to_db(app, echo=False) 
    print("Flask-SQLAlchemy is now connected to db.")

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    # Create db w/dummy data. 
    db.create_all()
    dummy_data()
