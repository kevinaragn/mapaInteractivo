import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ParallaxBackground from "./components/ParallaxBackground";
import LandingPage from "./components/LandingPage";
import VideoCard from "./components/VideoCard";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/* =========================
   NODO: BELGRANO Y PERÓN
========================= */

const nodeBelgranoPeron = {
  name: "Belgrano y Perón",

  center: { publicId: "BelgranoYPeron_ctxscn" },
  left: { publicId: "BelgranoIzquierda_svnesb" },
  right: { publicId: "BelgranoDerecha_y8faoa" }
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [view, setView] = useState("center");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const current = nodeBelgranoPeron[view];

  const transitionTo = (nextView) => {
    if (nextView === view) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setView(nextView);
      setTimeout(() => setIsTransitioning(false), 200);
    }, 250);
  };

  const goLeft = () => {
    if (view === "right") transitionTo("center");
    else if (view === "center") transitionTo("left");
  };

  const goRight = () => {
    if (view === "left") transitionTo("center");
    else if (view === "center") transitionTo("right");
  };

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <LandingPage key="landing" onStart={() => setStarted(true)} />
      ) : (
        <motion.main
          key="gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="relative text-gray-100 overflow-hidden"
        >
          <ParallaxBackground />

          <section className="min-h-[140vh] w-full flex flex-col items-center px-4 pt-8">
            
            {/* TÍTULO DEL NODO */}
            <h1 className="
              mb-6
              text-center
              text-3xl md:text-4xl
              font-serif
              tracking-wide
              text-white
              drop-shadow-xl
            ">
              {nodeBelgranoPeron.name}
            </h1>

            {/* VIDEO */}
            <motion.div
              className="w-full max-w-7xl mt-2"
              animate={{
                opacity: isTransitioning ? 0.85 : 1,
                scale: isTransitioning ? 0.99 : 1
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <VideoCard
                    cloudName={CLOUD_NAME}
                    publicId={current.publicId}
                    autoPlay
                    muted
                    loop
                    onLeft={goLeft}
                    onRight={goRight}
                     canGoLeft={view !== "left"}
                      canGoRight={view !== "right"}
                  />

            </motion.div>

          </section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
