import { z } from "zod";

export const onboardingSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters long"),
    // .max(160, "Bio must be at most 160 characters long"),
    // .optional(), // Bio is optional

//   profileImageUrl: z
//     .string()
//     .url("Invalid profile image URL"), // Must be a valid URL

  categories: z
    .array(z.string().min(1, "Category cannot be empty"))
    .min(1, "At least one category is required"),
});

export type OnboardingData = z.infer<typeof onboardingSchema>;
