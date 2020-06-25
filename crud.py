"""Store utility functions here."""

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


def create_project(u_id, p_name, p_type, p_notes, p_rate): 
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


def create_pomodoro(proj_id, pomo_type, pomo_length, pomo_notes, pomo_date, pomo_start, pomo_end): 
    """Create a pomodoro session in the db."""

    pomodoro = Pomodoro(project_id = proj_id, 
                        pomodoro_type = pomo_type, 
                        pomodoro_length = pomo_length, 
                        pomodoro_notes  = pomo_notes, 
                        pomodoro_date = pomo_date,
                        pomodoro_start = pomo_start, 
                        pomodoro_end = pomo_end
                        )

    
    db.session.add(pomodoro)
    db.session.commit()

    return pomodoro 


def get_user_by_email(email): 

    return User.query.filter_by(user_email = email).first()






