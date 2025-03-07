import { eq } from "drizzle-orm"
import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"

interface GetSubscriptionParams {
    subscriptionId: string
}

export async function getSubscription({
    subscriptionId
}: GetSubscriptionParams) {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.id, subscriptionId))

    const subscription = result[0]

    return {
        name: subscription.name,
        email: subscription.email,
    }
}
