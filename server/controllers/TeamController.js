const ApiError = require('../error/ApiError');
const { Team, User } = require('../models/models'); 

class TeamController {
    // Create a new team
    async createTeam(req, res, next) {
        try {
            const { name, description } = req.body;

            if (!name) {
                return next(ApiError.badRequest('Team name is required'));
            }

            const newTeam = await Team.create({ name, description });
            return res.json({ message: 'Team created successfully', team: newTeam });
        } catch (error) {
            next(error);
        }
    }

    // Add a user to a team
    async addMember(req, res, next) {
        try {
            const { teamId, userId } = req.body;

            if (!teamId || !userId) {
                return next(ApiError.badRequest('Team ID and User ID are required'));
            }

            const team = await Team.findByPk(teamId);
            const user = await User.findByPk(userId);

            if (!team) {
                return next(ApiError.notFound('Team not found'));
            }

            if (!user) {
                return next(ApiError.notFound('User not found'));
            }

            // Adding user to the team
            await team.addUser(user);

            return res.json({ message: 'User added to the team successfully' });
        } catch (error) {
            next(error);
        }
    }

    // Remove a user from a team
    async removeMember(req, res, next) {
        try {
            const { teamId, userId } = req.body;

            if (!teamId || !userId) {
                return next(ApiError.badRequest('Team ID and User ID are required'));
            }

            const team = await Team.findByPk(teamId);
            const user = await User.findByPk(userId);

            if (!team) {
                return next(ApiError.notFound('Team not found'));
            }

            if (!user) {
                return next(ApiError.notFound('User not found'));
            }

            // Removing user from the team
            await team.removeUser(user);

            return res.json({ message: 'User removed from the team successfully' });
        } catch (error) {
            next(error);
        }
    }

    // Update team details
    async updateTeam(req, res, next) {
        try {
            const { teamId } = req.params;
            const { name, description } = req.body;

            const team = await Team.findByPk(teamId);

            if (!team) {
                return next(ApiError.notFound('Team not found'));
            }

            // Update team details
            if (name) team.name = name;
            if (description) team.description = description;

            await team.save();

            return res.json({ message: 'Team updated successfully', team });
        } catch (error) {
            next(error);
        }
    }

    // Get all teams
    async getAllTeams(req, res, next) {
        try {
            const teams = await Team.findAll();
            return res.json(teams);
        } catch (error) {
            next(error);
        }
    }

    // Get a team by ID
    async getTeamById(req, res, next) {
        try {
            const { id } = req.params;

            const team = await Team.findByPk(id);

            if (!team) {
                return next(ApiError.notFound('Team not found'));
            }

            return res.json(team);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TeamController();
