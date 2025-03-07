import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteSubscription } from '../functions/delete-subscription'

const deleteSubscriptionResponseSchema = z.object({
    message: z.string()
})

export const deleteSubscriptionRoute: FastifyPluginAsyncZod = async (app) => {
    app.delete('/subscriptions/:subscriptionId', {
        schema: {
            summary: 'Delete a subscription',
            tags: ['subscriptions'],
            params: z.object({
                subscriptionId: z.string(),
            }),
            response: {
                201: deleteSubscriptionResponseSchema
            }
        },
        
    }, async (request, reply) => {
        const { subscriptionId } = request.params

        await deleteSubscription({subscriptionId})

        return reply.status(201).send({
            message: 'Subscription deleted'
        })
    })
    
}