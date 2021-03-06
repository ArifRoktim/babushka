from flask import Flask, render_template, flash, redirect, url_for, request, session
import os
import json
import sqlite3
import random

from util import db_builder

app = Flask(__name__)
app.secret_key = "super secret key lmfao"

@app.route("/")
def home():
    if ("user" not in session):
        return render_template("index.html", selection = "h1")
    else:
        return render_template("index.html", selection = None)

@app.route("/login")
def login():
    if ("user" not in session):
        return render_template("login.html")
    else:
        return render_template("index.html", selection = None)

@app.route("/auth", methods=["GET", "POST"])
def auth():
    if "user" in session:
        return redirect("/")

    form = request.form
    username = form["User"]
    password = form["Pass"]
    if db_builder.auth_user(username, password):
        session["user"] = username
        return redirect("/")
    else:
        flash("invalid credentials!")
        return redirect("/login")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/signup", methods=["GET", "POST"])
def signup():
    form = request.form
    username = form['User']
    password = form['Pass']
    confpass = form['confPass']
    if password != confpass:
        flash('The 2 passwords that you entered do not match!')
        return render_template('register.html')

    if db_builder.add_user(username, password):
        return redirect("/")
    else:
        flash('That username has already been taken!')
    return render_template('register.html')

@app.route("/create")
def create():
    if "user" not in session:
        return redirect("/")
    code = int(random.random() * 1000000)
    while db_builder.auth_id(code):
        code = int(random.random() * 1000000)
    db_builder.add_lobby(code, session["user"])

    return render_template("create.html", code_num = code)

@app.route("/join")
def join():
    return render_template("join.html")
@app.route("/draw")
def draw():
    return render_template("draw.html")

@app.route("/wait", methods=["GET", "POST"])
def wait():
    id = request.args['code']
    if db_builder.auth_id(id):
        db_builder.add_player(id, session["user"])
        session["id"] = id
        return render_template("wait.html", id = id)
    else:
        flash('That code is invalid')
        return render_template("join.html")

@app.route("/logout", methods=["GET", "POST"])
def logout():
    if "user" in session:
        session.pop("user")
    return redirect("/")

@app.route("/waitingstatus", methods=["GET", "POST"])
def waitingstatus():
    db = sqlite3.connect("data/db.db")
    c = db.cursor()
    command = "SELECT username from " + request.post["id"]
    return c.execute(command[0]).length

if __name__ == "__main__":
    app.debug = True
    app.run()
