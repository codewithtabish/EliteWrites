import React from 'react'
import OnBoardingForm from './_components/onboarding-form'
import { User } from '@prisma/client'
import { checkUserAndSaveInDB } from '@/utils/user'
import { redirect } from 'next/navigation'
import ShowToast from '@/components/general/show-toast'

const OnBoardingPage = async() => {
    const user:User|null=await checkUserAndSaveInDB()
    if(user?.email && user?.onBoardingScreen){
      <ShowToast text='your onboarding screen is completed'/>
      // toast.warning("please complete your onboarding screen")
      return redirect("/dashboard")
    }
  return (
    <div className='md:max-w-6xl mx-auto py-12 '>
        
        <OnBoardingForm/>
     
    </div>
  )
}

export default OnBoardingPage
