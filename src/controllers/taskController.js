const Task = require('../models/taskModel');
const Project = require('../models/projectModel'); 

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('assignedTo').populate('projectId');
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo').populate('projectId');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    // Create the task first
    const newTask = await Task.create(req.body);
    
    // If task has a projectId, add the task to the project's tasks array
    if (newTask.projectId) {
      await Project.findByIdAndUpdate(
        newTask.projectId,
        { $push: { tasks: newTask._id } },
        { new: true }
      );
    }
    
    // Return the created task with populated fields
    const populatedTask = await Task.findById(newTask._id).populate('assignedTo').populate('projectId');
    res.status(201).json(populatedTask);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const oldTask = await Task.findById(req.params.id);
    if (!oldTask) return res.status(404).json({ message: 'Task not found' });
    
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    // Handle project change
    if (req.body.projectId && req.body.projectId !== oldTask.projectId?.toString()) {
      // Remove from old project if it had one
      if (oldTask.projectId) {
        await Project.findByIdAndUpdate(
          oldTask.projectId,
          { $pull: { tasks: oldTask._id } }
        );
      }
      
      // Add to new project
      if (req.body.projectId) {
        await Project.findByIdAndUpdate(
          req.body.projectId,
          { $push: { tasks: updatedTask._id } }
        );
      }
    }
    
    const populatedTask = await Task.findById(updatedTask._id).populate('assignedTo').populate('projectId');
    res.json(populatedTask);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // Remove task from project's tasks array if it belongs to a project
    if (task.projectId) {
      await Project.findByIdAndUpdate(
        task.projectId,
        { $pull: { tasks: task._id } }
      );
    }
    
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

// Add this new endpoint to get tasks by project
exports.getTasksByProject = async (req, res, next) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId })
      .populate('assignedTo')
      .populate('projectId');
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};