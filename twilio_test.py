# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# DANGER! This is insecure. See http://twil.io/secure
account_sid = 'AC24ab7a1a343a1d8a89e910e697b27927'
auth_token = 'e87aea0a0b5260733765357ff9731752'
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Join Earth's mightiest heroes. Like Kevin Bacon.",
                     from_='+12056228672',
                     to='+16462839106'
                 )

print(message.sid)

