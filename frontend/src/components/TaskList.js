import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskShow from "./TaskShow";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasksFromBackend();
  }, []);
  useEffect(() => {
    console.log(tasks); // Log the tasks whenever it changes
  }, [tasks]);

  const fetchTasksFromBackend = async () => {
    try {
      const response = await axios.get(
        "https://todoapp-z5iy.onrender.com/api/todos"
      );
      setTasks(response.data);
      setLoading(false);
      console.log(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  const renderTasks = tasks.map((task) => {
    return <TaskShow key={task.id} task={task} />;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{renderTasks}</div>;
}

export default TaskList;
