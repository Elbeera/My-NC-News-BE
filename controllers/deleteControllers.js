const { deleteComment } = require('../models/deleteModels')

exports.deleteCommentById = async (req, res, next) => {
    try {
        const { comment_id } = req.params
        await deleteComment(comment_id)
        res.status(204).send()
    } catch(err) {
        next(err)
    }
}