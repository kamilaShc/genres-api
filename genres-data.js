const crypto = require("crypto");
let genres = [
  {
    name: "Action",
    id: crypto.randomUUID(),
  },
  {
    name: "Animated Film",
    id: crypto.randomUUID(),
  },
  {
    name: "Comedy",
    id: crypto.randomUUID(),
  },
  {
    name: "Drama",
    id: crypto.randomUUID(),
  },
  {
    name: "Fantasy",
    id: crypto.randomUUID(),
  },
  {
    name: "Horror",
    id: crypto.randomUUID(),
  },
  {
    name: "Romance",
    id: crypto.randomUUID(),
  },
  {
    name: "Science fiction",
    id: crypto.randomUUID(),
  },
  {
    name: "Thriller",
    id: crypto.randomUUID(),
  },
  {
    name: "Western",
    id: crypto.randomUUID(),
  },
];

module.exports = genres;
