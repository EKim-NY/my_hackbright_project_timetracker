"""Server for TimeTracker app."""

from flask import (Flask, render_template, request, flash, session, redirect)
from model import connect_to_db

# Make jinja2 throw errors for undefined vars
from jinja2 import StrictUndefined 

app = Flask(__name__)

# Flask instance needs a secret key or flash, session won't work 
app.secret_key = "secret"
app.jinja_env.undefined = StrictUndefined


############## ROUTES AND VIEW FUNCTIONS ####################### 

@app.route('/')
def homepage(): 
    """View homepage."""

    user_account = # get user reply from DOM 

    if user_account == 'new_account'
        # redirect to new_account page
    else if user_account == 'login'
        # redirect to login pg 




@app.route('/login')
def login():
    """View login page."""

    # Save user's email, password in new User t
    return render_template('login.html')



@app.route('/new_account')
def new_account(): 
    """Create account for new user."""

    return render_template('new_account.html')



@app.route('/select_session')
def select_session(): 
    """Allow user to select a new or existing Pomodoro session."""




@app.route('/create_session')


@app.route('/repeat_session')


@app.route('/resume_session')


@app.route('/pause_session')


@app.route('/session_complete')


@app.route('/logout')
