import time
from flask import Flask

app = Flask(__name__)

todos = ['Buy milk', 'Go to the gym', 'Learn Python']

@app.route('/create')
 

@app.route('/todos')
def get_todos():
    return {'todos': todos}