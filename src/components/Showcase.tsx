"use client";

import { useRef, useEffect ,useState} from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import picture1 from "@/assets/img/picture_1.png"
import picture2 from "@/assets/img/picture_2.jpeg"
import picture3 from "@/assets/img/picture_3.png"
import picture4 from "@/assets/img/picture_4.png"
import picture5 from '@/assets/img/picture_5.jpg'
const artwork = [
  {
    id: 1,
    image:picture1,
    title: "Artwork 1",
    description: "Brand Design",
  },
  {
    id: 2,
    image: picture2,
    title: "Artwork 2",
    description: "A stunning creation.",
  },
  {
    id: 3,
    image: picture3,
    title: "Artwork 3",
    description: "Inspired by nature.",
  },
  {
    id: 4,
    image: picture4,
    title: "Artwork 4",
    description: "Abstract and modern.",
  },
  {
    id: 5,
    image: picture5,
    title: "Artwork 5",
    description: "A masterpiece.",
  },
];

export default function ArtworkShowcase() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Duplicate artwork items for seamless looping
  const duplicatedArtwork = [...artwork, ...artwork];

  // Center the gallery on load
  useEffect(() => {
    if (galleryRef.current) {
      const galleryWidth = galleryRef.current.scrollWidth;
      const containerWidth = galleryRef.current.clientWidth;
      galleryRef.current.scrollLeft = (galleryWidth - containerWidth) / 2;
    }
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!galleryRef.current || !isAutoScrolling) return;

    const interval = setInterval(() => {
      if (galleryRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll) {
          // If at the end, instantly scroll back to the start without animation
          galleryRef.current.scrollTo({ left: 0, behavior: "instant" });
        } else {
          // Scroll to the next item
          galleryRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
      }
    }, 1500); // Scroll every 1.5 seconds (adjust as needed)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isAutoScrolling]);

  const scrollLeft = () => {
    if (galleryRef.current) {
      setIsAutoScrolling(false); // Pause auto-scroll on manual interaction
      galleryRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (galleryRef.current) {
      setIsAutoScrolling(false); // Pause auto-scroll on manual interaction
      galleryRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Scroll Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 z-10 bg-white/10 hover:bg-white/20"
        onClick={scrollLeft}
      >
        <ArrowLeft className="h-6 w-6 text-white" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 z-10 bg-white/10 hover:bg-white/20"
        onClick={scrollRight}
      >
        <ArrowRight className="h-6 w-6 text-white" />
      </Button>

      {/* Play/Pause Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute bottom-4 z-10 bg-white/10 hover:bg-white/20"
        onClick={() => setIsAutoScrolling(!isAutoScrolling)}
      >
        {isAutoScrolling ? (
          <Pause className="h-6 w-6 text-white" />
        ) : (
          <Play className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Gallery */}
      <div
        ref={galleryRef}
        className="flex gap-8 md:gap-12 overflow-x-scroll scrollbar-hide snap-x snap-mandatory"
      >
        {duplicatedArtwork.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`} // Unique key for duplicated items
            className="flex-shrink-0 w-96 h-[28rem] bg-gray-800 rounded-lg overflow-hidden relative group snap-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={600}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-sm text-gray-300">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}