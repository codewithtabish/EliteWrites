"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import RightProfileMenu from "@/components/general/RightProfileMenu";
import Link from "next/link";

const contentList = [
  {
    title: "Discover Amazing Stories & Insights!",
    subtitle: "Immerse yourself in captivating stories, gain knowledge, and explore diverse perspectives from writers worldwide.",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Unleash Your Creativity Through Words",
    subtitle: "Express yourself through blogs, share personal experiences, and make an impact on millions of readers.",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=800&auto=format&fit=crop&q=80",
  },
  {
    title: "Stay Updated with the Latest Trends",
    subtitle: "Dive into the latest insights on technology, lifestyle, business, and more to stay ahead of the curve.",
    image: "https://images.unsplash.com/photo-1592819695396-064b9572a660?w=800&auto=format&fit=crop&q=80",
  },
];

const HeroSection = ({ user }: { user: User | null }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % contentList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Navbar Positioned on Hero Section */}
      <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-12 md:px-20 lg:px-28 py-4 bg-black/40 backdrop-blur-md text-white z-20">
      <div className="flex flex-row gap-3.5 items-center">
      <Link href="/" className="flex shrink-0 items-center">
                     <Image
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                      alt="EliteWrites Logo"
                      className="h-8 object-fill w-auto"
                      width={20}
                      height={100}
                    />
                  </Link>

           <h3>
            ELIETE BLOGS
            </h3>       
      </div>
        {/* <h1 className="text-2xl font-bold">MyBlog</h1> */}
        <RightProfileMenu user={user} />
      </nav>

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1592819695396-064b9572a660?w=1800&auto=format&fit=crop&q=80"
          alt="Background"
          fill
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 md:px-20 lg:px-28">
        {/* Left Side - Animated Text */}
        <div className="max-w-2xl text-white space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl font-bold md:text-6xl leading-tight">
                {contentList[index].title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-300">
                {contentList[index].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
          {user ? (
            <Button className="bg cursor-pointer" variant={"outline"}>
              Read More
              <span className="ml-2 text-gray-400">→</span>
            </Button>
          ) : (
            <Button className="bg cursor-pointer" variant={"outline"}>
              Sign In
              <span className="ml-2 text-gray-400">→</span>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
