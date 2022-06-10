import { useEffect, useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('/todos')
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos)
      })
  }, [])

  return (
    <main>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
