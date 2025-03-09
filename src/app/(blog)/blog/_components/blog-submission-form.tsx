'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { BlogData, blogSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import RichTextEditor from './text-editor'

const BlogSubmissionForm = () => {
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submittedData, setSubmittedData] = useState<BlogData | null>(null)

  const form = useForm<BlogData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: [],
      imageUrl: '',
      category: '',
    },
  })

  const blogSubmission = async (values: BlogData) => {
    try {
      console.log('Form Submitted:', values) // Debugging

      setSubmissionState('loading')

      // Simulating API submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmittedData(values)
      setSubmissionState('success')
    } catch (error) {
      console.error('Submission Error:', error)
      setSubmissionState('error')
    }
  }

  useEffect(() => {
    console.log('Submission State:', submissionState) // Debugging state updates
  }, [submissionState])

  return (
    <Card className="bg border-none md:max-w-3xl mx-auto">
      <CardContent className="flex flex-col w-full space-y-4">
        <Image src="/logo.svg" className="w-40 h-40 mx-auto" alt="logo" width={80} height={80} />

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              console.log('Submit button clicked') // Debugging
              form.handleSubmit(blogSubmission)()
            }}
            className="space-y-4"
          >
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter blog title"
                    className='text-white p-6 border-[1px] border-gray-600' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rich Text Editor */}
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
                        console.log('Content updated:', value) // Debugging
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={submissionState === 'loading'}>
              {submissionState === 'loading' ? 'Submitting...' : 'Create'}
            </Button>
          </form>
        </Form>

        {/* Submission Result */}
        {submissionState === 'success' && submittedData && (
          <div className="p-4 border border-green-500 rounded-lg bg-green-100 text-green-700">
            <h3 className="text-lg font-semibold">Submission Successful!</h3>
            <p><strong>Title:</strong> {submittedData.title}</p>
            <p><strong>Content:</strong> {submittedData.content}</p>
          </div>
        )}

        {submissionState === 'error' && (
          <div className="p-4 border border-red-500 rounded-lg bg-red-100 text-red-700">
            <h3 className="text-lg font-semibold">Submission Failed!</h3>
            <p>Please try again later.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BlogSubmissionForm
