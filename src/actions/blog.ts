'use server'

import { prisma } from "@/lib/db"
import { generateSlug } from "@/utils/generate-blog"
import { BlogData, blogSchema } from "@/utils/schema"
import { checkUserAndSaveInDB } from "@/utils/user"
import { BlogPost } from "@prisma/client"
import { title } from "process"

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
                if ((user?.createdBlogs ?? 0) >= 5 && user?.userType === "FREE") {
                  return { success: false, message: "You have reached the maximum number of blog posts." };
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
                        slug:generateSlug(dataValidity?.data?.title ?? ""),




                    },
                    
                  
                })

                // Increment the user's created blogs count
    await prisma.user.update({
      where: { id: user.id },
      data: {
        createdBlogs: { increment: 1 }, // Increment the count by 1
      },
    });

                return { success: true, data: blogCreation };



        } catch (error) {
            console.error("Error creating blog post:", error);
            return { success: false, error: { general: ["An error occurred while creating the blog post."] } };
            
        }


}






type FeaturedBlogsResponse = {
  success: boolean;
  message?: string;
  data?: BlogPost[];
  error?: Record<string, string[]>;
};

export const fetchFeaturedBlogs = async (): Promise<FeaturedBlogsResponse> => {
  try {
    const blogs = await prisma.blogPost.findMany({
      where: {
        views: { gt: 0 }, // Fetch only blogs with at least 1 view
      },
      orderBy: {
        views: "desc", // Sort by most views first
      },
      take: 8, // Get the top 8 most viewed blogs
    });

    return {
      success: true,
      message: "Featured blogs fetched successfully.",
      data: blogs,
    };
  } catch (error) {
    console.error("Error fetching featured blogs:", error);

    return {
      success: false,
      message: "Failed to fetch featured blogs.",
      error: {
        database: ["An error occurred while retrieving blogs."],
      },
    };
  }
};







type SingleBlogResponse = {
  success: boolean;
  message?: string;
  data?: BlogPost;
  error?: Record<string, string[]>;
};

export const fetchSingleBlog = async (slug: string): Promise<SingleBlogResponse> => {
  try {
    if(!slug){
        return { success: false, message: "Blog post not found." };
    }
    const blogPost = await prisma.blogPost.findFirst({
      where: { slug }, // Works with non-unique fields
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        comments: {
          select: { id: true, content: true, createdAt: true, user: { select: { id: true, name: true } } },
        },
        likes: { select: { id: true, userId: true } },
        shares: { select: { id: true, userId: true } },
        bookmarks: { select: { id: true, userId: true } },
      },
    });

    if (!blogPost) {
      return { success: false, message: "Blog post not found." };
    }

    return { success: true, data: blogPost };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while fetching the blog post.",
      error: { general: [(error as Error).message] },
    };
  }
};


