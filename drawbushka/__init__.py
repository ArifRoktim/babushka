from flask import Flask, render_template, flash, redirect, url_for, request, session 
import os
import json

app = Flask(__name__)

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
