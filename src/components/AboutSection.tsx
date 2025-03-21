"use client"
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.section
      className="py-16 px-4 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-8"
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          About the Artist
        </motion.h2>
        <motion.p
          className="text-lg mb-4"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          I’m a passionate artist specializing in [your style]. My work is inspired by [your inspiration], and I love creating unique pieces that tell a story.
        </motion.p>
        <motion.p
          className="text-lg"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Let’s collaborate and bring your vision to life!
        </motion.p>
      </div>
    </motion.section>
  );
}