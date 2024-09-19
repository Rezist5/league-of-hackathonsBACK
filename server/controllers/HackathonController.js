const ApiError = require('../error/ApiError');
const { Hackathon, Team } = require('../models/models');

class HackathonController {
    async createHackathon(req, res, next) {
        try {
            const { name, description, startDate, endDate } = req.body;

            if (!name || !startDate || !endDate) {
                return next(ApiError.badRequest('Name, startDate, and endDate are required'));
            }

            const newHackathon = await Hackathon.create({ name, description, startDate, endDate });
            return res.json({ message: 'Hackathon created successfully', hackathon: newHackathon });
        } catch (error) {
            next(error);
        }
    }

    async addTeamToHackathon(req, res, next) {
        try {
            const { hackathonId, teamId } = req.body;

            if (!hackathonId || !teamId) {
                return next(ApiError.badRequest('Hackathon ID and Team ID are required'));
            }

            const hackathon = await Hackathon.findByPk(hackathonId);
            const team = await Team.findByPk(teamId);

            if (!hackathon) {
                return next(ApiError.notFound('Hackathon not found'));
            }

            if (!team) {
                return next(ApiError.notFound('Team not found'));
            }

            // Add team to the hackathon
            await hackathon.addTeam(team);

            return res.json({ message: 'Team added to hackathon successfully' });
        } catch (error) {
            next(error);
        }
    }

    async removeTeamFromHackathon(req, res, next) {
        try {
            const { hackathonId, teamId } = req.body;

            if (!hackathonId || !teamId) {
                return next(ApiError.badRequest('Hackathon ID and Team ID are required'));
            }

            const hackathon = await Hackathon.findByPk(hackathonId);
            const team = await Team.findByPk(teamId);

            if (!hackathon) {
                return next(ApiError.notFound('Hackathon not found'));
            }

            if (!team) {
                return next(ApiError.notFound('Team not found'));
            }

            // Remove team from the hackathon
            await hackathon.removeTeam(team);

            return res.json({ message: 'Team removed from hackathon successfully' });
        } catch (error) {
            next(error);
        }
    }

    async updateHackathon(req, res, next) {
        try {
            const { hackathonId } = req.params;
            const { name, description, startDate, endDate } = req.body;

            const hackathon = await Hackathon.findByPk(hackathonId);

            if (!hackathon) {
                return next(ApiError.notFound('Hackathon not found'));
            }

            // Update hackathon details
            if (name) hackathon.name = name;
            if (description) hackathon.description = description;
            if (startDate) hackathon.startDate = startDate;
            if (endDate) hackathon.endDate = endDate;

            await hackathon.save();

            return res.json({ message: 'Hackathon updated successfully', hackathon });
        } catch (error) {
            next(error);
        }
    }

    async getAllHackathons(req, res, next) {
        try {
            const hackathons = await Hackathon.findAll();
            return res.json(hackathons);
        } catch (error) {
            next(error);
        }
    }

    async getHackathonById(req, res, next) {
        try {
            const { id } = req.params;

            const hackathon = await Hackathon.findByPk(id);

            if (!hackathon) {
                return next(ApiError.notFound('Hackathon not found'));
            }

            return res.json(hackathon);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new HackathonController();
