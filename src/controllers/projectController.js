const Project = require('../models/projectModel');

exports.createProject = async (req, res, next) => {
  try {
    const { name, description, members } = req.body;
    const project = new Project({ name, description, members, createdBy: req.userId });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('members', 'name email');
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'name email');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.addProjectMember = async (req, res, next) => {
  try {
    const { memberId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project.members.includes(memberId)) project.members.push(memberId);
    await project.save();
    res.json(project);
  } catch (err) {
    next(err);
  }
};