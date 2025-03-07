import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { updateSubscription } from '../functions/update-subscription'

export const updateSubscriptionRoute: FastifyPluginAsyncZod = async (app) => {
    app.put('/subscriptions/:subscriptionId', {
        schema: {
            summary: 'Update a subscription',
            tags: ['subscriptions'],
            params: z.object({
                subscriptionId: z.string(),
            }),
            body: z.object({
                name: z.string(),
                email: z.string(),
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
        const { name, email } = request.body

        await updateSubscription({subscriptionId, name, email})

        return reply.status(201).send({
            message: 'Subscription updated',
            data: { subscriptionId, name, email }
        })
    })
    
}