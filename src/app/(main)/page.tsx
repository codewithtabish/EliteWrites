import ShowToast from '@/components/general/show-toast'
import { checkUserAndSaveInDB } from '@/utils/user'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const page = async() => {
  const user:User|null=await checkUserAndSaveInDB()
  if(user?.email && !user?.onBoardingScreen){
    <ShowToast text='your onboarding screen is not completed'/>
    // toast.warning("please complete your onboarding screen")
    return redirect("/onboarding")
  }
  
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores delectus autem, numquam cupiditate quas ab eaque expedita modi sit quaerat nisi voluptas quae, molestiae vero aliquam quod, obcaecati libero possimus?
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores delectus autem, numquam cupiditate quas ab eaque expedita modi sit quaerat nisi voluptas quae, molestiae vero aliquam quod, obcaecati libero possimus?
   <hr />


    </div>
  )
}

export default page
