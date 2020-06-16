"""Server for TimeTracker app."""

from flask import (Flask, render_template, request, flash, session, redirect)
from model import db, connect_to_db 
import crud

# Make jinja2 throw errors for undefined vars
from jinja2 import StrictUndefined 

app = Flask(__name__)

# Flask instance needs a secret key or flash, session won't work 
app.secret_key = "secret"
app.jinja_env.undefined = StrictUndefined


############## ROUTES AND VIEW FUNCTIONS ####################### 

@app.route('/')
def homepage(): 
    """View homepage; user will be redirected to either the login or new account page."""

     
    return render_template('homepage.html')

    # Debugging
    # return '<html><body><h1>HOMEPAGE</h1></body></html>'

@app.route('/login')
def login():
    """View login page."""

    return render_template('login.html')



@app.route('/new_account')
def new_account(): 
    """Create account for new user."""

    return render_template('new_account.html')



# @app.route('/projects')
# def projects(): 
#     """Allow user to specify project details."""

#     return render_template('projects.html')


# @app.route('/session_details')
# def session_details(): 
#     """Allow user to select a new or existing Pomodoro session."""

#     return render_template('session_details.html')


# @app.route('/pause_session')
# def pause_session():
#     """Allow user to pause/resume a currently active session."""

#     return render_template('pause_session.html')


# @app.route('/delete_session')
# def delete_session():
#     """Delete session from database if user cancels session."""

#     return render_template('delete_session.html')



# @app.route('/logout')
# def logout():
#     """Display end-of-session message upon logout."""

#     return render_template('logout.html')




 # Connect to database before calling app.run or Flask can't access db!
if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)