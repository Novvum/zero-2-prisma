# GraphQL Server Example

This example shows how to implement a **GraphQL server with TypeScript** based on Prisma, [graphql-yoga](https://github.com/prisma/graphql-yoga) and [GraphQL Nexus](https://graphql-nexus.com/).

## How to use

### 1. Install dependencies

Install Node dependencies:

```
yarn install
```

Install `yoga` and `nexus`

```
yarn add graphql-yoga @prisma/nexus nexus
```

### 2. Install the Prisma CLI

To run the example, you need the Prisma CLI. Please install it via Yard.

```
yarn install -g prisma2
```

### 3. Set up database & deploy Prisma schema

```
prisma2 lift save --name 'init'
prisma2 lift up
prisma2 generate
yarn seed
```

### 4. Start the GraphQL server

Launch your GraphQL server with this command:

```
yarn start
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### 5. Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./src/schema.graphql`](./src/schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all released movies and their mainCharacters

```graphql
query {
  feed {
    id
    title
    description
    released
    mainCharacter {
      id
      name
      email
    }
  }
}
```

<Details><Summary><strong>See more API operations</strong></Summary>

#### Create a new hero

```graphql
mutation {
  signupHero(name: "Sarah", email: "sarah@prisma.io") {
    id
  }
}
```

#### Create a new movie

```graphql
mutation {
  createMovie(
    title: "Join the Prisma Slack"
    description: "https://slack.prisma.io"
    mainCharacterEmail: "alice@prisma.io"
  ) {
    id
    released
  }
}
```

#### Release an existing movie

```graphql
mutation {
  release(id: "__MOVIE_ID__") {
    id
    released
  }
}
```

> **Note**: You need to replace the `__MOVIE_ID__`-placeholder with an actual `id` from a `Movie` item. You can find one e.g. using the `filterMovies`-query.

#### Search for movies with a specific title or description

```graphql
{
  filterMovies(searchString: "graphql") {
    id
    title
    description
    released
    mainCharacter {
      id
      name
      email
    }
  }
}
```

#### Retrieve a single movie

```graphql
{
  movie(id: "__MOVIE_ID__") {
    id
    title
    description
    released
    mainCharacter {
      id
      name
      email
    }
  }
}
```

> **Note**: You need to replace the `__MOVIE_ID__`-placeholder with an actual `id` from a `Movie` item. You can find one e.g. using the `filterMovies`-query.

#### Delete a movie

```graphql
mutation {
  deleteMovie(id: "__MOVIE_ID__") {
    id
  }
}
```

> **Note**: You need to replace the `__MOVIE_ID__`-placeholder with an actual `id` from a `Movie` item. You can find one e.g. using the `filterMovies`-query.

</Details>

### 6. Changing the GraphQL schema

To make changes to the GraphQL schema, you need to manipulate the `Query` and `Mutation` types that are defined in [`index.ts`](./src/index.ts).

Note that the [`start`](./package.json#L6) script also starts a development server that automatically updates your schema every time you save a file. This way, the auto-generated [GraphQL schema](./src/generated/schema.graphql) updates whenever you make changes in to the `Query` or `Mutation` types inside your TypeScript code.

## Next steps

- [Use Prisma with an existing database](https://github.com/prisma/prisma2-docs/blob/master/introspection.md)
- [Explore the Photon API](https://github.com/prisma/prisma2-docs/blob/master/photon/api.md)
