import { GraphQLServer } from "graphql-yoga";
import { join } from "path";

import { makeSchema, objectType, idArg, stringArg } from "@prisma/nexus";
import { Context } from "./types";

import Photon from "@generated/photon";
import { nexusPrismaMethod } from "@generated/nexus-prisma";

const photon = new Photon();

const nexusPrisma = nexusPrismaMethod({
  photon: (ctx: Context) => ctx.photon
});

// Types

/**
 * Create a Hero type that uses the Hero type in the database
 * SDL:
  type Hero {
    id: ID!
    email: String!
    name: String
    movies(after: String, before: String, first: Int, last: Int, skip: Int): [Movie!]
  }
 */
export const Hero = objectType({
  name: "Hero",
  definition(t) {
    t.model.id();
  }
});

/**
 * Create a Movie type that uses the Movie type in the database
 * SDL:
  type Movie {
    id: ID!
    title: String!
    description: String
    released: Boolean!
    mainCharacter: Hero
  }
 */
export const Movie = objectType({
  name: "Movie",
  definition: t => {
    t.model.id();
  }
});

/**
 * Query
 * SDL:
  type Query {
    movie(where: MovieWhereUniqueInput!): Movie # directly from crud
    feed: [Movie!]!
    filterMovies(searchString: String): [Movie!]!
  }
 */
const Query = objectType({
  name: "Query",
  definition(t) {
    t.boolean("_noop");
    // t.crud.findOneMovie
  }
});

/**
 * Mutation
 * SDL:
  type Mutation {
    signupHero(data: HeroCreateInput!): Hero! # directly from crud
    deleteMovie(id: ID!): Movie!
    createMovie(description: String, mainCharacterEmail: String, title: String): Movie!
    release(id: ID): Movie
  }
 */
const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.boolean("_noop");
  }
});

const schema = makeSchema({
  types: [Query, Mutation, Movie, Hero, nexusPrisma],
  outputs: {
    typegen: join(__dirname, "../generated/nexus-typegen.ts"),
    schema: join(__dirname, "/schema.graphql")
  },
  typegenAutoConfig: {
    sources: [
      {
        source: "@generated/photon",
        alias: "photon"
      },
      {
        source: join(__dirname, "types.ts"),
        alias: "ctx"
      }
    ],
    contextType: "ctx.Context"
  }
});

const server = new GraphQLServer({
  schema,
  context: request => {
    return {
      ...request,
      photon
    };
  }
});

server
  .start(() => console.log(`🚀 Server ready at http://localhost:4000`))
  .then(httpServer => {
    async function cleanup() {
      httpServer.close();
      await photon.disconnect();
    }

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
  });
