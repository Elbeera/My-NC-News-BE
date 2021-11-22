const { fetchTopics, fetchArticles, fetchCommentByArticleId, fetchUsers } = require('../models/getModels');

exports.getTopics = async (req, res, next) => {
    try {
        const topicsData = await fetchTopics();
        res.status(200).send({ topics: topicsData });
    } catch(err) {
        next(err);
    };
}

exports.getArticles = async (req, res, next) => {
    try {

        const { sort_by, order_by, excludes, topic } = req.query
        const { article_id } = req.params;
        const articleData = await fetchArticles(article_id, excludes, sort_by, order_by, topic);
        res.status(200).send({ articles: articleData });
    } catch(err) {
        next(err)
    };
}

exports.getCommentsByArticleId = async (req, res, next) => {
    try {
        const { article_id } = req.params
        const commentData = await fetchCommentByArticleId(article_id)
        res.status(200).send({ comments: commentData })
    } catch(err) {
        next(err)
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const username = req.params.username
        const usersData = await fetchUsers(username)
        res.status(200).send({ users: usersData })
    } catch(err) {
        next(err)
    }
}