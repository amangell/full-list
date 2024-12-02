import React, { useState } from 'react';
import { addTodo } from '../api';

const AddTodoForm = ({ onTodoAdded }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTodo = await addTodo({ task });
      onTodoAdded(newTodo);
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Todo"
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;


