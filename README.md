# NC-News:

Welcome to NC-News! A website dedicated to give users the ability to share their thoughts with one another and receive feedback from other users.

### Heroku App:

#### [hothyfa-nc-news.herokuapp.com/api](https://hothyfa-nc-news.herokuapp.com/api)

### Front End:

#### [github.com/Elbeera/nc-news](https://github.com/Elbeera/nc-news)

<br />

## Available endpoints:

```http
GET /api
GET /api/topics
GET /api/articles
GET /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments
DELETE /api/comments/comment_id
PATCH /api/comments/comment_id
GET /api/users
GET /api/users/:username
```

#### ← GET /api/topics

- Responds with the appropriate `statusCode` and an Array with all the available topics.

<br />

#### ← GET /api/articles

- Responds with the appropriate `statusCode` and an Array with all available articles.

<br />

#### ← GET /api/articles/:article_id

- Responds with the appropriate `statusCode` and the article with the given `article_id`.

<br />

#### ↑ PATCH /api/articles/:article_id

Allows user to increment or decrement votes to the given article's `article_id`.

Request body:

```json
{
  "inc_votes": "newVote"
}
```

`newVote` accepts a ➕positive or a ➖negative number which reflects the number that is to be incremented or decremented from current article votes.

- Responds with the appropriate `statusCode` and the updated article.

Response body:

```json
{
  "statusCode": "statusCode",
  "article": {
    "article_id": "article_id",
    "title": "articleTitle",
    "topic": "topicName",
    "author": "articleAuthor",
    "body": "articleBody",
    "votes": "newVote"
  }
}
```

<br />

#### ← GET /api/articles/:article_id/comments

- Responds with the appropriate `statusCode` and an Array with all article comments for the given `article_id`.

<br />

#### → POST /api/articles/:article_id/comments

Allows user to post a comment to the given article's `article_id`.

Request body:

```json
{
  "username": "username",
  "body": "body"
}
```

`username` reflects the current user's username and `body` reflects the posted comment content.

- Responds with the appropriate `statusCode` and the posted comment to the given article.

Response body:

```json
{
  "statusCode": "statusCode",
  "comment": {
    "author": "username",
    "body": "body",
    "comment_id": "comment_id",
    "article_id": "article_id",
    "votes": "currentVotes",
    "created_at": "TimeStamp"
  }
}
```

<br />

#### ✕ DELETE /api/comments/comment_id

- Responds with the appropriate `statusCode` and the deleted comment of a given `comment_id`.

<br />

#### ↑ PATCH /api/comments/comment_id

Allows user to increment or decrement votes to the a specific comment of a given article's `article_id`.

Request body:

```json
{
  "inc_votes": "newVote"
}
```

`newVote` accepts a ➕positive or a ➖negative number which reflects the number that is to be incremented or decremented from current comment votes.

Response body:

```json
{
  "statusCode": "statusCode",
  "comment": {
    "article_id": "article_id",
    "comment-id": "comment_id",
    "author": "commentAuthor",
    "body": "commentBody",
    "votes": "newVote",
    "created_at": "timeStamp"
  }
}
```

- Responds with the appropriate `statusCode` and the patched comment of a given `comment_id`.

<br />

#### ← GET /api/users

- Responds with the appropriate `statusCode` and an Array with all the available users.

<br />

#### ← GET /api/users/:username

- Responds with the appropriate `statusCode` and the user with the given `username`.

<br />
