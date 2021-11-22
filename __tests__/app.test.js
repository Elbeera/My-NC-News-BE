const request = require("supertest");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/topics", () => {
  describe('GET /api/topics', () => {
    test("GET 200: responds with an array of topics", async () => {
      const res = await request(app).get("/api/topics").expect(200);
      expect(res.body.topics).toHaveLength(3);
      expect(res.body.topics).toBeInstanceOf(Array);
      res.body.topics.forEach((topic) => {
        expect(topic).toMatchObject({
          topic_id: expect.any(Number),
          description: expect.any(String),
          slug: expect.any(String),
        });
      });
    });
    test("GET Error 404: responds with msg: bad path!, when given an invalid endpoint", async () => {
      const res = await request(app).get("/api/topik").expect(404);
      expect(res.body.msg).toBe("bad path!");
    });
  });
});

describe('/api/articles', () => {
  describe('/api/articles', () => {
    test('GET 200: responds with an array of article objects', async () => {
      const res = await request(app).get('/api/articles?excludes=body').expect(200);
      expect(res.body.articles).toHaveLength(12);
      expect(res.body.articles).toBeInstanceOf(Array);
      res.body.articles.forEach((article) => {
        expect(article).not.toHaveProperty('body')
        expect(article).toMatchObject({
          article_id: expect.any(Number),
          author: expect.any(String),
          title: expect.any(String),
          topic: expect.any(String),
          votes: expect.any(Number),
          created_at: expect.any(String),
          comment_count: expect.any(Number),
        });
      });
    });
    test('GET 200: responds with an array of article objects sorted by a given topic query with a specified topic', async () => {
      const res = await request(app).get('/api/articles?topic=cats').expect(200);
      expect(res.body.articles).toHaveLength(1);
      expect(res.body.articles).toBeInstanceOf(Array);
      res.body.articles.forEach((article) => {
        expect(article.topic).toBe('cats')
      })
    });
    test("GET Error 404: responds with msg: bad path!, when given an invalid endpoint", async () => {
      const res = await request(app).get("/api/artikles").expect(404);
      expect(res.body.msg).toBe("bad path!");
    });
  });
  describe("/api/articles/:article_id", () => {
    describe('GET /api/articles/:article_id', () => {
      test("GET 200: responds with an array of one article of the given article_id", async () => {
        const res = await request(app).get("/api/articles/1").expect(200);
        expect(res.body.articles).toHaveLength(1);
        expect(res.body.articles).toBeInstanceOf(Array);
        res.body.articles.forEach((article) => {
          expect(article).toMatchObject({
            article_id: expect.any(Number),
            topic: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            votes: expect.any(Number),
          });
        });
      });
      test("GET Error 404: responds with msg: does not exist!, when given non existent article_id", async () => {
        const res = await request(app).get("/api/articles/500").expect(404);
        expect(res.body.msg).toBe("does not exist!");
      });
      test("GET Error 400: responds with msg: bad request!, when given invalid data type for article_id", async () => {
        const res = await request(app).get("/api/articles/hello").expect(400);
        expect(res.body.msg).toBe("bad request!");
      });
      test("GET Error 404: responds with msg: bad path!, when given an invalid endpoint", async () => {
        const res = await request(app).get("/api/artikles/1").expect(404);
        expect(res.body.msg).toBe("bad path!");
      });
    });
    describe('PATCH /api/articles/:article_id', () => {
      test("PATCH 201: responds with the patched article incremented", async () => {
        const res = await request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 50 })
          .expect(201);
        expect(res.body.article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
        });
      });
      test("PATCH 201: responds with the patched article decremented votes", async () => {
        const res = await request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: -50 })
          .expect(201);
        expect(res.body.article).toMatchObject({
          article_id: expect.any(Number),
          title: expect.any(String),
          topic: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
          votes: expect.any(Number),
        });
      });
      test('PATCH Error 400: responds with msg: bad request!, when given an invalid value to inc_votes', async () => {
        const res = await request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 'cat' })
          .expect(400);
          expect(res.body.msg).toBe('bad request!')
      });
      test('PATCH Error 422: responds with msg: no inc_votes provided!, when not given inc_votes', async () => {
        const res = await request(app)
          .patch("/api/articles/1")
          .send({ })
          .expect(422);
          expect(res.body.msg).toBe('no inc_votes provided!')
      });
      test('PATCH Error 404: responds with msg: bad path!, when given an invalid endpoint', async () => {
        const res = await request(app).get("/api/artikles/1").send({ inc_votes: -50 }).expect(404);
        expect(res.body.msg).toBe("bad path!");
      });
    });
  });
  describe('/api/articles/:article_id/comments', () => {
    describe('GET /api/articles/:article_id/comments', () => {
      test('GET 200: responds with an array of all the comments for the given article id', async () => {
        const res = 
        await request(app)
        .get('/api/articles/1/comments')
        .expect(200);
        expect(res.body.comments).toHaveLength(13)
        expect(res.body.comments).toBeInstanceOf(Array)
        expect(res.body.comments[0]).toMatchObject({
          comment_id: expect.any(Number),
          author: expect.any(String),
          article_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          body: expect.any(String)
        })
      });
      test("GET Error 404: responds with msg: does not exist!, when given non existent article_id", async () => {
        const res = await request(app)
        .get("/api/articles/500/comments")
        .expect(404);
        expect(res.body.msg).toBe("does not exist!");
      });
      test("GET Error 400: responds with msg: bad request!, when given invalid data type for article_id", async () => {
        const res = await request(app).get("/api/articles/hello/comments").expect(400);
        expect(res.body.msg).toBe("bad request!");
      });
    });
    describe('POST /api/articles/:article_id/comments', () => {
      test('POST 201: responds with an array of the posted comment object(s)', async () => {
        const res = await request(app).post("/api/articles/1/comments").send({ username: "lurker", body: "Awesome!" })
        .expect(201)
        expect(res.body.comment[0]).toMatchObject({
          comment_id: expect.any(Number),
          author: expect.any(String),
          article_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          body: expect.any(String),
        })
      });
    });
  });
});

describe('/api/comments', () => {
  describe('DELETE /api/comments/comment_id', () => {
    test('DELETE 204: responds with no content', async () => {
      await request(app).delete('/api/comments/1').expect(204)
    });
    
  });
  describe('PATCH /api/comments/comment_id', () => {
    test("PATCH 201: responds with the patched comment with incremented votes", async () => {
      const res = await request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 50 })
        .expect(201);
      expect(res.body.comment).toMatchObject({
        comment_id: expect.any(Number),
        body: expect.any(String),
        votes: expect.any(Number),
        author: expect.any(String),
        article_id: expect.any(Number),
        created_at: expect.any(String),
      });
    });
    test("PATCH 201: responds with the patched comment with decremented votes", async () => {
      const res = await request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: -50 })
        .expect(201);
      expect(res.body.comment).toMatchObject({
        comment_id: expect.any(Number),
        body: expect.any(String),
        votes: expect.any(Number),
        author: expect.any(String),
        article_id: expect.any(Number),
        created_at: expect.any(String),
      });
    });
    test('PATCH Error 400: responds with msg: bad request!, when given an invalid value to inc_votes', async () => {
      const res = await request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 'cat' })
        .expect(400);
        expect(res.body.msg).toBe('bad request!')
    });
    test('PATCH Error 422: responds with msg: no inc_votes provided!, when not given inc_votes', async () => {
      const res = await request(app)
        .patch("/api/comments/1")
        .send({ })
        .expect(422);
        expect(res.body.msg).toBe('no inc_votes provided!')
    });
    test('PATCH Error 404: responds with msg: bad path!, when given an invalid endpoint', async () => {
      const res = await request(app).get("/api/komments/1").send({ inc_votes: -50 }).expect(404);
      expect(res.body.msg).toBe("bad path!");
    });
  });
});

describe('/api/users', () => {
  describe('GET /api/users', () => {
    test('GET /api/users', async () => {
      const res = await request(app).get('/api/users').expect(200);
      expect(res.body.users).toBeInstanceOf(Array)
      res.body.users.forEach((user) => {
        expect(user).toHaveProperty('username')
        expect(user).not.toHaveProperty('user_id')
        expect(user).not.toHaveProperty('name')
        expect(user).not.toHaveProperty('avatar_url')
      })
    });
    test('GET Error 404: responds with msg: bad path!, when given wrong path', async () => {
      const res = await request(app).get('/api/uses').expect(404);
      expect(res.body.msg).toBe('bad path!')
    })
  });
  describe('/api/users/:username', () => {
    describe('GET /api/users/:username', () => {
      test('GET 200: responds with an array of users, containing the requested user', async () => {
        const res = await request(app).get('/api/users/lurker').expect(200);
        expect(res.body.users).toBeInstanceOf(Array)
        expect(res.body.users[0]).toMatchObject({
          user_id: expect.any(Number),
          username: expect.any(String),
          name: expect.any(String),
          avatar_url: expect.any(String)
        })
      });
      test('GET Error 404: responds with msg: username does not exist!, when given non existent username', async () => {
        const res = await request(app).get('/api/users/cat').expect(404);
        expect(res.body.msg).toBe('username does not exist!')
      })
    });
  });
});