module.exports = function (fastify, opts, done) {
    const { redis } = fastify

    const interval = setInterval( async () => {
    
        try {
            const keys = await redis.keys("*")
            
            keys.forEach(async key => {
                const client = await fastify.pg.connect()
                const count = await redis.get(key)
                await client.query('UPDATE articles SET read_count = read_count + $1 WHERE id = $2', [count, key])
                redis.del(key)
                client.release()
            });

        } catch (error) {
            fastify.log.error(error)
            fastify.close()
        }
        
    }, 1000 * 10)
  
    fastify.addHook('onClose', (instance, done) => {
        clearInterval(interval)
        done()
    })

    done()
  }