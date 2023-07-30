const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require("./config/db");
const app = express();
const port = 3001;
const url = "";
connectToDatabase();

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get(`${url}/api/todos`, async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post(`${url}/api/todos`, async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const todo = new Todo({ text });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put(`${url}/api/todos/:id`, async (req, res) => {
  const { id } = req.params;
  //   console.log("id", id);
  const { text, completed } = req.body;
  //   console.log(text, completed);
  if (text === "" || completed === "") {
    console.log("hi");
    return res.status(400).json({ error: "Text and completed are required" });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );
    if (!todo) {
      console.log("Todo not found");
      return res.status(404).json({ error: "Todo not found" });
    }
    console.log(todo);
    res.json(todo);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: "Server error" });
  }
});

app.delete(`${url}/api/todos/:id`, async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndRemove(id);
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
