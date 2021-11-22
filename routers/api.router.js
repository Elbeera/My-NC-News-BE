const express = require('express');
const { getTopics } = require('../controllers/getControllers');
const articlesRouter = require('./articles.router')
const commentsRouter = require('./comments.router')
const usersRouter = require('./users.router')

const apiRouter = express.Router();

apiRouter.get('/', (req, res, next) => {
    res.status(200).send({ msg: 'Welcome!' })
})
apiRouter.get('/topics', getTopics)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/comments', commentsRouter)
apiRouter.use('/users', usersRouter)



module.exports = apiRouter;