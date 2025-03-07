import { eq } from "drizzle-orm"
import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"

interface DeleteSubscriptionParams {
    subscriptionId: string
}

export async function deleteSubscription({
    subscriptionId
}: DeleteSubscriptionParams) {
    const result = await db.delete(subscriptions).where(eq(subscriptions.id, subscriptionId)).returning()

    const subscription = result[0]

    return {
        subscriptionId: subscription.id,
    }
}
