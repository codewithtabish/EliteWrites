"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { RocketIcon } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative bg-[#020817] text-white py-16 px-6 sm:px-12 lg:px-24 flex justify-center items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-3xl space-y-6"
      >
        {/* Heading */}
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Ready to Elevate Your Experience?
        </h2>

        {/* Subheading */}
        <p className="text-lg text-gray-400">
          Take the next step and unlock powerful features today. Join us and
          make a difference with cutting-edge technology.
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <Button className="text-lg px-6 py-3 rounded-2xl flex items-center gap-2 hover:text-white transition cursor-pointer"
          variant={'outline'}>
            <RocketIcon className="size-5" />
            Get Started
          </Button>
          <Button
            variant="outline"
            className="text-lg px-6 py-3 rounded-2xl border-gray-500 cursor-pointer hover:text-white text-gray-300 hover:border-white transition"
          >
            Learn More
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
