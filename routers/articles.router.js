const express = require('express');
const { getArticles, getCommentsByArticleId } = require('../controllers/getControllers');
const { postCommentsByArticleId } = require('../controllers/postControllers');
const { patchArticleById } = require('../controllers/patchControllers');

const articlesRouter = express.Router();

articlesRouter.get('/', getArticles)
articlesRouter.get('/:article_id', getArticles)
articlesRouter.patch('/:article_id', patchArticleById)
articlesRouter.get('/:article_id/comments', getCommentsByArticleId)
articlesRouter.post('/:article_id/comments', postCommentsByArticleId)

module.exports = articlesRouter;