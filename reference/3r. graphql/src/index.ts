import { GraphQLServer } from "graphql-yoga";
import { join } from "path";
import { makeSchema, objectType, idArg, stringArg } from "@prisma/nexus";
import Photon from "@generated/photon";
import { Context } from "./types";
import { nexusPrismaMethod } from "@generated/nexus-prisma";

const photon = new Photon();

const nexusPrisma = nexusPrismaMethod({
  photon: (ctx: Context) => ctx.photon
});

export const Hero = objectType({
  name: "Hero",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.movies({
      pagination: false
    });
  }
});

export const Movie = objectType({
  name: "Movie",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();
    t.model.released();
    t.model.mainCharacter();
  }
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.findOneMovie({
      alias: "movie"
    });

    t.list.field("feed", {
      type: "Movie",
      resolve: (parent, args, ctx) => {
        return ctx.photon.movies.findMany({
          where: { released: true }
        });
      }
    });

    t.list.field("filterMovies", {
      type: "Movie",
      args: {
        searchString: stringArg({ nullable: true })
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.photon.movies.findMany({
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
      }
    });
  }
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.createOneHero({ alias: "signupHero" });
    t.field("deleteMovie", {
      type: "Movie",
      args: {
        id: idArg({
          nullable: false
        })
      },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.movies.delete({
          where: {
            id: id
          }
        });
      }
    });

    t.field("createMovie", {
      type: "Movie",
      args: {
        title: stringArg(),
        description: stringArg({ nullable: true }),
        mainCharacterEmail: stringArg()
      },
      resolve: (parent, { title, description, mainCharacterEmail }, ctx) => {
        return ctx.photon.movies.create({
          data: {
            title,
            description,
            released: false,
            mainCharacter: {
              connect: { email: mainCharacterEmail }
            }
          }
        });
      }
    });

    t.field("release", {
      type: "Movie",
      nullable: true,
      args: {
        id: idArg()
      },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.movies.update({
          where: { id },
          data: { released: true }
        });
      }
    });
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
