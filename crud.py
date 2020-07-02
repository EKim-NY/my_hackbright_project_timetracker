"""Store utility functions here."""

"""This file acts as a liaison between the server and pSQL. It creates, 
updates, or retrieves data from the pSQL db by the way of SQL-Alchemy."""

from model import db, User, Project, Pomodoro, connect_to_db


def create_user(user_name, user_email, user_password):
    """Create a user in the db."""
    
    user = User(user_name = user_name, 
                user_email = user_email, 
                user_password = user_password
                )

    db.session.add(user)
    db.session.commit()

    return user 


def create_project(u_id, p_name, p_type, p_rate, p_notes): 
    """Create a project in the db."""

    project = Project(user_id = u_id, 
                      project_name = p_name,
                      project_type = p_type, 
                      project_notes = p_notes, 
                      project_rate = p_rate
                      )

    db.session.add(project)
    db.session.commit()

    return project 


def create_pomodoro(proj_id, pomo_type, pomo_length, pomo_notes, pomo_date, pomo_end): 
    """Create a pomodoro session in the db."""

    pomodoro = Pomodoro(project_id = proj_id, 
                        pomodoro_type = pomo_type, 
                        pomodoro_length = pomo_length, 
                        pomodoro_notes  = pomo_notes, 
                        pomodoro_date = pomo_date,
                        pomodoro_timestamp = pomo_end, 
                        )

    
    db.session.add(pomodoro)
    db.session.commit()

    return pomodoro 



def get_user_by_email(email): 
    """SQL query should return user by email."""

    return User.query.filter_by(user_email = email).first()



def get_user_by_user_id(user_id): 
    """SQL query should return all projects associated with user by user_id."""

    return User.query.get(user_id) 
    # Get the user by primary key using this shortcut 
    


def get_project_by_user_id(user_id): 
    """SQL query should return selected project for user_id."""

    return Project.query.filter_by(user_id = user_id).first()



def get_project_by_project_id(project_id): 
    """SQL query should return selected project for project_id."""

    return Project.query.get(project_id) 
    # returns a Project object from SQL using its primary key 



def get_sessions_by_project_id(project_id): 
    """SQL query should return all sessions from all dates for a project using its project_id."""

    return Pomodoro.query.filter_by(project_id = project_id).all()
    # Returns all Pomodoro sessions or Pomodoro objects filtered by project_id 



# # To-do: 
# def get_session_by_project_id_and_date(project_id, date): 
#     """SQL query should return all sessions for user on selected date."""

#     Pomodoro.query.filter_by(user_id)
#     Pomodoro.query.filter_by(pomodoro_date = date).all()
#     Pomodoro.query.filter_by(project_id = project)



