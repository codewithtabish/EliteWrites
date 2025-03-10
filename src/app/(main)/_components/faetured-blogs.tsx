"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { blogPosts } from "@/utils/data";
import { motion } from "framer-motion";
import Image from "next/image";

const FeaturedBlogs = () => {
    const blogs = blogPosts;
    const [index, setIndex] = useState(0);
    const itemsPerPage = 3;
    const showLeftNav = index > 0;
    const showRightNav = index < blogs.length - itemsPerPage;

    const prevSlide = () => {
        if (index > 0) setIndex(index - 1);
    };

    const nextSlide = () => {
        if (index < blogs.length - itemsPerPage) setIndex(index + 1);
    };

    return (
        <div className="bg-[#020817] py-12 px-6 relative">
            <h2 className="text-white opacity-[.5] text-3xl font-bold mb-8 text-center">
                Featured Blogs
            </h2>
            <div className="flex items-center gap-4 justify-center">
                {/* Left Navigation Button */}
                {showLeftNav && (
                    <button
                        onClick={prevSlide}
                        className="hidden md:block text-gray-500 p-2 rounded-full cursor-pointer transition"
                    >
                        <ChevronLeft size={32} />
                    </button>
                )}

                {/* Blog Cards - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-x-auto scrollbar-hide w-full">
                    {blogs.slice(index, index + itemsPerPage).map((blog, i) => (
                        <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-gray-900 p-0 text-white border-none cursor-pointer shadow-md relative overflow-hidden rounded-lg">
                                <Image
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    width={200}
                                    height={200}
                                    className="w-full h-40 object-cover rounded-t-lg"
                                    priority
                                />
                                <span className="absolute top-2 right-2 text-white text-xs px-2 py-1 rounded">
                                    ${blog.earning.toFixed(2)}
                                </span>
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold">{blog.title}</h3>
                                    <p className="text-sm text-gray-400">{blog.category}</p>
                                    <p className="text-xs mt-2">
                                        {blog.content.length > 100
                                            ? blog.content.slice(0, 100) + "..."
                                            : blog.content}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Right Navigation Button */}
                {showRightNav && (
                    <button
                        onClick={nextSlide}
                        className="hidden md:block text-gray-500 p-2 rounded-full cursor-pointer transition"
                    >
                        <ChevronRight size={32} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FeaturedBlogs;
