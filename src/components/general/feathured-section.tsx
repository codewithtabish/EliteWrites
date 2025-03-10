"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Rocket, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Rocket className="text-indigo-400 size-10" />,
    title: "Blazing Fast Performance",
    description: "Optimized for speed with efficient rendering and caching.",
  },
  {
    icon: <CheckCircle className="text-green-400 size-10" />,
    title: "Seamless User Experience",
    description: "Designed with intuitive UI and smooth interactions, making it easy for everyone.",
  },
  {
    icon: <ShieldCheck className="text-yellow-400 size-10" />,
    title: "Robust Security",
    description: "Built with best security practices to keep your data safe at all times.",
  },
  {
    icon: <Star className="text-pink-400 size-10" />,
    title: "Premium Features",
    description: "Get access to high-end tools and functionalities that elevate your experience.",
  },
];

export default function FeaturedSection() {
  return (
    <section className="bg-[#020817] py-20">
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* Title & Description */}
        <motion.h2
          className="text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experience top-tier performance, security, and user experience with our cutting-edge platform.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <Card className="bg-[#0B1224] border cursor-pointer border-gray-700 shadow-lg rounded-2xl hover:scale-105 transition-transform flex flex-col min-h-[250px]">
              <CardHeader className="flex flex-col items-center gap-4 flex-grow">
                {feature.icon}
                <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-400 text-sm text-center">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
