// import { createContext } from "react";
// import axios from "axios";
// import { useState } from "react";
// const TasksContext = createContext();

// function Provider({ children }) {
//   const [tasks, setTasks] = useState([]);
//   const fetchtasks = async () => {
//     const response = await axios.get("http://localhost:3000/tasks");
//     setTasks(response.data);
//   };

//   const createTask = async (title) => {
//     const response = await axios.post("http://localhost:3000/tasks", {
//       title: title,
//       complete: false,
//     });
//     const updatedTasks = [...tasks, response.data];
//     setTasks(updatedTasks);
//     console.log(tasks);
//   };
//   const deleteById = async (id) => {
//     axios.delete(`http://localhost:3000/tasks/${id}`);
//     const updatedTasks = tasks.filter((task) => {
//       return task.id !== id;
//     });
//     setTasks(updatedTasks);
//   };

//   const editById = async (id, newTitle, complete) => {
//     const response = await axios.put(`http://localhost:3000/tasks/${id}`, {
//       title: newTitle,
//       complete: complete,
//     });
//     const updatedTasks = tasks.map((task) => {
//       if (task.id === id) {
//         return { ...task, ...response.data };
//       }
//       return task;
//     });

//     setTasks(updatedTasks);
//   };

//   const taskComplete = async (id, title, complete) => {
//     const response = axios.put(`http://localhost:3001/tasks/${id}`, {
//       title: title,
//       complete: complete,
//     });

//     const updatedTasks = tasks.map((task) => {
//       if (task.id === id) {
//         return { ...task, ...response.data };
//       }
//       return task;
//     });

//     setTasks(updatedTasks);
//   };
//   const valueToShare = {
//     tasks,
//     createTask,
//     fetchtasks,
//     deleteById,
//     editById,
//     taskComplete,
//   };

//   return (
//     <TasksContext.Provider value={valueToShare}>
//       {children}
//     </TasksContext.Provider>
//   );
// }

// export { Provider };
// export default TasksContext;
