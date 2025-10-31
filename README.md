# un-STToPZ-paDle Stack

Goal: *Be willing to spin up infra to have a faster developer experience.*

The unSTToPpable Stack is a set of JavaScript-based technologies used for building full-stack web applications:
- [SvelteKit](https://svelte.dev/)
- [Temporal](https://temporal.io/)
- [Turborepo](https://turborepo.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zero](https://zero.rocicorp.dev/)
- [Drizzle](https://orm.drizzle.team/)

## Prerequisite

In order to *build* this project you will need the following:

- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/get-started/get-docker/)

In order to *run* this project you will need to have the following services:

- [Temporal Server](https://docs.temporal.io/cli#start-dev-server)

## Local Development

Run the following commands:
1. pnpm install
1. docker compose up -d postgres
1. pnpm run dev
1. pnpm run dev:zero-cache

## Production

After deploying apps to production, you also want to execute the following command:

1. pnpm run prod:zero-deploy

### (Optional) Docker Compose

Run the following commands:
1. pnpm install
1. pnpm run build
1. docker compose up:
- The *docker-compose-full.yml* will spin up everything for you.
- The *docker-compose.yml* will not spin up Temporal, but everything else.

## Tips

### How to connect to PostgresDB?

Attach a shell to the PostgresDB and run the following command:

1. psql -U user -d postgres
1. \dt
