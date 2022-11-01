import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'

const prisma = new PrismaClient({
    log: ['query'],
})

/**
 * Função inicial, por padrão de alguns frameworks, bootstrap
 */
async function boostrap() {
    const fastify = Fastify({
        //Propridade para monitorar erros da aplicação
        logger: true,
    })

    //Permite apenas que fontes confiáveis consigam acessar a aplicação
    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/pools/count', async () => {
        const pools = await prisma.pool.count()

        return { count: 1111}
    })

    /* 
        Porta definida para rodar a aplicação,
        utilizar host para que a aplicação rode sem problemas no android
    */
    
    await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

boostrap()