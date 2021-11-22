const db = require('../db/connection');

exports.editArticle = async (article_id, inc_votes) => {
    
    if (inc_votes) {
        if (typeof inc_votes !== "number") {
            return Promise.reject({ status: 400, msg: 'bad request!'})
        }
        if (inc_votes >= 0) {
            const result = await db.query('UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *', [inc_votes, article_id]);
            return result.rows[0];
        }
        if (inc_votes < 0) {
            const newNum = String(inc_votes)
            const decrementValue = newNum.slice(1)
            const result = await db.query('UPDATE articles SET votes = votes - $1 WHERE article_id = $2 RETURNING *', [decrementValue, article_id]);
            return result.rows[0];
        }
    } else {
        return Promise.reject({ status: 422, msg: 'no inc_votes provided!' })
    }
    
}

exports.editComment = async (comment_id, inc_votes) => {
    
    if (inc_votes) {
        if (typeof inc_votes !== "number") {
            return Promise.reject({ status: 400, msg: 'bad request!'})
        }
        if (inc_votes >= 0) {
            const result = await db.query('UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *', [inc_votes, comment_id]);
            return result.rows[0];
        }
        if (inc_votes < 0) {
            const newNum = String(inc_votes)
            const decrementValue = newNum.slice(1)
            const result = await db.query('UPDATE comments SET votes = votes - $1 WHERE comment_id = $2 RETURNING *', [decrementValue, comment_id]);
            return result.rows[0];
        }
    } else {
        return Promise.reject({ status: 422, msg: 'no inc_votes provided!' })
    }
    
}