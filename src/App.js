import { useEffect, useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  console.log('todos', todos)

  useEffect(() => {
    fetch('/todos')
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos)
      })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const todo = e.target.text.value

    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: JSON.stringify(new Date()),
        text: todo,
        editing: false,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos)
      })
  }

  function handleDelete(e) {
    const todo = e.target.value

    fetch(`/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: todo,
    })
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos)
      })
  }

  function handleEdit(e) {
    const todoId = e.target.value

    const updatedTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, editing: true }
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  function handleUpdate(e) {
    e.preventDefault()
    const updatedText = e.target.text.value
    const originalTodo = todos.find(todo => todo)

    fetch(`/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        original_todo: { ...originalTodo, editing: false },
        updated_todo: { ...originalTodo, text: updatedText, editing: false },
      }),
    })
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos)
      })
  }

  return (
    <main>
      <h1>Todos</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" name="text" />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpdate={handleUpdate}
          />
        ))}
      </ul>
    </main>
  )
}

function Todo({ todo, handleDelete, handleEdit, handleUpdate }) {
  const [text, setText] = useState(todo.text)

  function handleTextChange(e) {
    setText(e.target.value)
  }
  return (
    <li>
      {todo.editing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={handleTextChange}
          />
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>{todo.text}</p>
      )}

      <button value={todo.id} onClick={handleEdit}>
        Edit
      </button>
      <button value={JSON.stringify(todo)} onClick={handleDelete}>
        X
      </button>
    </li>
  )
}

export default App
