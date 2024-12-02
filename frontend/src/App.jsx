import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchTodos } from './api';
import UserList from './components/UserList';
import TodoList from './components/TodoList';
import AddUserForm from './components/AddUserForm';
import AddTodoForm from './components/AddTodoForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const usersData = await fetchUsers();
        const todosData = await fetchTodos();
        setUsers(usersData);
        setTodos(todosData);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
    loadData();
  }, []);

  const handleUserAdded = (user) => {
    setUsers([...users, user]);
  };

  const handleTodoAdded = (todo) => {
    setTodos([...todos, todo]);
  };

  const handleTodoUpdated = (updatedTodo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };

  const handleTodoDeleted = (deletedTodoId) => {
    setTodos(todos.filter((todo) => todo.id !== deletedTodoId));
  };

  return (
    <div>
      <h1>Users and To-Do List</h1>
      <AddUserForm onUserAdded={handleUserAdded} />
      <UserList users={users} />
      <AddTodoForm onTodoAdded={handleTodoAdded} />
      <TodoList
        todos={todos}
        onTodoUpdated={handleTodoUpdated}
        onTodoDeleted={handleTodoDeleted}
      />
    </div>
  );
};

export default App;


