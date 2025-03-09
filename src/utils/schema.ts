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



export const blogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be at most 100 characters long"),

  content: z
    .string()
    .min(100, "Content must be at least 100 characters long"),

  imageUrl: z
    .string()
    .url("Invalid image URL")
    .optional(),

  category: z
    .string()
    .min(1, "Category cannot be empty"),

  tags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .min(1, "At least one tag is required"),

  isPremium: z.boolean().default(false),

 

  views: z
    .number()
    .min(0, "Views cannot be negative")
    .default(0),

  authorId: z.string().uuid("Invalid author ID").optional(),
});

export type BlogData = z.infer<typeof blogSchema>;
