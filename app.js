const express = require("express");
const { handleCustomErrors } = require("./controllers/errorControllers");
const apiRouter = require("./routers/api.router");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", (req, res) => {
  res.status(404).send({ msg: "bad path!" });
});

app.use(handleCustomErrors);
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
