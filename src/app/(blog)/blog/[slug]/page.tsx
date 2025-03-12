import { fetchSingleBlog } from '@/actions/blog'
import { SingleApiResponse } from '@/utils/api-response'
import Image from 'next/image'
import React from 'react'
import SingleBlogContent from './_components/single-blog-content'


type Parsm=Promise<{params:{slug:string}}>
const SingleBlogPage = async({params}:{params:{slug:string}}) => {
    const slug=params?.slug
    const response:SingleApiResponse=await fetchSingleBlog(slug)
    if(!response?.success){

        return <p>Error ...</p>

    }



  return (
    <div className=''>

        <div className='md:max-w-6xl mx-auto md:py-16 py-12 px-4 flex justify-center flex-col items-center'>

        <Image src={response?.data?.imageUrl?? "/blog/blog-one.jpg"} alt={response?.data?.title??""} width={1000} height={500}
        />
        <div className='mt-8 px-4'>
        <h1 className='text-4xl md:max-w-[80%] mx-auto opacity-[.4] font-bold text-center'>{response?.data?.title?? ""}</h1>
        <SingleBlogContent content={response?.data?.content?? ""}/>

        </div>
        </div>

      

      
    </div>
  )
}

export default SingleBlogPage
