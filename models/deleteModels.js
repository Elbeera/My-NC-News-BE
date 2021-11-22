const db = require('../db/connection')

exports.deleteComment = async (comment_id) => {
    const res = await db.query('DELETE FROM comments WHERE comment_id = $1', [comment_id])
    return res
}