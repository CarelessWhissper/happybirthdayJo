// components/Section.tsx
"use client";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
const Section = () => { // No named export
  return (
    <motion.section
      className="h-screen flex flex-col items-center justify-center bg-black text-white text-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="text-6xl md:text-8xl font-bold mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Welcome to My Art World
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Explore my creations and request a custom commission.
      </motion.p>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Button size="lg" className="bg-white text-black hover:bg-gray-200">
          Request a Commission
        </Button>
      </motion.div>
    </motion.section>
  );
};

export default Section; // Default export