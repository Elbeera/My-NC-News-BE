const { editArticle, editComment } = require("../models/patchModels")

exports.patchArticleById = async (req, res, next) => {
    try {
        const { article_id } = req.params;
        const { inc_votes } = req.body;
        
        const patchedData = await editArticle(article_id, inc_votes);
        res.status(201).send({ article: patchedData });
    } catch(err) {
        next(err)
    }
}

exports.patchCommentById = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const { inc_votes } = req.body;
        
        const patchedData = await editComment(comment_id, inc_votes);
        res.status(201).send({ comment: patchedData });
    } catch(err) {
        next(err)
    }
}