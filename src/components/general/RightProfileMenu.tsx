'use client'
import { User } from "@prisma/client";
import React from "react";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotebookIcon, NotebookPen } from "lucide-react";
import Link from "next/link";

const RightProfileMenu =  ({user}:{user:User|null}) => {
  // const user: User | null = await checkUserAndSaveInDB();

  return (
    <div className="flex flex-row items-center gap-2.5">
        <div className="mr-5 cursor-pointer">

      {
          user&&
          <NotebookIcon/>
        }  
        </div>
      {user ? (
        <DropdownMenu >
          <DropdownMenuTrigger className="flex items-center rounded-full  text-sm focus:outline-none">
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.profilePic || " "} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-[#020817]">
            <Link href={'/blog/create'}>

            <DropdownMenuItem className="text-gray-400 hover:text-white hover:bg-transparent focus:bg-transparent transition-all duration-300 ease-in-out cursor-pointer">
              create Blog
            </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="text-gray-400 hover:text-white hover:bg-transparent focus:bg-transparent transition-all duration-300 ease-in-out cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-400 hover:text-white hover:bg-transparent focus:bg-transparent transition-all duration-300 ease-in-out cursor-pointer">
              <LogoutLink className="w-full text-left hover:text-white transition-all duration-300 ease-in-out">
                Logout
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginLink postLoginRedirectURL="/onboarding">Login</LoginLink>
      )}
    </div>
  );
};

export default RightProfileMenu;
