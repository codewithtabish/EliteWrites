import Storage from '@/components/general/Storage'
import React from 'react'

type Params=Promise<{course:string}>

const SingleCourse = async({params}:{params:Params}) => {
    const {course} = await params
 
    
  return (
    <div>
        The single course is available {course}
      <Storage/>
    </div>
  )
}

export default SingleCourse
801293