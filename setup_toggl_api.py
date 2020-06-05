"""Install Toggl API using this file."""

# Python file = Python interpreter; they both execute code. 
# Run this file if you don't want to repeatedly enter code
# in the Python interpreter each time you want to use the Toggl API.  

# In Python interpreter: 
# source secrets.sh BEFORE running this file 


import os 
from toggl.TogglPy import Toggl
import pprint # for pretty printing

api_key = os.environ['TOGGL_API_KEY']

# create a Toggl object and set our API key 
toggl = Toggl()
toggl.setAPIKey(api_key)

# Pretty Printing in the interpreter terminal
pp = pprint.PrettyPrinter(indent=2)

################# Define functions here ############################

def get_my_workspaces(): 
    """Get Toggl workspaces."""

    # Print to terminal 
    pp.pprint(toggl.getWorkspaces())
    
    return toggl.getWorkspaces() 


def get_workspaces(): 
    """Print all workspaces."""

    for workspace in toggl.getWorkspaces(): 
        print ("Workspace name: %s\tWorkspace id:%s" 
                   % (workspace['name'], workspace['id']))


######## Interact w/API - Sample code ############################

# Print only the workspace name and ID. 
get_workspaces() # Works! 
print()
# Print all key-value pairs in object. 
get_my_workspaces()


# response = toggl.request("https://www.toggl.com/api/v8/clients")
# run_toggl_test()

# Replace generic key-value pairs with relevant data.
# def run_toggl_test(): 
#
#     data = {
#         'id': 42,
#         'some_key': 'some_value',
#         'user_agent': 'TogglPy_test',
#     } 

#     response = toggl.request("https://www.toggl.com/api/v8/some/endpoint", parameters=data)






