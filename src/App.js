import { useEffect, useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('/todos')
      .then(res => res.json())
      .then(data => {
        console.log('data', data)
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
      body: JSON.stringify({ text: todo }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('data', data)
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
          <li>{todo.text}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
