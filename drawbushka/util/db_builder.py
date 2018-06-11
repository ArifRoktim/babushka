import sqlite3   #enable control of an sqlite database
import csv       #facilitates CSV I/O

f="../data/db.db"

db = sqlite3.connect(f) #open if f exists, otherwise create
c = db.cursor()    #facilitate db ops


def create_db():
    command = "CREATE TABLE IF NOT EXISTS users(id INTEGER, username TEXT)"
    c.execute(command)

def add_user(username):
    command = "SELECT id FROM users ORDER BY id DESC"
    c.execute(command)
    id = c.fetchone()
    if (id == None):
        id = 0
    id = id[0] +1
    command = "INSERT INTO users VALUES(" + str(id) + ",'" + username + ")"
    c.execute(command)

create_db()

db.commit() #save changes
db.close()  #close database
