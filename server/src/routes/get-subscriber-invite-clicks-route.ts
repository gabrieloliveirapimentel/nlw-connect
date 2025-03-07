import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscriberInvitesClicks } from '../functions/get-subscriber-invites-clicks'

export const getSubscriberInvitesClicksRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/subscribers/:subscriberId/ranking/clicks', {
        schema: {
            summary: 'Get subscriber invite clicks count',
            tags: ['referral'],
            params: z.object({
                subscriberId: z.string(),
            }),
            response: {
                200: z.object({
                    message: z.string(),
                    data: z.object({
                        count: z.number(),
                    }),
                }),
            }
        },
        
    }, async (request, reply) => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInvitesClicks({subscriberId})

        return reply.send({
            message: 'Subscriber invite clicks count',
            data: { count }
        })
    })
    
}