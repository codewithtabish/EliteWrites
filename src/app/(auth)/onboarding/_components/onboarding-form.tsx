"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { OnboardingData, onboardingSchema } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RippleButton } from "@/components/magicui/ripple-button";
import { toast } from "sonner";
import { checkUserAndSaveInDB, checkUsernameAvailability, onBoardCompletion } from "@/utils/user";
import { CheckCircle, XCircle, Loader2, Loader } from "lucide-react"; // Import icons
import BlogCategoryList from "./category-list";
import { useRouter } from "next/navigation";

const OnBoardingForm = () => {
    const router=useRouter()
  const form = useForm<OnboardingData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      username: "",
      bio: "",
      categories: [],
    },
  });

  const [pending, setPending] = useState(false);
  const [usernameStatus, setUsernameStatus] = useState<"available" | "taken" | "checking" | null>(null);

  // Check username availability with debounce
  useEffect(() => {
    const checkUsername = async () => {
      const username = form.getValues("username").trim();
      if (username.length < 3) {
        setUsernameStatus(null);
        return;
      }
      setUsernameStatus("checking");
      try {
        const isAvailable = await checkUsernameAvailability(username);
        setUsernameStatus(isAvailable ? "available" : "taken");
      } catch (error) {
        console.error("Error checking username:", error);
        setUsernameStatus(null);
      }
    };

    const debounce = setTimeout(checkUsername, 500);
    return () => clearTimeout(debounce);
  }, [form.watch("username")]);

  async function onSubmit(values: OnboardingData) {
    try {
      setPending(true)

      
  
      const response = await onBoardCompletion(values);
  
      if (!response.success) {
        if (response.errors) {
          // Show validation errors
          Object.entries(response.errors).forEach(([field, messages]) => {
            messages.forEach((message) => toast.error(`${field}: ${message}`));
          });
        } else {
          toast.error(response.message || "Something went wrong. Please try again.");
        }
        return;
      }
  
      toast.success("OnBoarding completed!");
      if(response?.success){
        router.push("/dashboard")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }
  

  return (
    <Card className="bg border-none md:max-w-3xl mx-auto">
      <CardContent className="flex flex-col w-full space-y-4">
        <Image src={"/logo.svg"} className="w-40 h-40 mx-auto" alt="logo" width={80} height={80} />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="text-gray-400 border-gray-600 p-8 border-[1px] pr-10"
                      />
                    </FormControl>
                    {usernameStatus === "checking" && (
                      <Loader2 className="absolute right-3 top-7 animate-spin text-gray-400" size={20} />
                    )}
                    {usernameStatus === "available" && (
                      <CheckCircle className="absolute right-3 top-7 text-green-500" size={20} />
                    )}
                    {usernameStatus === "taken" && (
                      <XCircle className="absolute right-3 top-7 text-red-500" size={20} />
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio Field */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself"
                      {...field}
                      className="text-gray-400 border-gray-600 p-8 border-[1px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                   <BlogCategoryList field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/* Submit Button */}
            <RippleButton
              rippleColor="#ADD8E6"
              type="submit"
              disabled={pending || usernameStatus === "taken"}
              className={`w-full bg text-white p-4 relative  rounded-md border-[1px] border-gray-600 mt-6
                ${pending?"cursor-not-allowed":"cursor-pointer"}`}
            >
                <p className="">
              {pending ? "Submitting..." : "Submit"}

                </p>
                <div className={` ${!pending?"hidden":"absolute -right-[500%] bottom-0.5"}`}>

                <Loader className="w-6 h-6 ">

                </Loader>
                </div>
            </RippleButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnBoardingForm;
