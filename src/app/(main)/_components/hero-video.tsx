"use client";

import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { motion } from "framer-motion";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

export default function HeroVideoDialogDemoRightWithParallax() {
  return (
    <ParallaxProvider>

    <div className="relative container mx-auto md:max-w-3xl md:py-18 py-12 md:my-16 my-10 px-4 overflow-hidden">
      <Parallax speed={-10}>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
            thumbnailAlt="Hero Video"
          />
        </motion.div>
      </Parallax>

      <Parallax speed={-10}>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="top-in-bottom-out"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
            thumbnailAlt="Hero Video"
          />
        </motion.div>
      </Parallax>
    </div>
    </ParallaxProvider>
  );
}
