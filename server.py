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


@app.route('/login', methods=['POST'])
def handle_login(): 
    """Viewer functions to handle login info."""

    email = request.form.get('email')
    password = request.form['password']
    user = crud.get_user_by_email(email)
    if user:  
        # if user exists (ie, user is truthy aka not None) 
        if user.user_password == password: 
            # check if the passwords from the db and from HTML form match 
            session['user_id'] = user.user_id
            # assign value for key 'user_id' in magic session dictionary 
            # we can use this value in any Flask route during this browser session
            return redirect('/projects')
            # redirect user to projects HTML using an explicit return 
    flash('Invalid email or password')
    # Flash an error msg if user doesn't exist 
    return redirect('/login')



@app.route('/new_account')
def new_account(): 
    """Create account for new user."""

    return render_template('new_account.html')



@app.route('/projects')
def show_user_projects(): 
    """Allow user to specify project details."""
    #based on the user in the session 
    #get projects by that user
    #pass the project into the project render_template



    return render_template('projects.html')


@app.route('/new_project', methods=['POST'])
def create_new_project(): 
    """Create new project for user."""
    pass
    #define vars for info from request form on HTML pg (to create new project)
    #use crud.create_project to make new project object 
    #go back to same page 
       # return redirect('/projects')




@app.route('/session_pg')
def session_pg(): 
    """Allow user to select a new or existing Pomodoro session."""

    return render_template('session.html')


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