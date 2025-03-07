'use client'

import React from 'react'

const Storage = () => {
    let storedCourse=null
    const storeData=()=>{
        localStorage.setItem('course','JAVA')
    }
    storeData()
    if(localStorage.getItem('course')==='JAVA'){
        storedCourse=localStorage.getItem('course')
    }
        // storedCourse=course
  return (
    <div>
      the stored data is 
      {storedCourse}
    </div>
  )
}

export default Storage
