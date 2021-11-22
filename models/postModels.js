const db = require('../db/connection')

exports.addCommentByArticleId = async (commentBody) => {
    const result = await db.query('INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *;', [commentBody.username, commentBody.body, commentBody.article_id])
    return result.rows;
}