"use client";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Step 1: Share Your Idea",
    description: "Tell me about your vision and ideas for the artwork.",
  },
  {
    title: "Step 2: Get a Quote",
    description: "I’ll provide a quote based on your requirements.",
  },
  {
    title: "Step 3: Approve & Pay",
    description: "Once approved, make a payment to start the process.",
  },
  {
    title: "Step 4: Receive Your Art",
    description: "I’ll create and deliver your custom artwork.",
  },
];

export  default function CommissionProcess() {
  return (
    <motion.section
      className="py-16 px-4 bg-black text-white"
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
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800 rounded-lg"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.5, duration: 1 }}
            >
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}