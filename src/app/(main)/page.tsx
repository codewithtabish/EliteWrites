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
import HeroVideoDialogDemoRightWithParallax from './_components/hero-video'
import Footer from './_components/footer'
import FeedbackList from './_components/testmonial-section'
import { Iphone15ProDemo } from './_components/main-mobile'
import CryptoTicker from './_components/crypto-tricker'
import TopEarningUsers from './_components/top-leader-board'
import { FAQSection } from './_components/faq-section'

const page = async() => {
  let feedbacks: Array<any>|null = [];
  const user:User|null=await checkUserAndSaveInDB()
  if(user?.email && !user?.onBoardingScreen){
    <ShowToast text='your onboarding screen is not completed'/>
    // toast.warning("please complete your onboarding screen")
    return redirect("/onboarding")
  }

  try {
    const response = await fetch(
      `https://www.codewithtabish.com/api/feedback`,
      {
        cache: 'force-cache',
      }
    );

    if (!response.status) {
      throw new Error('Failed to fetch Testimonials ');
    }

    const data = await response?.json();
    feedbacks = data?.testimonials;
  } catch (error) {
    feedbacks = null;
    console.error('Error fetching testimonials:', error);
  }

  if (!feedbacks) {
    return (
      <div>Error loading feedback information. Please try again later.</div>
    );
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
      <Suspense fallback={'featured blog loading ...'}>
      <FeaturedBlogs/>
      </Suspense>
      <Suspense fallback={'hero video loading ...'}>
        <HeroVideoDialogDemoRightWithParallax/>
      </Suspense>

      <FeedbackList feedbacks={
        feedbacks
      }  />

      <CryptoTicker/>

      <TopEarningUsers/>

      <FAQSection/>

      {/* <Iphone15ProDemo/> */}
      

      <Footer/>


    </div>
  )
}

export default page



