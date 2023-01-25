from stories import Story
from flask import Flask, request, render_template
app = Flask(__name__)

@app.route('/')
def show_form():
    return render_template("form.html")

@app.route('/story')
def show_story():
    story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}.""")

    place = request.args.get("place")
    noun = request.args.get("noun")
    verb = request.args.get("verb")
    adjective = request.args.get("adjective")
    plural_noun = request.args.get("plural_noun")

    answer = {"place": place, "noun": noun, "verb": verb, 
            "adjective": adjective, "plural_noun": plural_noun}
    
    result = story.generate(answer)

    return render_template("story.html", result=result)