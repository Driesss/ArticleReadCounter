# ArticleReadCounter
Updates article read count on api request


## Usage
- prod: `npm start`
- dev: `npm run start-dev`

### environment variables
| Variable        | Description               | Default       |
|-----------------|---------------------------|---------------|
| `API_PORT`      | port to expose the api on | `3000`        |
| `REDIS_HOST`    | redis host ip             | `localhost`   |
| `REDIS_PASS`    | redis password            | `nil`         |
| `POSTGRES_HOST` | postgres host ip          | `localhost`   |
| `POSTGRES_PORT` | postgres port             | `5432`        |
| `POSTGRES_USER` | postgres user name        | `postgres`    |
| `POSTGRES_PASS` | postgres user password    | `postgres`    |
| `POSTGRES_DB`   | postgres database         | `nil`         |