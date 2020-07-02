"""Server for TimeTracker app."""

"""It renders the correct template for the user based on user events."""

"""This file retrieves user inputs from the DOM and calls the right f(x)'s to 
manipulate it. This file doesn't access pSQL directly. It uses the utility 
functions in crud.py as a liaison to store/fetch stuff from the SQL db."""

from flask import (Flask, render_template, request, flash, session, redirect)
from model import db, connect_to_db 
import crud
import json 

# Make jinja2 throw errors for undefined vars
from jinja2 import StrictUndefined 

# from flask_wtf import FlaskForm
# from wtforms import SubmitField 

# class SubmitButton(FlaskForm): 
#     login = SubmitField("LOGIN")



app = Flask(__name__)

# Flask instance needs a secret key or flash, session won't work 
app.secret_key = "secret"
app.jinja_env.undefined = StrictUndefined


############## ROUTES AND VIEW FUNCTIONS ####################### 

@app.route('/about', methods=['GET'])
def about(): 
    """View About page."""

    return render_template('about.html')


@app.route('/about', methods=['POST'])
def handle_about(): 
    """Redirect user to login page when LOGIN button is clicked."""

   # How can I handle the submit type button when no values are attached to it? 
   # Check Flask tutorials online. 

    return redirect('/')


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

    new_user = crud.create_user(n_username, n_email, n_password)
    session['user_id'] = new_user.user_id
    flash('Congrats! Your new account has been created.')

    # Display msg on page to confirm. 
    return redirect('/projects')

@app.route('/projects')
def view_projects(): 
    """View existing projects and their details."""

    user = crud.get_user_by_user_id(session['user_id'])
    return render_template('projects.html', projects = user.projects)
    # projects is a named arg (different from a default param)


@app.route('/projects', methods=['POST'])
def show_existing_projects(): 
    """User can select an existing project."""

    if session.get('user_id'):  

        # What if the user has no saved projects in history?
        dropdown = request.form.get('project_dropdown_box')
        if dropdown == 'search_existing_project': 
            # return redirect('/view_project_sessions') // Page doesn't exist yet! 
            # return redirect('/project_sessions') 
            return redirect(f'/session_pg{project_id}')
        elif dropdown == 'create_new_project': 
            return redirect('/new_project')

    else: 
        flash('Please login to see your projects.')
        return redirect('/login')


@app.route('/new_project', methods=['GET'])
def new_project():
    """View 'Create a New Project' page."""

    return render_template('new_project.html')


@app.route('/new_project', methods=['POST'])
def create_new_project(): 
    """Create new project for user."""

    if session.get('user_id'): 
        if request.method == 'POST': 
            np_name = request.form.get('new_project_name')
            np_type = request.form.get('new_project_type')
            np_rate = request.form.get('new_project_rate') 
            np_notes = request.form.get('new_project_notes')

            new_project_obj = crud.create_project(session.get('user_id'), np_name, np_type, np_rate, np_notes)
            # return redirect(f'/session_pg/{new_project_obj.project_id}')

            return redirect(f'/session_pg{new_project_obj.project_id}')
            flash('New project created')

        else: 
            return render_template('new_project.html')
    else: 
        flash('Please create new account or log in first')
        return redirect('/login') 


# Weird bug found! Removing the slash b/n session_pg and <project_id> in @app.route
@app.route('/session_pg<project_id>') 
def session_pg(project_id): 
    """Allow user to select a new or existing Pomodoro session."""

    # Problem w/this f(x); <project_id> keeps getting sent to db instead of project_id (int type)
    project = crud.get_project_by_project_id(project_id)  

    return render_template('session.html', project = project)




@app.route('/save_session', methods=['POST'])
def save_session(): 
    """Allow user to save a completed work session to the database."""

    # request.form.get gets session info from JS
    print('*******')
    project_id = request.form.get('project_id') 
    s_type = request.form.get('session_type') 
    s_len = request.form.get('session_length') 
    s_date = request.form.get('session_date_for_parsing') 
    s_time = request.form.get('session_timestamp') 
    crud.create_pomodoro(project_id, s_type, s_len, "Session Log", s_date, s_time)
    print('*******')

    # Create a Python dictionary in the server to hold info to be rendered in the browser.
    # Convert it to a JSON string before sending it to the client (aka browser) for rendering in HTML
    # Timer.js will convert the JSON string to a JavaScript object before displaying it in the browser.
    session_python_dict = {"session_type": s_type, 
                           "session_length": s_len, 
                           "session_date_for_parsing": s_date, 
                           "session_timestamp": s_time}
            
   
    return json.dumps(session_python_dict)
    # return json.dumps([s_type, s_time]) 
    # response from server 

# create_pomodoro(proj_id, pomo_type, pomo_length, pomo_notes, pomo_date, pomo_start): 


# @app.route('/project_sessions')
# def show_project_sessions(): 
#     """Show all sessions for selected project."""

#     if session.get('user_id'): 
#         # project_name = crud.

#         return render_template('project_sessions.html')



 # Connect to database before calling app.run or Flask can't access db!
if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)