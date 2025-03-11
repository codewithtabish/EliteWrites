import { fetchFeaturedBlogs } from '@/actions/blog'
import FeaturedSection from '@/components/general/feathured-section'
import { BlogApiResponse } from '@/utils/api-response'
import React from 'react'
import FeaturedBlogs from './faetured-blogs'

const FeaturedBlogServer = async() => {
    const response:BlogApiResponse=await fetchFeaturedBlogs()
    // const data=await response.json()

  return (
    <div>
      {/* {JSON.stringify(response?.data)} */}
       <FeaturedBlogs response={response}/>
    </div>
  )
}

export default FeaturedBlogServer
