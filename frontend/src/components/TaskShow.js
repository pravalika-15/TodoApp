import React, { useState } from "react";
import axios from "axios";
import TaskEdit from "./TaskEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
const url = "https://todoapp-z5iy.onrender.com"
function TaskShow({ task, onTaskDeleted, onTaskEdited }) {
  const [showEdit, setShowEdit] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const handleDelete = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDeletion) {
      try {
        await axios.delete(`${url}/api/todos/${task._id}`);
        console.log("deleted");
        onTaskDeleted(task._id);
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = () => {
    setShowEdit(false);
  };

  const handleCheckboxChange = async (event) => {
    const isChecked = event.target.checked;
    setCompleted(isChecked);
    try {
      // Send a PUT request to the backend with the updated task data (including completion status)
      await axios.put(`${url}/api/todos/${task._id}`, {
        text: task.text,
        completed: isChecked,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  let content = task.text;
  if (showEdit) content = <TaskEdit task={task} onSubmit={handleSubmit} onTaskEdited={onTaskEdited}/>;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4>
            <span className="check">
              <input
                checked={completed}
                onChange={handleCheckboxChange}
                type="checkbox"
              />
            </span>
            {content}
          </h4>
        </div>

        <div className="card-body">
          <div className="actions">
            <button onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskShow;
