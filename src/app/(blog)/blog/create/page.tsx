import React from 'react'
import BlogSubmissionForm from '../_components/blog-submission-form'
import { checkUserAndSaveInDB } from '@/utils/user'

const CreateBlogPage = async() => {
  const user=await checkUserAndSaveInDB()

  return (
    <div>

        <BlogSubmissionForm user={user}/>
      
    </div>
  )
}

export default CreateBlogPage
