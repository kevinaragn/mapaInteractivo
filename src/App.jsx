import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ParallaxBackground from "./components/ParallaxBackground";
import LandingPage from "./components/LandingPage";
import VideoCard from "./components/VideoCard";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const videos = [
  {
    publicId: "BelgranoYPeron_ctxscn",
    title: "Belgrano y Perón",
    description: "Caminata Nocturna por el Boulevard"
  },
  {
    publicId: "iglesiaCostado_hts7bp",
    title: "Belgrano y Peron",
    description: "Mirando hacia la iglesia"
  },
  {
    publicId: "ciudad/video3",
    title: "Festival local",
    description: "Una pequeña muestra del evento cultural de este año."
  },
  {
    publicId: "ciudad/video1",
    title: "Atardecer en el centro",
    description: "La plaza principal con un hermoso atardecer."
  }
];

export default function App() {
  const [started, setStarted] = useState(false);

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
          transition={{ duration: 1 }}
          className="relative text-gray-100 overflow-hidden"
        >
          {/* BACKGROUND */}
          <ParallaxBackground />

          {/* DOCUMENTAL SCROLL */}
          {videos.map((video, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.section
                key={index}
                className={`min-h-[120vh] w-full flex items-center justify-center px-4`}
              >
                <div
                  className={`w-full max-w-6xl flex flex-col md:flex-row items-center gap-12 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  {/* VIDEO */}
                  <motion.div
                    className="md:w-3/5 w-full"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  >
                    <VideoCard
                      cloudName={CLOUD_NAME}
                      publicId={video.publicId}
                    />
                  </motion.div>

                  {/* TEXTO */}
                  <motion.div
                    className="md:w-2/5 w-full px-6 py-8 bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  >
                    <h2 className="text-4xl font-bold mb-4">
                      {video.title}
                    </h2>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      {video.description}
                    </p>
                  </motion.div>
                </div>
              </motion.section>
            );
          })}
        </motion.main>
      )}
    </AnimatePresence>
  );
}
