"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <motion.section
      className="py-16 px-4 bg-black text-white text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="text-4xl font-bold mb-8"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Ready to Create Something Unique?
      </motion.h2>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button size="lg" className="bg-white text-black hover:bg-gray-200">
          Request a Commission
        </Button>
      </motion.div>
    </motion.section>
  );
}