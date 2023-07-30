import { useState } from "react";
import axios from "axios";

function TaskEdit({ task, onSubmit, onTaskEdited }) {
  const [newTitle, setNewTitle] = useState(task.text);

  const handleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a PUT request to the backend with the updated task data
      const response = await axios.put(
        `http://localhost:3001/api/todos/${task._id}`,
        {
          text: newTitle,
          completed: task.completed,
        }
      );
      console.log(response);

      // If the task is successfully updated on the backend, handle the response here
      console.log("Task updated successfully");

      // Call the onSubmit function to notify the parent component
      onSubmit();
      onTaskEdited({ ...task, text: newTitle });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" onChange={handleChange} value={newTitle} />
      <button type="submit">Save</button>
    </form>
  );
}

export default TaskEdit;
