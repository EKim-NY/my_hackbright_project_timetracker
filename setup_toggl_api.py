"""Install Toggl API using this file."""

# Python file = Python interpreter; they both execute code. 
# Run this file if you don't want to repeatedly enter code
# in the Python interpreter each time you want to use the Toggl API.  

import os 

api_key = os.environ['TOGGL_API_KEY']

# create a Toggl object and set our API key 
toggl = Toggl()
toggl.setAPIKey(api_key)


# Define functions here 
def get_my_workspaces(): 
    """Get Toggl workspaces."""
    return toggl.getWorkspaces() 


def run_toggl_test(): 

    data = {
        'id': 42,
        'some_key': 'some_value',
        'user_agent': 'TogglPy_test',
    } 

    response = toggl.request("https://www.toggl.com/api/v8/some/endpoint", parameters=data)


def get_workspaces_clients(): 
    """Print all workspaces and clients."""
    for workspace in toggl.getWorkspaces(): 
        print "Workspace name: %s\tWorkspace id:%s" 
                   % (workspace['name'], workspace['id'])
    for client in toggl.getClients(): 
        print "Client name: %s\tClient id:%s" % (client['name'], client['id'])



# Execute code 
response = toggl.request("https://www.toggl.com/api/v8/clients")

# Interact w/API - Sample code
for client in response:
    print "Client name: %s  Client id: %s" % (client['name'], client['id'])

print(get_my_workspaces())

get_workspaces_clients()








