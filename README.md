# ArticleReadCounter
Updates article read count on api request


## Usage
prod: npm start
dev: npm run start-dev

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

const API_PORT = process.env.API_PORT || 3000
const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PASS = process.env.REDIS_PASS
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost'
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_PASS = process.env.POSTGRES_PASS || 'postgres'
const POSTGRES_PORT = process.env.POSTGRES_PORT || '5432'
const POSTGRES_DB = process.env.POSTGRES_DB