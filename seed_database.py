"""Seed database with dummy data."""

import os 
import json 
import crud 
import model 
import server  
from datetime import datetime, timedelta 


# Call Flask to drop/create timetracker db so you don't have to do it by hand. 
os.system('dropdb timetracker')
os.system('createdb timetracker')

model.connect_to_db(server.app)
model.db.create_all()


########## Populate users table with dummy data ###############
# Open JSON file, read it, and load it for future manipulation
with open('data/sample_users.json') as file: 
    # print(file)
    # print('*******')
    # import pdb; pdb.set_trace()
    user_data = json.loads(file.read())  


# List to contain all users' data for the table
users_in_db = [] 

# Unpack key-value pairs  for each user in JSON string 
for user in user_data: 
    user_name, user_email, user_password = (user['user_name'],
                                            user['user_email'],
                                            user['user_password']
                                            )

    # Create a record for each user in the users table
    user_record = crud.create_user(user_name, user_email, user_password)

    # Append record to the list of users in the db 
    users_in_db.append(user_record)

    # Debugging
    # print("User in db:", users_in_db[0])



############ Populate projects table with dummy data ###############
with open('data/sample_projects.json') as file: 
    project_data = json.loads(file.read())

projects_in_db = []

for project in project_data: 
    p_name, p_type, p_notes, p_rate = (project['project_name'],  
                                       project['project_type'], 
                                       project['project_notes'], 
                                       project['project_rate'] 
                                      )

    project_record = crud.create_project(p_name, p_type, p_notes, p_rate)

    projects_in_db.append(project_record)

    # Debugging
    # print("Project in db:", projects_in_db[0])

############ Populate pomodoros table with dummy data ##############
with open('data/sample_pomodoros.json') as file: 
    pomo_data = json.loads(file.read())

pomos_in_db = [] 

for pomo in pomo_data: 
    # Why do I keep getting a "pomo_type is not defined" error whenever I split 
    # pomo_type and the rest of the line into two separate lines? 
    # I couldn't get my multiline f-string earlier to work either. 
    # I'm getting a "pomodoro_type" is not defined error although this file ran w/o issues earlier. 
    pomo_type, pomo_length, pomo_notes, pomo_date, pomo_start, pomo_end = (pomo['pomodoro_type'],
                                                                           pomo['pomodoro_length'],
                                                                           pomo['pomodoro_notes'], 
                                                                           pomo['pomodoro_date'], 
                                                                           pomo['start_time'],
                                                                           pomo['end_time']
                                                                          )

    # import pdb; pdb.set_trace()

    pomo_record = crud.create_pomodoro(pomo_type, pomo_length, pomo_notes, pomo_date, pomo_start, pomo_end)

    # Debugging 
    # print("pomo_record:", pomo_record)

    pomos_in_db.append(pomo_record)

    # Debugging
    # print("Pomo in db:", pomos_in_db[0])

######################################################################
# print("Good news: No more syntax errors.")
# print("Bad news: Is the db seeding?")

