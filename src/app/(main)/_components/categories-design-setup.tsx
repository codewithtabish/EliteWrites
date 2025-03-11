"use client";
import React from "react";
import { motion } from "framer-motion";
import { categories } from "@/utils/category";

const CategoryDesignSetup = () => {
  return (
    <div className="md:py-10 py-6 md:my-10 my-5">
        <h2 className="text-white opacity-[.5] py-4 text-center mb-8 text-3xl font-bold">Blog Categories</h2>
    <div className="bg-[#020817]  flex justify-center items-center p-6">
      <div className="w-full max-w-4xl overflow-x-scroll scrollbar-thin scrollbar-track-[#020817] scrollbar-thumb-gray-600">
        <motion.div
          className="flex space-x-4 whitespace-nowrap"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="px-8 py-2  flex mb-3 items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 transition-all rounded-2xl cursor-pointer shadow-lg"
            >
              {category.icon}
              <span className="text-white font-medium text-sm text-center">
                {category.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default CategoryDesignSetup;
