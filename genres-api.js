const Joi = require("joi");
const crypto = require("crypto");
const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));

let genres = require("./genres-data.js");

// GET all genres

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// GET one genre

app.get("/api/genres/:name", (req, res) => {
  // Find if genre exists
  const genre = findByName(req.params.name);
  if (!genre) return res.status(404).send("Genre cannot be found");
  res.send(genre);
});

// POST - add a genre

app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genreName = upperCaseWords(req.body.name);
  const genre = {
    name: genreName,
    id: crypto.randomUUID(),
  };
  genres.push(genre);
  res.send(genre);
});

// PUT - update a genre

app.put("/api/genres/:name", (req, res) => {
  // Find if genre exists
  const genre = findByName(req.params.name);
  if (!genre) return res.status(404).send("Genre cannot be found");

  // Validate body
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Update genres
  genres.forEach((g) => {
    if (g.id === genre.id) genre.name = upperCaseWords(req.body.name);
  });
  res.send(genre);
});

// DELETE

app.delete("/api/genres/:name", (req, res) => {
  // Find if genre exists
  const genre = findByName(req.params.name);
  if (!genre) return res.status(404).send("Genre cannot be found");

  // Delete genre
  genres = genres.filter((g) => g.id !== genre.id);
  res.send(`The genre has been deleted: ${genre.name}`);
});

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(genre);
}

function upperCaseWords(string) {
  const wordArray = string.split(" ");
  const upperCased = wordArray
    .filter((w) => w !== "")
    .map((w) => {
      if (w === " ") return "";
      return (
        w.trim().substring(0, 1).toUpperCase() +
        w.trim().substring(1).toLowerCase()
      );
    });
  return upperCased.join(" ");
}

function findByName(nameParam) {
  const name = nameParam.replace("_", " ");
  const genre = genres.find((g) => g.name.toLowerCase() === name.toLowerCase());
  return genre;
}
