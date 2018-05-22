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

if __name__ == "__main__":
    app.debug = True
    app.run()
