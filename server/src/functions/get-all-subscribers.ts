import { eq } from "drizzle-orm"
import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"

export async function getAllSubscribersFromEvent() {
    const subscribers = await db
        .select()
        .from(subscriptions)

    return { subscribers }
}