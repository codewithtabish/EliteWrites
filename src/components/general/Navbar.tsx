
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '../ui/button';
import RightProfileMenu from './RightProfileMenu';
import { Suspense } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Team', href: '/team', current: false },
  { name: 'Projects', href: '/projects', current: false },
  { name: 'Calendar', href: '/calendar', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default  function  NavBar() {

    


  return (
    <Disclosure as="nav" className="border-b-[1px] border-gray-700 border- mb-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Logo & Navigation */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link href="/" className="flex shrink-0 items-center">
              <img
            //   src=
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="EliteWrites Logo"
                className="h-8 w-auto"
              />
            </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'text-gray-200' : 'text-gray-300',
                      'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side Buttons */}
          <Suspense fallback={<div>Loading...</div>}>
          <RightProfileMenu/>

          </Suspense>
        
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

// 'use server'
// import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
// import React from 'react'

// const Navbar = async() => {
//     // Fetch the session from the server
//     // const user=await getUser()
    
// const {getUser} = getKindeServerSession();
// const user = await getUser();
// console.log(user)
//   return (
//     <div>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dolor unde inventore officiis facilis quo optio, nemo sit error numquam voluptate placeat amet explicabo illum qui vitae, esse, totam ea.
//         {
//             user? (
//               <div>Logged in as {user?.email}</div>
//             ) : (
//                <LoginLink postLoginRedirectURL="/onboarding">
//                  Login with Kinde Auth
  
//                </LoginLink>
//             )
//         }
//         {
//             user&&
//             <LogoutLink className="mx-10">
//                 Logout
//             </LogoutLink>
//         }

      
//     </div>
//   )
// }

// export default Navbar
