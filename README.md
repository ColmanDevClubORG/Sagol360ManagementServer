# Sagol360 Management Server

## Prerequisites

Install the following before running the server:

- `Node.js` 20 or newer
- `pnpm`
- `Git`

Recommended package manager: `pnpm`

This repository currently contains both `pnpm-lock.yaml` and `package-lock.json`, but the project hooks use `pnpm`, so use `pnpm` for local development.

## Install Dependencies

From the project root:

```bash
pnpm install
```

Project root:

```text
Sagol360ManagementServer/
```

## Run The Server In Development

Start the development server:

```bash
pnpm dev
```

The server should start on:

```text
http://localhost:3000
```

Swagger API documentation should be available at:

```text
http://localhost:3000/api-docs
```

## Verify The Server Works

After running `pnpm dev`, open:

```text
http://localhost:3000
```

Expected response:

```text
Hello Express + TypeScript (MVC)
```

You can also test it from the terminal:

```bash
curl http://localhost:3000
```

## Build For Production

Compile the TypeScript source into `dist/`:

```bash
pnpm build
```

Run the compiled server:

```bash
pnpm start
```

Production start command:

```bash
node dist/index.js
```

## Environment Variables

The currently checked-in `src/index.ts` uses a fixed port:

```ts
const PORT = 3000;
```

That means the current server does not require a `.env` file to start.

If future branches re-enable environment-based configuration, create a local `.env` file like this:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/sagol360managementserver
```

Do not commit real secrets to Git.

## Database Status

The project has `mongoose` installed and includes an example Mongoose model:

```text
src/models/exampleModel.mongoose.ts
```

However, in the currently checked-in source, the server does not connect to MongoDB during startup.

Current behavior:

- No active `mongoose.connect(...)` call runs from `src/index.ts`
- MongoDB is not required to start the current server
- The existing endpoint `/` returns a static example response

If a feature branch adds real database-backed modules, make sure MongoDB is running and configure:

```env
MONGO_URI=mongodb://127.0.0.1:27017/sagol360managementserver
```

## Project Structure

```text
src/
  app.ts                         Express app setup, middleware, routes, Swagger
  index.ts                       Server entry point
  controllers/                   Request handlers
  routes/                        API route definitions
  services/                      Business logic
  models/                        Mongoose models
  middleware/                    Express middleware
  utils/                         Shared utilities
  db/                            Local example JSON data
```
