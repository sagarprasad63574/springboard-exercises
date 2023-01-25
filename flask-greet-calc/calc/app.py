# Put your app in here.
import operations
from flask import Flask, request
app = Flask(__name__)

@app.route('/add')
def add():
    a = request.args["a"]
    b = request.args["b"]
    return f"{operations.add(int(a), int(b))}"

@app.route('/sub')
def sub():
    a = request.args["a"]
    b = request.args["b"]
    return f"{operations.sub(int(a), int(b))}"

@app.route('/mult')
def mult():
    a = request.args["a"]
    b = request.args["b"]
    return f"{operations.mult(int(a), int(b))}"

@app.route('/div')
def div():
    a = request.args["a"]
    b = request.args["b"]
    return f"{operations.div(int(a), int(b))}"

operators = {
        "add": operations.add,
        "sub": operations.sub,
        "mult": operations.mult,
        "div": operations.div,
        }

@app.route("/math/<calc_type>")
def math(calc_type):
    """Do math on a and b."""

    a = int(request.args["a"])
    b = int(request.args["b"])
    result = operators[calc_type](a, b)

    return f"{result}"