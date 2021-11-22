const db = require('../db/connection');

exports.fetchTopics = async () => {
    const queryStr = 'SELECT * FROM topics;';
    const result = await db.query(queryStr);
    return result.rows;
};

exports.fetchArticles = async (article_id, excludes, sort_by, order_by, topic) => {
    excludes = excludes ? excludes.split(','): [];
    sort_by = sort_by ? sort_by: 'created_at';
    order_by = order_by ? order_by: 'DESC';

    let queryStr = `SELECT * FROM articles`;
    const queryValues = [];

    if (topic && !article_id) {
        queryStr += ` WHERE topic = $1`
        queryValues.push(topic);
    }
    if (article_id !== undefined) {
        queryStr += " WHERE article_id = $1"
        queryValues.push(article_id);
    }
    
    queryStr += ` ORDER BY ${sort_by} ${order_by};`
    const result = await db.query(queryStr, queryValues);

    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "does not exist!" });
    }

    const data = await Promise.all(result.rows.map(async (article) => {
        if (excludes.includes("body")) {
            delete article.body
        }
        if (!excludes.includes('comment_count')) {
            let commentsQuery = `SELECT * FROM comments WHERE article_id = ${article.article_id}`
            const comments = await db.query(commentsQuery)
            article.comment_count = comments.rows.length
        }
        return  article
    })
    )

    return data;
};

exports.fetchCommentByArticleId = async (article_id) => {
    const queryStr = 'SELECT * FROM comments WHERE article_id = $1;'
    const result = await db.query(queryStr,[article_id]);
    if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "does not exist!" });
    }
    return result.rows;
}

exports.fetchUsers = async (username) => {
    if (username) {
        const queryStr = 'SELECT * FROM users WHERE username = $1'
        const result = await db.query(queryStr, [username])
        
        if (result.rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'username does not exist!' })
        }

        return result.rows
    }

    const queryStr = 'SELECT username FROM users;'
    const result = await db.query(queryStr)

    return result.rows
}