import ShowToast from '@/components/general/show-toast'
import { checkUserAndSaveInDB } from '@/utils/user'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { toast } from 'sonner'
import HeroSection from './_components/hero-section'
import FeaturedSection from '@/components/general/feathured-section'
import CallToAction from './_components/callto-action'
import NavBar from '@/components/general/Navbar'
import FeaturedBlogs from './_components/faetured-blogs'

const page = async() => {
  const user:User|null=await checkUserAndSaveInDB()
  if(user?.email && !user?.onBoardingScreen){
    <ShowToast text='your onboarding screen is not completed'/>
    // toast.warning("please complete your onboarding screen")
    return redirect("/onboarding")
  }
  
  return (
    <div>
      <Suspense fallback={'loading ....'}>
      <HeroSection user={user}/>

      </Suspense>
      <Suspense fallback={'featured loading ...'}>
      <FeaturedSection/>

      </Suspense>
      <Suspense fallback={'loading ...'}>
      <CallToAction/>

      </Suspense>
      <FeaturedBlogs/>


    </div>
  )
}

export default page
