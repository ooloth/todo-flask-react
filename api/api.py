import time
from flask import Flask, request

app = Flask(__name__)

todos = [
  {'id': 'abc', 'text': 'Buy milk', 'editing': False}, 
  {'id': 'def', 'text': 'Learn Python', 'editing': False}
]

@app.route('/todos', methods=['GET'])
def get_todos():
  return {'todos': todos}

@app.route('/create', methods=['POST'])
def create_todo():
  request_data = request.get_json()
  todos.append(request_data)
  return {'todos': todos}

@app.route('/delete', methods=['POST'])
def delete_todo():
  request_data = request.get_json()
  todos.remove(request_data)

  return {'todos': todos}

@app.route('/update', methods=['POST'])
def update_todo():
  request_data = request.get_json()
  print(request_data)
  todo_index = todos.index(request_data['original_todo'])
  todos[todo_index] = request_data['updated_todo']
  return {'todos': todos}