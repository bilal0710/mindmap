# Mindmap

## General

I use Nx to manage the monorepo. The web app is built with Angular and the backend is built with NestJS.
## Installation
```bash
# Install dependencies
npm install

# Before starting for the first time you need to start the docker and migrate with prisma.
docker-compose up -d
npm run prisma:migrate

# Start App + Backend (Gateway + Microservices)
npm run start:all

```
## Technologies

- Docker
- Docker Compose

### Backend

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)

### Frontend

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [ngx-translate](https://github.com/ngx-translate/core)
- [@swimlane/ngx-Graph](https://swimlane.github.io/ngx-graph/)
- [Apollo Client](https://the-guild.dev/graphql/apollo-angular)
- [GraphQL code generator](https://the-guild.dev/graphql/codegen)
