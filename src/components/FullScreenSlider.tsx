import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Twitter, Facebook, Instagram, Github } from "lucide-react";

const socialIcons = [
  { Icon: Github, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Twitter, href: "#" },
  { Icon: Facebook, href: "#" },
];

const slides = [
  {
    id: 1,
    title: "Northern Lights",
    description: "Nature's celestial dance",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80",
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: 2,
    title: "Desert Dawn",
    description: "Embrace the golden hour",
    image:
      "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
    color: "from-orange-600 to-rose-600",
  },
  {
    id: 3,
    title: "Ocean Dreams",
    description: "Dive into the deep blue",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 4,
    title: "Misty Forest",
    description: "Lost in tranquility",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80",
    color: "from-emerald-600 to-teal-600",
  },
];

export default function FullScreenSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [wheelDirection, setWheelDirection] = useState<"up" | "down">("down");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsTransitioning(true);
        if (e.deltaY > 0) {
          setWheelDirection("down");
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        } else {
          setWheelDirection("up");
          setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        }
        setTimeout(() => setIsTransitioning(false), 800);
      }, 50);
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(timeout);
    };
  }, [isTransitioning]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Social Icons */}
      <div className="fixed left-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-8">
        {socialIcons.map(({ Icon, href }, index) => (
          <motion.a
            key={index}
            href={href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="text-white/80 hover:text-white hover:scale-110 transition-all duration-300"
          >
            <Icon size={24} />
          </motion.a>
        ))}
      </div>

      {/* Follow Me Text */}
      <div className="fixed left-8 bottom-12 z-50 transform -rotate-90 origin-left">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/80 text-lg tracking-widest font-light"
        >
          Follow Me
        </motion.span>
      </div>

      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={false}
            animate={{
              y: `${(index - currentSlide) * 100}%`,
              opacity: index === currentSlide ? 1 : 0.5,
            }}
            transition={{
              duration: 0.8,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-800"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slide.color} mix-blend-soft-light`}
              />
            </div>

            <div className="relative z-10 flex flex-col justify-end items-start h-full text-white p-16 pb-32">
              <motion.h1
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  y: index === currentSlide ? 0 : 20,
                }}
                transition={{ delay: 0.3 }}
                className="text-8xl font-bold mb-6 tracking-tight drop-shadow-lg"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  y: index === currentSlide ? 0 : 20,
                }}
                transition={{ delay: 0.4 }}
                className="text-2xl uppercase tracking-widest font-light drop-shadow-lg"
              >
                {slide.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
