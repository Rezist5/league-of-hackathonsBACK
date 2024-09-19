const ApiError = require('../error/ApiError');
const Rating = require('../models/Rating');
const Hackathon = require('../models/Hackathon');
const User = require('../models/User');
const Team = require('../models/Team');

class RatingController {
  async addOrUpdateRating(req, res, next) {
    const { hackathonId, teamId, placement } = req.body;
    try {
      if (!hackathonId || !teamId || !placement) {
        return next(ApiError.badRequest('Не все поля заполнены'));
      }

      const hackathon = await Hackathon.findByPk(hackathonId);

      if (!hackathon) {
        return next(ApiError.badRequest('Хакатон не найден'));
      }

      const scoring = hackathon.scoring;

      if (!scoring[placement]) {
        return next(ApiError.badRequest('Недопустимое место'));
      }

      const points = scoring[placement];

      await Rating.upsert({
        hackathonId,
        teamId,
        points,
        placement
      });

      await Team.increment('rating', { by: points, where: { id: teamId } });

      const users = await User.findAll({ where: { teamId } });

      await Promise.all(users.map(user => 
        User.increment('rating', { by: points, where: { id: user.id } })
      ));

      return res.json({ message: 'Рейтинг успешно обновлен' });
    } catch (error) {
      next(error);
    }
  }

  async getRatingsByHackathon(req, res, next) {
    const { hackathonId } = req.params;

    try {
      if (!hackathonId) {
        return next(ApiError.badRequest('ID хакатона не предоставлен'));
      }

      const ratings = await Rating.findAll({
        where: { hackathonId }
      });

      return res.json(ratings);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RatingController();
