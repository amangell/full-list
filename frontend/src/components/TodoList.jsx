import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../api';

const TodoList = ({ todos, onTodoUpdated, onTodoDeleted }) => {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newTask, setNewTask] = useState('');

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = await updateTodo(todo.id, { completed: !todo.completed });
      onTodoUpdated(updatedTodo);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      onTodoDeleted(todoId);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleRenameTodo = async (todoId) => {
    try {
      const updatedTodo = await updateTodo(todoId, { task: newTask });
      onTodoUpdated(updatedTodo);
      setEditingTodoId(null);
      setNewTask('');
    } catch (error) {
      console.error('Error renaming todo:', error);
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="New task description"
                  required
                />
                <button onClick={() => handleRenameTodo(todo.id)}>Save</button>
                <button onClick={() => setEditingTodoId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span
                  style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  onClick={() => handleToggleComplete(todo)}
                >
                  {todo.task}
                </span>
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                <button onClick={() => {
                  setEditingTodoId(todo.id);
                  setNewTask(todo.task);  // Pre-populate with current task
                }}>
                  Rename
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;




