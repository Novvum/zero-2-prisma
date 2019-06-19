# REST API Example

This example shows how to implement a **REST API with TypeScript** using [Express.JS](https://expressjs.com/de/) and Prisma.

## How to use

### 1. Install dependencies

Install Node dependencies:

```
yarn install
```

### 2. Install the Prisma CLI

To run the example, you need the Prisma CLI. Please install it via yarn.

```
yarn global add prisma2
```

### 3. Set up database & deploy Prisma schema

```
prisma2 lift save --name 'init'
prisma2 lift up
prisma2 generate
```

### 4. Start the REST API server

```
yarn start
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

### 5. Using the REST API

#### `GET`

- `/feed`: Fetch all _released_ movies
- `/filterMovies?searchString={searchString}`: Filter movies by `title` or `description`
- `/movie/:id`: Fetch a single movie by its `id`

#### `POST`

- `/hero`: Create a new hero
  - Body:
    - `name: String` (optional): The name of the hero
    - `email: String` (required): The email address of the hero
- `/movie`: Create a new movie
  - Body:
    - `title: String` (required): The title of the movie
    - `description: String` (optional): The description of the movie
    - `mainHeroEmail: String` (required): The email of the hero that creates the movie

#### `PUT`

- `/release/:id`: Release a movie by its `id`

#### `DELETE`

- `/movie/:id`: Delete a movie by its `id`

### 6. Update the database

```
prisma2 lift save --name "changed-to-superheroes"
```
