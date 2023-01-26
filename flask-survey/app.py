from flask import Flask, request, render_template, redirect, flash, session
from surveys import satisfaction_survey
from flask_debugtoolbar import DebugToolbarExtension

RESPONSES_KEY = "responses"

app = Flask(__name__)
app.config['SECRET_KEY'] = "no-secret-key"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

@app.route('/')
def home():
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('base.html', title=title, instructions=instructions)

@app.route("/begin", methods=["POST"])
def start_survey():
    session[RESPONSES_KEY] = []
    return redirect("/questions/0")

@app.route('/questions/<int:id>')
def questions(id):
    responses = session.get(RESPONSES_KEY)

    if (responses is None):
        return redirect("/")

    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect("/thank_you")

    if (len(responses) != id):
        flash(f"Invalid question id: {id}.")
        return redirect(f"/questions/{len(responses)}")

    question = satisfaction_survey.questions[id].question
    choices = [satisfaction_survey.questions[id].choices[0], satisfaction_survey.questions[id].choices[1]]

    return render_template('questions.html', question=question, choices=choices)

@app.route('/answer', methods=["POST"])
def answer():
    ans = request.form['ans']
    responses = session[RESPONSES_KEY]
    responses.append(ans)
    session[RESPONSES_KEY] = responses

    if (len(responses) == len(satisfaction_survey.questions)):
        return redirect("/thank_you")
    else:
        return redirect(f"/questions/{len(responses)}")

@app.route('/thank_you')
def thank_you():
    return render_template('thank_you.html')