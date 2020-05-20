const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repo);

  return response.status(200).json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  let repoIndex = repositories.findIndex((r) => r.id === id);
  if (repoIndex < false) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories[repoIndex]  = {...repositories[repoIndex],title,url,techs}

  return response.status(200).json(repositories[repoIndex]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  let repoIndex = repositories.findIndex((r) => r.id === id);
  if (repoIndex < false) {
    return response.status(400).json({ error: "Repository not found" });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repo = repositories.find((r) => r.id === id);
  if (!repo) {
    return response.status(400).json({ error: "Repository not found" });
  }
  repo.likes++;

  return response.status(200).json(repo);
});

module.exports = app;
