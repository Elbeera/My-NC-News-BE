const express = require('express');
const { getUsers } = require('../controllers/getControllers')

const usersRouter = express.Router();

usersRouter.get('/', getUsers)
usersRouter.get('/:username', getUsers)

module.exports = usersRouter