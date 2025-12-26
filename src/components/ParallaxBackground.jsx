import { useEffect, useState } from "react";
import { motion, useViewportScroll } from "framer-motion";

export default function ParallaxBackground() {
  const images = [
    "/parallax1.jpg",
    "/parallax2.jpg",
    "/parallax3.jpg",
    "/parallax4.jpg"
  ];

  // DURACIÓN DE CADA IMAGEN EN PANTALLAS
  const DURATION = 3; // cambialo a 2, 3, 4, lo que quieras

  const { scrollY } = useViewportScroll();
  const [scrollPos, setScrollPos] = useState(0);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return scrollY.on("change", (y) => setScrollPos(y));
  }, [scrollY]);

  return (
    <div className="fixed inset-0 -z-10">
      {images.map((src, index) => {
        const start = windowHeight * DURATION * index;
        const end = windowHeight * DURATION * (index + 1);
        let opacity = 0;

        const fadeRange = windowHeight * DURATION;

        // fade in
        if (scrollPos >= start - fadeRange && scrollPos < start) {
          opacity = (scrollPos - (start - fadeRange)) / fadeRange;
        }
        // visible area
        else if (scrollPos >= start && scrollPos <= end) {
          opacity = 1 - (scrollPos - start) / fadeRange;
        }

        return (
          <motion.img
            key={index}
            src={src}
            style={{ opacity }}
            className="absolute top-0 left-0 w-screen h-screen object-cover"
          />
        );
      })}
    </div>
  );
}
