import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getAllSubscribersFromEvent } from '../functions/get-all-subscribers'

export const getAllSubscribersRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/subscriptions', {
        schema: {
            summary: 'All subscribers from the event',
            tags: ['subscriptions'],
            response: {
                201: z.object({
                    message: z.string(),
                    data: z.object({
                        subscribers: z.array(z.object({
                            id: z.string(),
                            name: z.string(),
                            email: z.string(),
                        })),
                    }),
                }),
            }
        },
        
    }, async (request, reply) => {
        const { subscribers } = await getAllSubscribersFromEvent()

        return reply.status(201).send({
            message: 'All subscribers',
            data: { subscribers }
        })
    })
    
}