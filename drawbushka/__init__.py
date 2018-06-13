from flask import Flask, render_template, flash, redirect, url_for, request, session 
import os
import json

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

@app.route("/draw")
def draw():
    return render_template("draw.html")

@app.route("/logout", methods=["GET", "POST"])
def logout():
    if "username" in session:
        session.pop("username")
    return redirect("/")

if __name__ == "__main__":
    app.debug = True
    app.run()
