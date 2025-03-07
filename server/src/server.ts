import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { 
    validatorCompiler, 
    serializerCompiler, 
    ZodTypeProvider,
    jsonSchemaTransform 
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { getRankingRoute } from './routes/get-ranking-route'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { accessInviteLinkRoute } from './routes/access-invite-link-route'
import { getAllSubscribersRoute } from './routes/get-all-subscribers-route'
import { getSubscriberInvitesClicksRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invite-count-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position'
import { updateSubscriptionRoute } from './routes/update-subscription-route'
import { deleteSubscriptionRoute } from './routes/delete-subscription-route'
import { getSubscriptionRoute } from './routes/get-subscription-route'

import { env } from './env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Permissions for the frontend
app.register(fastifyCors)

// Swagger documentation
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'NLW Connect',
            version: '0.0.1',
        }
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})

// Routes
app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getAllSubscribersRoute)
app.register(getRankingRoute)
app.register(getSubscriberInvitesCountRoute)
app.register(getSubscriberInvitesClicksRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getSubscriptionRoute)
app.register(updateSubscriptionRoute)
app.register(deleteSubscriptionRoute)

// Start the server
app.listen( { port: env.PORT }).then(() => {
    console.log('Server is running on http://localhost:3333')
})