const fastify = require('fastify')({ logger: true })

require('dotenv').config()

// Get env vars
const API_PORT = process.env.API_PORT || 3000
const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
const REDIS_PASS = process.env.REDIS_PASS
const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost'
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_PASS = process.env.POSTGRES_PASS || 'postgres'
const POSTGRES_PORT = process.env.POSTGRES_PORT || '5432'
const POSTGRES_DB = process.env.POSTGRES_DB

fastify.register(require('fastify-redis'), { host: REDIS_HOST, password: REDIS_PASS })
fastify.register(require('fastify-postgres'), { connectionString: `postgresql://${POSTGRES_USER}:${POSTGRES_PASS}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}` })
fastify.register(require('./plugins/dbworker'))

// Declare a route
fastify.route({
    method: 'POST',
    url: '/',
    schema: {
        // request needs to have a body with an `id` parameter
        body: {
            id: { type: 'string' }
        },
        // the response needs to be an object with an `hello` property of type 'string'
        response: {
            204: {
                type: 'null',
            }
        }
    },
    // this function is executed for every request before the handler is executed
    preHandler: async (request, reply) => {
        // E.g. check authentication
    },
    handler: async (request, reply) => {
        const { body } = request
        const { redis } = fastify
        await redis.incr(body.id)
        reply.code(204)
    }
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(API_PORT)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()