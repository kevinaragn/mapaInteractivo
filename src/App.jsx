import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LandingPage from "./components/LandingPage";
import VideoCard from "./components/VideoCard";
import SidebarNodes from "./components/SidebarNodes";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const nodes = [
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "belgrano-peron",
    name: "Belgrano y Perón",
    views: {
      center: { publicId: "BelgranoYPeron_ctxscn" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "BelgranoDerecha_y8faoa" }
    }
},
  {
    key: "gallardo-mitre",
    name: "L.Gallardo y Mitre",
    views: {
      center: { publicId: "nodo_zmsqb1" },
      left: { publicId: "mitreIzquierda_n3cxe9" },
      right: { publicId: "derechaMitre_lzrgq9" }
    }
},

];

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeNode, setActiveNode] = useState(nodes[0].key);
  const [view, setView] = useState("center");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeIndex = nodes.findIndex(n => n.key === activeNode);
  const node = nodes[activeIndex];
  const current = node.views[view];

  /* ---------- vistas laterales ---------- */
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

  /* ---------- navegación vertical ---------- */
  const canGoUp = activeIndex > 0;
  const canGoDown = activeIndex < nodes.length - 1;

  const goUp = () => {
    if (!canGoUp) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveNode(nodes[activeIndex - 1].key);
      setView("center");
      setTimeout(() => setIsTransitioning(false), 300);
    }, 200);
  };

  const goDown = () => {
    if (!canGoDown) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveNode(nodes[activeIndex + 1].key);
      setView("center");
      setTimeout(() => setIsTransitioning(false), 300);
    }, 200);
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
          className="relative h-screen overflow-hidden text-gray-100"
        >
          {/* BACKGROUND */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/parallax1.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* LAYOUT PRINCIPAL */}
          <section
            className="
              relative
              h-full
              w-full
              grid
              grid-cols-[320px_1fr]
              gap-4
              px-4
              pt-6
            "
          >
            {/* SIDEBAR */}
            <SidebarNodes
              nodes={nodes}
              activeNode={activeNode}
              onSelect={(key) => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setActiveNode(key);
                  setView("center");
                  setTimeout(() => setIsTransitioning(false), 300);
                }, 200);
              }}
            />

            {/* CONTENIDO */}
            <div className="flex flex-col items-center w-full">
              {/* TÍTULO */}
              <div className="relative mb-4 flex justify-center">
                <div className="absolute inset-0 rounded-2xl bg-black/10 backdrop-blur-3xl border border-white/10 shadow-2xl" />
                <h1 className="relative px-8 py-3 text-3xl md:text-4xl font-serif text-white text-center">
                  {node.name}
                </h1>
              </div>

              {/* VIDEO */}
              <motion.div
                className="w-full flex justify-center"
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
                  onUp={goUp}
                  onDown={goDown}
                  canGoLeft={view !== "left"}
                  canGoRight={view !== "right"}
                  canGoUp={canGoUp}
                  canGoDown={canGoDown}
                />
              </motion.div>
            </div>
          </section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
