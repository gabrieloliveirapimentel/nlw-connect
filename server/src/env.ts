import { z } from 'zod'
import { config } from 'dotenv'

config()

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    POSTGRES_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    API_URL: z.string().url(),
    APP_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)