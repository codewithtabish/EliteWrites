'use client'
import {  LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { BellIcon } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

const RightProfileMenu = () => {
    const { getUser,isAuthenticated } = useKindeBrowserClient();
    const user =  getUser();
    if(!isAuthenticated){
        return
    }
  return (

<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {
            user&&  <button className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white">
            <span className="sr-only">View notifications</span>
            <BellIcon className="size-6" />
          </button>
          }

            {!user &&
              <Button variant="outline" className="mx-5">
                <LoginLink postLoginRedirectURL="/onboarding">Login</LoginLink>
              </Button>
            
           
            }
            {
                user
                &&
                <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white">
                    <img
                      className="size-8 rounded-full"
                    //   src={user?.picture||""}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="User Profile"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Your Profile
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        Settings
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    <Button variant="outline">
                      <LogoutLink>Logout</LogoutLink>
                    </Button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            }
          </div>
      
  )
}

export default RightProfileMenu
