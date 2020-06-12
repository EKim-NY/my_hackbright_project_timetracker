"""Create model objects for database."""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, time, date

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
    # project_id = db.Column(db.Integer, 
    #                         db.ForeignKey('projects.project_id'),
    #                         nullable=False,
    #                       )
    user_name = db.Column(db.String, nullable=False, unique=True)
    user_email = db.Column(db.String, nullable=False, unique=True)
    user_password = db.Column(db.String, nullable=False, unique=True)


    def __repr__(self): 
        """Print user details info to terminal."""

        # Get project_name for projects.project_id and put in f-str? 

        return f'<User: user_id={self.user_id}>'
               # Is this ^ how we retrieve project.name from another table? 

               # f'<User: user_id={self.user_id} projects.project_name={self.project_id}>'
               # project_id 


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

    # Check w/Kat if this field is ok
    # AttributeError: SQLAlchemy obj. has no 'Datetime' attribute
    # Further research needed; DateTime was used in one of the labs/HWs? 
    project_start = db.Column(db.String)
    project_end = db.Column(db.String) 


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
    pomodoro_start = db.Column(db.String)
    pomodoro_end = db.Column(db.String) 


    def __repr__(self): 
        """Print pomodoro details to terminal."""
        info = (
                f'<Pomodoros pomodoro_id={self.pomodoro_id} pomodoro_type={pomodoro_type} pomodoro_length={self.pomodoro_length}>'
               )

        return info


################ Connect to database ############################

def connect_to_db(flask_app, echo=True): 
    """Connect to pSQL database."""

    # Had to hardcode timetracker in lieu of {db_name} 
    # b/c db_name wasn't defined and timetracker wasn't defined error msgs
    flask_app.config["SQLAlchemy_DATABASE_URI"] = f"postgresql:///timetracker"
    flask_app.config["SQLAlchemy_ECHO"] = True
    flask_app.config["SQLAlchemy_TRACK_MODIFICATIONS"] = True

    db.app = flask_app 
    db.init_app(flask_app)

    print("Connected to the db!")
    


############### dunder main ################################

if __name__ == '__main__': 

    # When user runs model in Terminal, app gets imported from server.py
    # app is passed as an arg called flask_app into connect_to_db f(x)
    # When seed_database is run, 
  
    from server import app 
    # Don't place this at the top of model.py => weird error! 
    # You do not want to import app into every file => 
    # it can cause looping errors! 
    # Only import app when needed from server; 
    # since app was created in server.py 

    
    connect_to_db(app, echo=False)

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.



