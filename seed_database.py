"""Seed database with dummy data."""

import os 
import json 
import crud 
from model import db 
import server  # incomplete
from datetime import datetime 


# Call Flask to drop/create timetracker db so you don't have to do it by hand. 
os.system('dropdb timetracker')
os.system('createdb timetracker')

connect_to_db(server.app)
db.create_all()


########## Populate users table with dummy data ###############
# Open JSON file, read it, and load it for future manipulation
with open('data/sample_users.json') as file: 
    user_data = json.loads(file.read())

# List to contain all users' data for the table
users_in_db = [] 

# Unpack key-value pairs  for each user in JSON string 
for user in user_data: 
    user_name, user_email, user_password = (user['user_name'],
                                            user['user_email'],
                                            user['password']
                                            )

    # Create a record for each user in the users table
    user_record = crud.create_user(user_name, user_email, password)

    # Append record to the list of users in the db 
    users_in_db.append(user_record)



############ Populate projects table with dummy data ###############
with open('data/sample_projects.json') as file: 
    project_data = json.loads(file.read())

projects_in_db = []

for project in project_data: 
    p_name, p_type, p_notes, p_rate =Project(project['project_name'],  
                                             project['project_type'], 
                                             project['project_notes'], 
                                             project['project_rate'] 
                                            )

    project_record = crud.create_project(p_name, p_type, p_notes, p_rate)

    projects_in_db.append(project_record)


############ Populate pomodoros table with dummy data ##############
with open('data/sample_pomodoros.json') as file: 
    pomo_data = json.loads(file.read())

pomos_in_db = [] 

        "pomodoro_type": "break",
        "pomodoro_length": "15", 
        "pomodoro_notes": "5 min. break",
        "pomodoro_date": "2020-06-05",

for pomo in pomo_data: 
    pomo_type, pomo_length, pomo_notes, pomo_date = Pomodoro(pomo['pomodoro_type'],
                                                             pomo['pomodoro_length'],
                                                             pomo['pomodoro_notes'], 
                                                             pomo['pomodoro_date']
                                                            )

    pomo_record = crud.create_pomodoro(pomo_type, pomo_length, pomo_notes, pomo_date)

    pomos_in_db.append(pomo_record)

