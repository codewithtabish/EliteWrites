'use server'

import { prisma } from "@/lib/db"
import { BlogData, blogSchema } from "@/utils/schema"
import { checkUserAndSaveInDB } from "@/utils/user"
import { BlogPost } from "@prisma/client"

type creationBlogResponse={
    success:boolean,
    message?:string,
    data?:BlogPost,
    error?:Record<string,string[]>
}

export const createBlogServerAction=async(data:BlogData)=>{

     // Validate incoming data
        const dataValidity = await blogSchema.safeParseAsync(data);
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

        try {
                const user = await checkUserAndSaveInDB();
                if (!user?.email) {
                  return { success: false, message: "User not found" };
                }

                const blogCreation=await prisma.blogPost.create({
                    data:{
                        title:dataValidity?.data?.title ?? "",
                        content:dataValidity?.data?.content ?? "",
                        imageUrl:dataValidity?.data?.imageUrl ?? "",
                        category:dataValidity?.data?.category ?? "",
                        isPremium: dataValidity?.data?.isPremium    ?? false,
                        authorId:user.id,
                        tags:dataValidity?.data?.tags ?? ["blog,"],


                    }
                })
                return { success: true, data: blogCreation };



        } catch (error) {
            console.error("Error creating blog post:", error);
            return { success: false, error: { general: ["An error occurred while creating the blog post."] } };
            
        }


}