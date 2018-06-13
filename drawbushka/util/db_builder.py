import sqlite3   #enable control of an sqlite database
import csv       #facilitates CSV I/O
from hashlib import sha256
f="data/db.db"



def create_db():
    db = sqlite3.connect(f)
    c = db.cursor()
    command = "CREATE TABLE IF NOT EXISTS users(id INTEGER, username TEXT, password TEXT)"
    c.execute(command)
    
def add_user(username, password):
    db = sqlite3.connect(f)
    c = db.cursor()
    command = "SELECT username FROM users WHERE username = \'" + username + "\'" #checks if username already exists
    result = c.execute(command)
    if result == None:
        encrypt = sha256(password).hexdigest() #encrypt password
        
        command = "SELECT id FROM users ORDER BY id DESC" #generate id for user
        c.execute(command)
        id = c.fetchone()
        if (id == None):
            id = 0
        id = id[0] +1
        
        command = "INSERT INTO users VALUES(" + str(id) + ",'" + username + "','" + encrypt + "')"
        c.execute(command)
        
        db.commit()
        db.close()
        return True
    else:
        db.close()
        return False    

def auth_user(username, password): #note: this does not differentiate between wrong password and non-existing username
    db = sqlite3.connect(f)
    c = db.cursor()
    entered_password = encrypt = sha256(password).hexdigest()
    command = "SELECT password FROM users WHERE username = \'" + username + "\'"
    actual_password = c.execute(command)

    return (entered_password == actual_password)

    
    
    
if __name__ == "__main__":
    create_db()
