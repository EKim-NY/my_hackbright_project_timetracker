"""Store utility functions here."""

from model import db, User, Project, Pomodoro, connect_to_db


def create_user(user_name, user_email, password):
    """Create a user in the db."""
    
    user = User(user_name = user_name, 
                user_email = user_email, 
                user_password = password
                )

    db.session.add(user)
    db.session.commit()

    return user 


def create_project(p_name, p_type, p_notes, p_rate): 
    """Create a project in the db."""

    project = Project(project_name = p_name,
                      project_type = p_type, 
                      project_notes = p_notes, 
                      project_rate = p_rate
                      )

    db.session.add(project)
    db.session.commit()

    return project 


def create_pomodoro(pomo_type, pomo_length, pomo_notes, pomo_date): 
    """Create a pomodoro session in the db."""

    pomodoro = Pomodoro(pomodoro_type = pomo_type, 
                        pomodoro_length = pomo_length, 
                        pomodoro_notes  = pomo_notes, 
                        pomodoro_date = pomo_date
                        )

    db.session.add(pomodoro)
    db.session.commit()

    return pomodoro 




