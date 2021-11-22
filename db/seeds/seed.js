const db = require('../connection')
const format = require("pg-format")
const formatData = require('../utils/data-manipulation')

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db.query('DROP TABLE IF EXISTS comments')
  .then(() => {
    return db.query('DROP TABLE IF EXISTS articles')
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS topics')
  })
  .then(() => {
    return db.query('DROP TABLE IF EXISTS users')
  })
  .then(() => {
    return db.query(`CREATE TABLE topics (
      topic_id SERIAL,
      slug VARCHAR(100) PRIMARY KEY,
      description TEXT NOT NULL
    );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE users (
      user_id SERIAL,
      username VARCHAR(100) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      avatar_url VARCHAR(500)
    );`)
  })
  .then(() => {
    return db.query(`CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      body TEXT NOT NULL,
      votes INT DEFAULT 0,
      topic VARCHAR(100) REFERENCES topics(slug),
      author VARCHAR(100) REFERENCES users(username),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`)
  })
  .then(() => {
    return db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(100) REFERENCES users(username),
      article_id INT REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      body TEXT NOT NULL
    )`)
  })
  .then(() => {
    const formattedTopicData = formatData(topicData)
    const queryStr = format(
      `INSERT INTO topics
          (description, slug)
          VALUES
          %L
          RETURNING *;`,
          formattedTopicData
    );
    return db.query(queryStr);
  })
  .then(() => {
    const formattedUserData = formatData(userData)
    const queryStr = format(
      `INSERT INTO users
          (username, name, avatar_url)
          VALUES
          %L
          RETURNING *;`,
          formattedUserData
    );
    return db.query(queryStr);
  })
  .then(() => {
    const formattedArticleData = formatData(articleData);
    const queryStr = format(
      `INSERT INTO articles
          (title, topic, author, body, created_at, votes)
          VALUES
          %L
          RETURNING *;`,
          formattedArticleData
    );
    return db.query(queryStr);
  })
  .then(() => {
    const formattedCommentData = formatData(commentData);
    const queryStr = format(
      `INSERT INTO comments
          (body, votes, author, article_id, created_at)
          VALUES
          %L
          RETURNING *;`,
          formattedCommentData
    );
    return db.query(queryStr);
  })
};

module.exports = seed;
