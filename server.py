"""Server for TimeTracker app."""

"""It renders the correct template for the user based on user events."""

"""This file retrieves user inputs from the DOM and calls the right f(x)'s to 
manipulate it. This file doesn't access pSQL directly. It uses the utility 
functions in crud.py as a liaison to store/fetch stuff from the SQL db."""

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

@app.route('/', methods=['GET'])
def show_homepage(): 
    """View homepage."""

    return render_template('homepage.html')


@app.route('/', methods=['POST'])
def handle_homepage(): 
    """Send user to new account or login page from homepage."""

    # request.form.get retrieves DOM elements only by name, not by class or id
    result = request.form.get('user_selection') 

    if result == 'new_user':
        return redirect('/new_account')
    elif result == 'existing_user': 
        return redirect('/login')



@app.route('/login', methods=['GET'])
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
    """View new account page."""
    return render_template('new_account.html')


@app.route('/new_account', methods=['POST'])
def create_new_account(): 
    """Create a new user account."""

    n_username = request.form.get('new_username')
    n_email = request.form.get('new_email')
    n_password = request.form.get('new_password')

    crud.create_user(n_username, n_email, n_password)
    flash('Congrats! Your new account has been created.')

    # Display msg on page to confirm. 
    return redirect('/projects')

@app.route('/projects')
def view_projects(): 
    """View existing projects and their details."""

    return render_template('projects.html')


@app.route('/projects', methods=['POST'])
def show_existing_projects(): 

    if session.get('user_id'):  
        user = crud.get_user_by_user_id(session['user_id'])
        return render_template('projects.html', projects = user.projects)

        # What if the user has no saved projects in history?
 
    else: 
        flash('Please login to see your projects.')
        return redirect('/login')




@app.route('/new_project', methods=['POST'])
def create_new_project(): 
    """Create new project for user."""

    if session.get('user_id'): 
        np_name = request.form.get('new_project_name')
        np_type = request.form.get('new_project_type')
        np_rate = request.form.get('new_project_rate') 
        np_notes = request.form.get('new_project_notes')

        crud.create_project(session.get('user_id'), np_name, np_type, np_rate, np_notes)
        return redirect('/session_pg')
    
    else: 
        flash('Please create new account to create a new project or login to see existing projects.')
        return redirect('/login') 





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