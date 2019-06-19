import * as express from "express";
import * as bodyParser from "body-parser";
// import Photon from "@generated/photon";

// const photon = new Photon();

const app = express();

app.use(bodyParser.json());

// GET

/**
 * `/feed`: Fetch all _released_ movies
 */
app.get("/feed", async (req, res) => {
  const movies; // TODO: Get all _released_ movies from DB
  res.json(movies);
});

/**
 * `/filterMovies?searchString={searchString}`: Filter movies by `title` or `description`
 */
app.get("/filterMovies", async (req, res) => {
  const { searchString } = req.query;
  const movies; // TODO: Filter movies by `title` or `description`
  res.json(movies);
});

/**
 * `/movie/:id`: Fetch a single movie by its `id`
 */
app.get(`/movie/:id`, async (req, res) => {
  const { id } = req.params;
  const movie; // TODO: Fetch a single movie by its `id`
  res.json(movie);
});

// POST

/**
  `/hero`: Create a new hero
  Body:
    - `name: String` (optional): The name of the hero
    - `email: String` (required): The email address of the hero
*/
app.post(`/hero`, async (req, res) => {
  const result; // get hero from photon
  res.json(result);
});

/**
  `/movie`: Create a new movie
  Body:
    - `title: String` (required): The title of the movie
    - `description: String` (optional): The description of the movie
    - `mainHeroEmail: String` (required): The email of the hero that creates the movie
*/
app.post(`/movie`, async (req, res) => {
  const { title, mainHeroEmail, description } = req.body;
  const response = {};
  const movie; // TODO: create a movie
  res.json();
});

// PUT

/**
  `/release/:id`: Release a movie by its `id`
*/
app.put("/release/:id", async (req, res) => {
  const { id } = req.params;
  const movie; // TODO: Set 'released' property to true for movie.
  res.json(movie);
});

// DELETE

/**
  `/movie/:id`: Delete a movie by its `id`
*/
app.delete(`/movie/:id`, async (req, res) => {
  const { id } = req.params;
  const movie; // TODO: Delete movie from DB
  res.json(movie);
});

const server = app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);

async function cleanup() {
  // await photon.disconnect();
  server.close();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
