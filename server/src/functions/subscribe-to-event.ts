import { eq } from "drizzle-orm"
import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"
import { redis } from "../redis/client"

interface SubscribeToEventParams {
    name: string
    email: string
    referrerId?: string | null
}

export async function subscribeToEvent({
    name,
    email,
    referrerId
}: SubscribeToEventParams) {
    const subscribes = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.email, email))    

    if (subscribes.length > 0) {
        return { subscriberId: subscribes[0].id }
    }

    
    const result = await db.insert(subscriptions).values({
        name,
        email,
    }).returning()

    if (referrerId) {
        await redis.zincrby('referral:count', 1, referrerId)
    }

    const subscriber = result[0]

    return {
        subscriberId: subscriber.id,
    }
}