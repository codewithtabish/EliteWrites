"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BlogData, blogSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import RichTextEditor from "./text-editor";
import Example from "./blog-tags";
import BlogCategoryBox from "./blog-categories-box";
import BlogPreviewDialouge from "./blog-preview";
import { Eye, XIcon } from "lucide-react";
import { toast } from "sonner";
import { UploadDropzone } from "@/components/general/uploadthing-export";
import CreateBlogPage from "../create/page";
import { createBlogServerAction } from "@/actions/blog";
import { useRouter } from "next/navigation";
import { checkUserAndSaveInDB } from "@/utils/user";

const BlogSubmissionForm = ({user}:{user:any}) => {
      const router=useRouter()
      const [blogLimit, setblogLimit] = useState<boolean>(false)
  
  const [submissionState, setSubmissionState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submittedData, setSubmittedData] = useState<BlogData | null>(null);
  const [previewData, setpreviewData] = useState<any>();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  // const user=checkUserAndSaveInDB()

//  success: false, message: "You have reached the maximum number of blog posts  
if ((user?.createdBlogs ?? 0) >= 5 && user?.userType === "FREE") {
  // toast.warning("created blogs more")
  // setblogLimit(true);
  // return { success: false, message: "You have reached the maximum number of blog posts." };
}

  const form = useForm<BlogData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
      imageUrl: "",
      category: "",
    },
  });

  const blogSubmission = async (values: BlogData) => {
    try {
      setSubmissionState("loading");
      const response=await createBlogServerAction(values)
       if (!response.success) {
              if (response.errors) {
                // Show validation errors
                Object.entries(response.errors).forEach(([field, messages]) => {
                  messages.forEach((message) => toast.error(`${field}: ${message}`));
                });
              } else {
                toast.error(response.message || "Something went wrong. Please try again.");
                setSubmissionState("error");

              }
              return;
            }
        
            toast.success("OnBoarding completed!");
            if(response?.success){
              setpreviewData(response.data);
              setSubmissionState("success");
              router.push("/dashboard")
            }
      setSubmissionState("success");
    
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmissionState("error");
      toast.error( "Something went wrong. Please try again.");

    }
  };

  useEffect(() => {
    console.log("Submission State:", submissionState);
  }, [submissionState]);

  const openPrviewAndSetData = () => {
    setIsPreviewOpen(true);
    setpreviewData(form.getValues());
  }

  return (
    <Card className="bg border-none md:max-w-3xl mx-auto overflow-x-hidden">
      <CardContent className="flex flex-col w-full space-y-4">
        <Image src="/logo.svg" className="w-40 h-40 mx-auto" alt="logo" width={80} height={80} />

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Submit button clicked");
              form.handleSubmit(blogSubmission)();
            }}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter blog title" className="text-white p-6 border-[1px] border-gray-600" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      content={field.value}
                      onChange={(value: any) => {
                        console.log("Content updated:", value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags Input */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Example selectedTags={field.value} setSelectedTags={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Selection */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <BlogCategoryBox
                      selectedCategory={field.value}
                      onCategorySelect={(selected) => field.onChange(selected)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Cover  Image</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative w-fit">
                          <Image
                            src={field.value}
                            alt="Company Logo"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 "
                            onClick={() => field.onChange("")}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        // <p>
                        //     Upload your company logo. This will be displayed on your
                        //     job postings.
                        // </p>

                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res: any) => {
                            field.onChange(res[0].url);
                            toast.success("Logo uploaded successfully!");
                          }}
                          onUploadError={() => {
                            toast.error("Something went wrong. Please try again.");
                          }}
                          className="border border-dashed border-gray-800 rounded-md p-2 w-40 h-40 flex flex-col items-center justify-center text-sm mx-auto bg-red-600 hover:bg-orange-500 transition duration-200 cursor-pointer"
                        />

                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />







         {
          (user?.userType=='FREE'&&user?.createdBlogs>=5)?
          <Button className="w-full p-3 my-5 " disabled variant={'outline'}>
            You have reached your blog limit
          </Button>:
             <Button type="submit" variant={'outline'} className="w-full text-white p-6 my-5 cursor-pointer hover:text-white" disabled={(submissionState === "loading"||blogLimit||(user?.userType==="FREE" && user?.createdBlogs>=5) )}
             >
               {
                 (user?.userType==="FREE" && user?.createdBlogs>=5)&&""
 
               }
                                {submissionState === "loading" ? "Submitting..." : "Create"}
 
               {/* {(user?.userType==="FREE" && user?.createdBlogs>=5)&& "you have reached the limit"} */}
 
             </Button>
         }

          </form>



        </Form>
        {/* 
        {submissionState === "success" && submittedData && (
          <div className="p-4 border border-green-500 rounded-lg bg-green-100 text-green-700">
            <h3 className="text-lg font-semibold">Submission Successful!</h3>
            <p><strong>Title:</strong> {submittedData.title}</p>
            <p><strong>Content:</strong> {submittedData.content}</p>
          </div>
        )} */}

        {submissionState === "error" && (
          <div className="p-4 border border-red-500 rounded-lg bg-red-100 text-red-700">
            <h3 className="text-lg font-semibold">Submission Failed!</h3>
            <p>Please try again later.</p>
          </div>
        )}

      </CardContent>
      <div className="absolute bottom-0 right-5">


        <BlogPreviewDialouge previewData={previewData}>
          <p className="text-white" onClick={openPrviewAndSetData}>
            <Eye className="w-6 h-6" />
          </p>

        </BlogPreviewDialouge>
      </div>
    </Card>
  );
};

export default BlogSubmissionForm;
