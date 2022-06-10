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
      body: JSON.stringify({ id: JSON.stringify(new Date()), text: todo }),
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

  function handleUpdate(e) {}

  return (
    <main>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="text" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => {
          console.log('todo', todo)
          return (
            <li key={todo.id}>
              {todo.text}
              <button value={JSON.stringify(todo)} onClick={handleDelete}>
                X
              </button>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

export default App
