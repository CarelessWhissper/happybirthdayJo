"use client";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jane Doe",
    comment: "Absolutely stunning work! The artist captured my vision perfectly.",
  },
  {
    name: "John Smith",
    comment: "Highly recommend! The process was smooth, and the result was amazing.",
  },
  {
    name: "Emily Johnson",
    comment: "Incredible talent and professionalism. Will commission again!",
  },
];

export function TestimonialsSection() {
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
          What Clients Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-800 rounded-lg"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.5, duration: 1 }}
            >
              <p className="text-gray-300 italic">&quot;{testimonial.comment}&quot;</p>
              <p className="mt-4 font-bold">- {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}