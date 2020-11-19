module.exports = function (fastify, opts, done) {
    fastify.post('/counter', async (request, reply) => {
        const { body } = request
        const { redis } = fastify
        await redis.incr(body.id)
        reply.code(204)
    })
    fastify.get('/page', async (request, reply) => {
        var skip = 30 * (request.query.page - 1)
        const client = await fastify.pg.connect()
        const { rows } = await client.query('SELECT * FROM articles WHERE id > $1 ORDER BY read_count desc LIMIT 30', [skip])
        client.release()
        return { results: rows }

    })
    fastify.get('/', async (request, reply) => {
        const client = await fastify.pg.connect()
        const { rows } = await client.query('SELECT * FROM articles ORDER BY read_count desc LIMIT 100' )
        client.release()
        return rows

    })
    done()
}