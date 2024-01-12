import React, { useState } from 'react';

async function fetchData(setTodos, title, desc) {

    await fetch('http://192.168.1.10:5000/create', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: desc,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://192.168.1.10:5000/todos');
    const data = await response.json();
    setTodos(data);
}


function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();

  return (
    <div>
      <div>
        Title:
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        Description:
        <input
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
      </div>
      <button
        onClick={async() => {
          await fetchData(setTodos,title,desc);
        }}
      >
        Fetch Todos
      </button>
      <ul>
        {todos.map((todo) => (
          <div>
          <li key={todo._id}>{todo.title}<br/>{todo.description}</li>
          <button id={todo._id} onClick={async()=>{
            await fetch('http://192.168.1.10:5000/remove', {
      method: 'DELETE',
      body: JSON.stringify({
        id:todo._id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://192.168.1.10:5000/todos');
    const data = await response.json();
    setTodos(data);
          }}>Mark As Done</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
