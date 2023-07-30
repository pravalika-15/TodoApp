import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import TaskShow from "./components/TaskShow";
import "./styles.css";
import axios from "axios";
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTasksFromBackend(); // Call the function to fetch tasks from the backend
  }, []);

  const fetchTasksFromBackend = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/todos"); // Replace with your backend URL
      const tasksFromBackend = response.data;
      // Update TaskList.js with the fetched tasks
      // This will call the fetchtasks function with the data from the backend
      setTasks(tasksFromBackend);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const handleTaskCreated = (newTask) => {
    // Update the tasks state with the newly created task
    setTasks((prevTasks) => [...prevTasks, newTask]);
    // fetchTasksFromBackend();
  };

  const handleTaskDeleted = (deletedTaskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== deletedTaskId)
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleTaskEdited = (editedTask) => {
    // Find the index of the edited task in the tasks array
    const index = tasks.findIndex((task) => task._id === editedTask._id);
    if (index !== -1) {
      // If the edited task is found, update the tasks state with the edited task
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        updatedTasks[index] = editedTask;
        return updatedTasks;
      });
    }
  };
  return (
    <div className="App">
      <CreateTask onTaskCreated={handleTaskCreated} />
      {tasks.map((task) => (
        <TaskShow
          key={task._id}
          task={task}
          onTaskDeleted={handleTaskDeleted}
          onTaskEdited={handleTaskEdited}
        />
      ))}
    </div>
  );
}

export default App;
