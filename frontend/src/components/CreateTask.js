import { useState } from "react";
import "../styles.css";
import axios from "axios";

function CreateTask({ onTaskCreated }) {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the backend with the task data
      const response = await axios.post("http://localhost:3001/api/todos", {
        text: task,
        completed: false, // You can add more fields as needed by the backend
      });

      // If the task is successfully created on the backend, handle the response here
      console.log("New task created:", response.data);

      // Clear the input field after creating the task
      onTaskCreated(response.data);
      setTask("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  return (
    <>
      <div className="add-task-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="task">Task:</label>
          <input
            value={task}
            onChange={handleChange}
            type="text"
            id="task"
            name="task"
            placeholder="Enter task here"
            required
          />

          <button type="submit">Add Task</button>
        </form>
      </div>
    </>
  );
}

export default CreateTask;
