from flask import Flask, render_template, flash, redirect, url_for, request
import os
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

if __name__ == "__main__":
    app.debug = True
    app.run()
