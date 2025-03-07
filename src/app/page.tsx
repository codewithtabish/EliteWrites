import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div className='bg-red-900 mx-auto py-12'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi distinctio fugiat? Pariatur quasi debitis a illum assumenda est quae. Excepturi hic consequatur ad nihil dignissimos odio veniam ipsum necessitatibus.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi distinctio fugiat? Pariatur quasi debitis a illum assumenda est quae. Excepturi hic consequatur ad nihil dignissimos odio veniam ipsum necessitatibus.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit animi distinctio fugiat? Pariatur quasi debitis a illum assumenda est quae. Excepturi hic consequatur ad nihil dignissimos odio veniam ipsum necessitatibus.
      <hr />
      <Link href={'/dashboard'}>
      Course
      </Link>
      <hr />
      <Link href={'/dashboard/java'}>
      JAVA
      </Link>
    </div>
  )
}

export default HomePage
