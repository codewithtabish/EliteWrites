'use server'
import { prisma } from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { User } from "@prisma/client"
import {OnboardingData, onboardingSchema} from '@/utils/schema'
import { z } from "zod"


export const checkUserAndSaveInDB = async (): Promise<User | null> => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    try {
        if (!user) return null
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
        return null
        // return new Error("Failed to check or save user");

    }

}


export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    try {
        const user = await prisma.user.findUnique({ where: { username } });
        return !user;
    } catch (error) {
        console.error("Database error:", error);
        return false;
    }
}



// Define the return type
type UpdateUserResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>; // Extracted errors
  data?: any;
};

export const onBoardCompletion = async (data: OnboardingData): Promise<UpdateUserResponse> => {
  try {
    // Get authenticated user
    const user = await checkUserAndSaveInDB();
    if (!user?.email) {
      return { success: false, message: "User not found" };
    }

    // Validate incoming data
    const dataValidity = await onboardingSchema.safeParseAsync(data);
    if (!dataValidity.success) {
      // Extract _errors arrays into a flat object
      const formattedErrors: Record<string, string[]> = Object.fromEntries(
        Object.entries(dataValidity.error.format()).map(([key, value]) => [
          key,
        //   value._errors,
        ])
      );

      return { success: false, errors: formattedErrors };
    }

    // Update user data in DB
    const updatedUser = await prisma.user.update({
      where: { email: user.email },
      data: {
        bio: dataValidity.data.bio,
        categories: dataValidity.data.categories,
        username: dataValidity.data.username,
        onBoardingScreen:true,
        // categories: dataValidity.data.categories,
        

        // website: dataValidity.data.website, // Uncomment if needed
        // profilePic: dataValidity.data.profileImageUrl, // Uncomment if needed
      },
    });

    

    return { success: true, message: "User updated successfully", data: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Something went wrong", errors: { general: [(error as Error).message] } };
  }
};
