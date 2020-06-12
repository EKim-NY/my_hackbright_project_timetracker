"""Server for TimeTracker app."""

from flask import Flask, render_template, request, flash, session, redirect
from model import db 
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


@app.route('/login')
def login():
    """View login page."""

    return render_template('login.html')



@app.route('/new_account')
def new_account(): 
    """Create account for new user."""

    return render_template('new_account.html')



@app.route('/select_session')
def select_session(): 
    """Allow user to select a new or existing Pomodoro session."""




# @app.route('/create_session')


# @app.route('/repeat_session')


# @app.route('/resume_session')


# @app.route('/pause_session')


# @app.route('/session_complete')


# @app.route('/logout')

