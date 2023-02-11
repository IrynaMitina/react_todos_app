import React, { useState, useEffect } from 'react';

import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [addTodoFormIsVisible, setAddTodoFormIsVisible] = useState(false);
  const [refreshTodos, setRefreshTodos] = useState([true]);

  async function fetchTodos() {
    try {
      const response = await fetch('http://localhost:5555/todos');
      console.log("got response");
      if (!response.ok) {
        throw new Error('non 200 response from /todos');
      }
      const data = await response.json();
      console.log("got data");
      setTodos(data);
    } catch (err) {
      console.log(err.message)
    }
    setRefreshTodos(false);
  }
  useEffect(() => {if (refreshTodos) {fetchTodos()}}, [refreshTodos]);

  function refreshTodosHandler() {
    setRefreshTodos(true);
  }
  
  async function addTodoHandler(note) {
    const response = await fetch('http://localhost:5555/todos', {
      method: 'POST', body: JSON.stringify(note),
      headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();
    console.log(data);
    // setTodos([...todos, note]);
    setRefreshTodos(true);
    setAddTodoFormIsVisible(false);
  }

  function showAddTodoFormHandler() {
    setAddTodoFormIsVisible(true);
  }
  function hideAddTodoFormHandler() {
    setAddTodoFormIsVisible(false);
  }
  
  return (
    <React.Fragment>
      <section>
        <button onClick={refreshTodosHandler}>Refresh TODOs</button>
        <button onClick={showAddTodoFormHandler}>Add TODO Note</button>
      </section>
      {addTodoFormIsVisible && <AddTodoForm onClose={hideAddTodoFormHandler} onAddTodo={addTodoHandler}/>}
      <section>
        <TodoList todos={todos} />
      </section>
    </React.Fragment>
  );
}

export default App;
