import Task from "../models/task.js";

const getAllTasks = async (req, res) => {
  const filters = { user_id: req.user.id };

  if (req.query.title) {
    filters.title = { $regex: req.query.title, $options: "i" };
  }

  if (req.query.complete) {
    filters.complete = req.query.complete;
  }

  const tasks = await Task.find(filters);

  res.status(200).json(tasks);
};

const createATask = async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }

    const task = await Task.create({
      title,
      description,
      user_id: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    if (task.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to read");
    }

    res.status(200).json(task);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    if (task.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to update");
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    if (task.user_id.toString() !== req.user.id) {
      res.status(403);
      throw new Error("User don't have permission to delete");
    }

    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedTask);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { getAllTasks, createATask, getTask, updateTask, deleteTask };
