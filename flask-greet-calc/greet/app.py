from flask import Flask

app = Flask(__name__)

@app.route('/welcome')
def welcome():
    return "welcome"

@app.route('/welcome/<type_welcome>')
def welcome_home(type_welcome):
    if type_welcome == 'home':
        return "welcome home"
    if type_welcome == 'back':
        return "welcome back"