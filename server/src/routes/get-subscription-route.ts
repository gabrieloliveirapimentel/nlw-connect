import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscription } from '../functions/get-subscription'

export const getSubscriptionRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/subscriptions/:subscriptionId', {
        schema: {
            summary: 'Get a subscription',
            tags: ['subscriptions'],
            params: z.object({
                subscriptionId: z.string(),
            }),
            response: {
                201: z.object({
                    message: z.string(),
                    data: z.object({
                        subscriptionId: z.string(),
                        name: z.string(),
                        email: z.string(),
                    }),
                }),
            }
        },
        
    }, async (request, reply) => {
        const { subscriptionId } = request.params
        const { name, email } = await getSubscription({subscriptionId})

        return reply.status(201).send({
            message: 'Subscription info',
            data: { subscriptionId, name, email }
        })
    })
    
}