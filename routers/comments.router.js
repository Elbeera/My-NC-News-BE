const express = require('express');
const { deleteCommentById } = require('../controllers/deleteControllers');
const { patchCommentById } = require('../controllers/patchControllers');

const commentsRouter = express.Router();

commentsRouter.delete('/:comment_id', deleteCommentById)
commentsRouter.patch('/:comment_id', patchCommentById)

module.exports = commentsRouter