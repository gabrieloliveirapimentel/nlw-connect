import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/invites/:subscriberId', {
        schema: {
            summary: 'Access invite link and redirects user',
            tags: ['referral'],
            params: z.object({
                subscriberId: z.string(),
            }),
            response: {
                302: z.null(),
            }
        },
        
    }, async (request, reply) => {
        const { subscriberId } = request.params
        await accessInviteLink({subscriberId})

        const redirectUrl = new URL(env.APP_URL)
        redirectUrl.searchParams.set('referrer', subscriberId)

        return reply.redirect(redirectUrl.toString(), 302)
    })
    
}