module.exports = function (fastify, opts, done) {
    fastify.post('/counter', async (request, reply) => {
        const { body } = request
        const { redis } = fastify
        await redis.incr(body.id)
        reply.code(204)
    })
    fastify.get('/page', async (request, reply) => {
        const pagesize = 30
        var skip = pagesize * (request.query.page - 1)
        const client = await fastify.pg.connect()
        var result
        if (request.query.search) {
            result = await client.query('SELECT * FROM articles WHERE id > $1 AND title LIKE $2 ORDER BY read_count desc LIMIT $3', [skip, `%${request.query.search}%`, pagesize])
        } else {
            result = await client.query('SELECT * FROM articles WHERE id > $1 ORDER BY read_count desc LIMIT $2', [skip, pagesize])
        }
        const rowQuery = await client.query('SELECT COUNT(id) FROM articles')
        const rowCount = rowQuery.rows[0].count;
        const pageCount = Math.ceil(rowCount / pagesize)
        client.release()
        return { results: result.rows, pageCount, currentPage: request.query.page }

    })
    fastify.get('/', async (request, reply) => {
        const client = await fastify.pg.connect()
        const { rows } = await client.query('SELECT * FROM articles ORDER BY read_count desc LIMIT 100' )
        client.release()
        return rows

    })
    done()
}