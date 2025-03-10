// "use client";
// import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import Link from 'next/link';
// import { Suspense, useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import RightProfileMenu from './RightProfileMenu';
// import { User } from '@prisma/client';

// const navigation = [
//   { name: 'Dashboard', href: '/dashboard', current: true },
//   { name: 'Team', href: '/team', current: false },
//   { name: 'Projects', href: '/projects', current: false },
//   { name: 'Calendar', href: '/calendar', current: false },
// ];

// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

// export default function NavBar({user}:{user:User|null}) {
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.scrollY;
//       setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
//       setPrevScrollPos(currentScrollPos);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollPos]);

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.div
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -100, opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed top-0 left-0 w-full z-50 bg-black border-b border-gray-700 shadow-lg"
//         >
//           <Disclosure as="nav" className="border-b-[1px] border-gray-700">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//               <div className="relative flex h-16 items-center justify-between">
//                 {/* Mobile Menu Button */}
//                 <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                   <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white">
//                     <span className="sr-only">Open main menu</span>
//                     <Bars3Icon className="block size-6 group-data-open:hidden" />
//                     <XMarkIcon className="hidden size-6 group-data-open:block" />
//                   </DisclosureButton>
//                 </div>

//                 {/* Logo & Navigation */}
//                 <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                   <Link href="/" className="flex shrink-0 items-center">
//                     <img
//                       src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
//                       alt="EliteWrites Logo"
//                       className="h-8 w-auto"
//                     />
//                   </Link>
//                   <div className="hidden sm:ml-6 sm:block">
//                     <motion.div
//                       className="flex space-x-4"
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.2, duration: 0.5 }}
//                     >
//                       {navigation.map((item) => (
//                         <Link
//                           key={item.name}
//                           href={item.href}
//                           className={classNames(
//                             item.current ? 'text-gray-200' : 'text-gray-300',
//                             'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
//                           )}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                     </motion.div>
//                   </div>
//                 </div>

//                 {/* Right Side Buttons */}
//                 <Suspense fallback={<div>Loading...</div>}>
//                   {/* <RightProfileMenu  user={user}/> */}
//                 </Suspense>
//               </div>
//             </div>

//             {/* Mobile Menu Panel */}
//             <DisclosurePanel className="sm:hidden">
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="space-y-1 px-2 pt-2 pb-3"
//               >
//                 {navigation.map((item) => (
//                   <DisclosureButton
//                     key={item.name}
//                     as="a"
//                     href={item.href}
//                     className={classNames(
//                       item.current
//                         ? 'bg-gray-900 text-white'
//                         : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                       'block rounded-md px-3 py-2 text-base font-medium'
//                     )}
//                   >
//                     {item.name}
//                   </DisclosureButton>
//                 ))}
//               </motion.div>
//             </DisclosurePanel>
//           </Disclosure>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


import { User } from '@prisma/client'
import React, { Suspense } from 'react'
import RightProfileMenu from './RightProfileMenu'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = ({user}:{user:User|null}) => {
  return (
    <div>
      <div className='flex justify-between items-center mx-5 pt-3'>
             {/* Logo & Navigation */}
                 <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                   <Link href="/" className="flex shrink-0 items-center">
                     <Image
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                      alt="EliteWrites Logo"
                      className="h-8 object-fill w-auto"
                      width={20}
                      height={100}
                    />
                  </Link>
                  </div>

      <Suspense fallback='loading'>
        <RightProfileMenu user={user}/>
      </Suspense>
      </div>
      
    </div>
  )
}

export default Navbar
