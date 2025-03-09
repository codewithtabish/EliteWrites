'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BlogData, blogSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import React from 'react'
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const BlogSubmissionForm = () => {
    const form = useForm<BlogData>({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: [],
            imageUrl: "",
            category: "",
        }
    });

    const blogSubmission = (values: BlogData) => {
        console.log(values);
    }

    return (
        <Card className="bg border-none md:max-w-3xl mx-auto">
            <CardContent className="flex flex-col w-full space-y-4">
                <Image src={"/logo.svg"} className="w-40 h-40 mx-auto" alt="logo" width={80} height={80} />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(blogSubmission)} className="space-y-4">
                        {/* Title Field */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Blog Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter blog title" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <Button type="submit" className="w-full">
                            Create
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default BlogSubmissionForm;
