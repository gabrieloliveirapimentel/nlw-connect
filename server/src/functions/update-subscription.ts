import { eq } from "drizzle-orm"
import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"

interface UpdateSubscriptionParams {
    subscriptionId: string
    name: string
    email: string
}

export async function updateSubscription({
    subscriptionId,
    name,
    email
}: UpdateSubscriptionParams) {
    const result = await db.update(subscriptions).set({
        name,
        email,
    }).where(eq(subscriptions.id, subscriptionId)).returning()

    const subscription = result[0]

    return {
        subscriptionId: subscription.id,
    }
}
