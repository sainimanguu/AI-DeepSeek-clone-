import { clerkClient } from "@clerk/express";

export const auth = async () => {
    try {
        const { userId, has } = await req.auth();

        const user = await clerkClient.users.getUser(userId)

        

    }
    catch (error) {

    }
}