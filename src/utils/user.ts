import { prisma } from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { User } from "@prisma/client"

export const checkUserAndSaveInDB = async (): Promise<User | Error> => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    try {
        if (!user) return new Error("Unauthenticated, user not found")
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: user.email || "" },
        });

        if (existingUser) return existingUser; // Return existing user if found    



        const savedUser: User = await prisma.user.create({
            data: {
                name: user?.given_name ?? " ",
                email: user?.email ?? " ",
                profilePic: user?.picture ?? " ",
            },
        });


        return savedUser

    } catch (error) {
        console.error("Database error:", error);
        return new Error("Failed to check or save user");

    }

}