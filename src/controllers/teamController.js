const Team = require('../models/teamModel');

exports.createTeam = async (req, res, next) => {
  try {
    const { name, members } = req.body;
    const team = new Team({ name, members, createdBy: req.user?.id });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    next(err);
  }
};

exports.getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.find().populate('members', 'name email');
    res.json(teams);
  } catch (err) {
    next(err);
  }
};

exports.getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', 'name email');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    next(err);
  }
};

exports.updateTeam = async (req, res, next) => {
  try {
    const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteTeam = async (req, res, next) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.addTeamMember = async (req, res, next) => {
  try {
    const { memberId } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team.members.includes(memberId)) team.members.push(memberId);
    await team.save();
    res.json(team);
  } catch (err) {
    next(err);
  }
};
