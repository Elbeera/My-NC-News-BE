const { addCommentByArticleId } = require('../models/postModels')

exports.postCommentsByArticleId = async (req, res, next) => {
    try {
        const { article_id } = req.params
        const commentBody = req.body
        commentBody.article_id = article_id
        const addedComment = await addCommentByArticleId(commentBody)
        res.status(201).send({ comment: addedComment })

    } catch(err) {
        next(err)
    }
}