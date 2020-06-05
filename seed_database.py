"""Seed database with dummy data."""

import os 
import json 
# import crud 
from model import db 
import server  # incomplete
from datetime import datetime 

# Call Flask to drop/create timetracker db so you don't have to do it by hand. 
os.system('dropdb timetracker')
os.system('createdb timetracker')

connect_to_db(server.app)
db.create_all()

with open('')
