const Router = require('express')
const router = new Router()

const hackathonRouter = require('./hackathonRouter');
const userRoutes = require('./userRouter')
const ratingRouter = require('./ratingRouter');
const teamRouter = require('./teamRouter');

router.use('/users', userRoutes);
router.use('/hackathons', hackathonRouter);
router.use('/ratings', ratingRouter);
router.use('/teams', teamRouter);

module.exports = router