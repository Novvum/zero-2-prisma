import * as express from "express";
import * as bodyParser from "body-parser";
import Photon from "@generated/photon";

const photon = new Photon();
const app = express();

app.use(bodyParser.json());

app.post(`/hero`, async (req, res) => {
  const result = await photon.heroes.create({
    data: {
      ...req.body
    }
  });
  res.json(result);
});

app.post(`/movie`, async (req, res) => {
  const { title, mainHeroEmail, description } = req.body;
  const movie = photon.movies.create({
    data: {
      title: title,
      released: false,
      description: description,
      mainHero: { connect: { email: mainHeroEmail } } // TODO: Fix after https://github.com/prisma/photonjs/issues/30
    }
  });
  res.json({
    ...(await movie),
    mainHero: await movie.mainHero()
  });
});

app.put("/release/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await photon.movies.update({
    where: { id },
    data: { released: true }
  });
  res.json(movie);
});

app.delete(`/movie/:id`, async (req, res) => {
  const { id } = req.params;
  const movie = await photon.movies.delete({
    where: {
      id
    }
  });
  res.json(movie);
});

app.get(`/movie/:id`, async (req, res) => {
  const { id } = req.params;
  const movie = await photon.movies.findOne({
    where: {
      id
    }
  });
  res.json(movie);
});

app.get("/feed", async (req, res) => {
  const movies = await photon.movies.findMany({ where: { released: false } });
  res.json(movies);
});

// TODO: Fix after https://github.com/prisma/photonjs/issues/37
app.get("/filterMovies", async (req, res) => {
  const { searchString } = req.query;
  const draftMovies = await photon.movies.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString
          }
        },
        {
          description: {
            contains: searchString
          }
        }
      ]
    }
  });
  res.json(draftMovies);
});

const server = app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);

async function cleanup() {
  await photon.disconnect();
  server.close();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
