import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LandingPage from "./components/LandingPage";
import VideoCard from "./components/VideoCard";
import SidebarNodes from "./components/SidebarNodes";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/* --- NODES (orden original restaurado) --- */
const nodes = [
  { key: "plazaMuñiz", name: "Plaza Muñiz", views: {
      center: { publicId: "nodoMuñiz_qh9x3n" },
      left: { publicId: "" },
      right: { publicId: "muñizDerecha_xnpvjb" }
    }
  },
  { key: "tillous", name: "Casa Tillous", views: {
      center: { publicId: "nodoTilous_xboare" },
      left: { publicId: "" },
      right: { publicId: "tillousIzquierda_lbwviu" }
    }
  },
  { key: "sargento", name: "Sargento Cabral", views: {
      center: { publicId: "sargentoCabralNodo_gzatvp" },
      left: { publicId: "sargentoCabralIzquierda_zema7n" },
      right: { publicId: "sargentoCabralDerecha_t04exr" }
    }
  },
  { key: "italia", name: "Italia", views: {
      center: { publicId: "0102_1_kbek2w" },
      left: { publicId: "italiaIzquierda_dtm0ua" },
      right: { publicId: "italiaDerechaa_kalxwf" }
    }
  },
  { key: "charlone", name: "Charlone", views: {
      center: { publicId: "nodoCharlonne_poa2op" },
      left: { publicId: "rrrrrrrrrrrrr_ofkuv8" },
      right: { publicId: "charloneDerechaaaa_wviczs" }
    }
  },
  { key: "belgrano", name: "Belgrano", views: {
      center: { publicId: "belgrano_nodo_xewko8" },
      left: { publicId: "BelgranoIzquierda_svnesb" },
      right: { publicId: "belgranoDerechaa_ucgekq" }
    }
  },
  { key: "PlazaSM", name: "Plaza San Miguel", views: {
      center: { publicId: "nodoPlazaa_hkgv3v" },
      left: { publicId: "plazaizquierdaa_kfxugf" },
      right: { publicId: "plaza_derecha_vf9b8y" }
    }
  },
  { key: "mitre", name: "Mitre", views: {
      center: { publicId: "nodoMitreee_cvxmy4" },
      left: { publicId: "izquierdaMitre_zvv6dw" },
      right: { publicId: "derechaMitre_uitqye" }
    }
  }
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeNode, setActiveNode] = useState(nodes[nodes.length - 1].key); // Mitre inicia
  const [view, setView] = useState("center");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeIndex = nodes.findIndex((n) => n.key === activeNode);
  const node = nodes[activeIndex];
  const current = node.views[view];

  const hasLeft = !!node.views.left?.publicId;
  const hasRight = !!node.views.right?.publicId;

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
    else if (view === "center" && hasLeft) transitionTo("left");
  };

  const goRight = () => {
    if (view === "left") transitionTo("center");
    else if (view === "center" && hasRight) transitionTo("right");
  };

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

  const leftLabel =
    view === "center" && node.key === "charlone"
      ? "Mirar hacia atrás"
      : undefined;

  const rightLabel =
    view === "center" && node.key === "sargento"
      ? "Mirar hacia atrás"
      : undefined;

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <LandingPage onStart={() => setStarted(true)} />
      ) : (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="relative h-screen overflow-hidden text-gray-100"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/parallax1.jpg')" }}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* DESKTOP GRID */}
          <section className="relative h-full w-full grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 px-3 md:px-4 pt-4 md:pt-6">
            
            {/* SIDEBAR DESKTOP */}
            <div className="hidden md:block">
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
            </div>

            {/* CONTENIDO */}
            <div className="flex flex-col items-center w-full">
              
              {/* TITULO NODO — SOLO DESKTOP */}
              <div className="hidden md:flex relative mb-3 md:mb-4 justify-center">
                <div className="absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-3xl border border-white/10 shadow-2xl" />
                <h1 className="relative px-6 md:px-8 py-2 md:py-3 text-xl md:text-4xl font-serif text-white text-center">
                  {node.name}
                </h1>
              </div>

              {/* VIDEO */}
              <motion.div
                className="w-full flex justify-center relative"
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
                  canGoLeft={view !== "left" && (view === "right" || hasLeft)}
                  canGoRight={view !== "right" && (view === "left" || hasRight)}
                  canGoUp={canGoUp && view === "center"}
                  canGoDown={canGoDown}
                  isCenter={view === "center"}
                  leftLabel={leftLabel}
                  rightLabel={rightLabel}
                />
              </motion.div>

              {/* MOBILE — INDICADOR DE NODOS CON ESPACIO FIJO */}
              <div className="block md:hidden mt-4 flex flex-col items-center gap-2 text-center text-white">
                
                {/* Flecha arriba centrada */}
                <button
                  onClick={goUp}
                  disabled={!canGoUp}
                  className="text-white/80 text-4xl leading-none select-none mx-auto"
                >
                  <span style={{ fontFamily: "sans-serif" }}>⌃</span>
                </button>

                {/* Nodo anterior / placeholder */}
                <div className="text-white/50 text-sm tracking-wide">
                  {activeIndex > 0 ? nodes[activeIndex - 1].name : "\u00A0"}
                </div>

                {/* Nodo actual */}
                <motion.div
                  key={node.key}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="text-white font-semibold text-lg tracking-wide"
                >
                  {node.name}
                </motion.div>

                {/* Nodo siguiente / placeholder */}
                <div className="text-white/50 text-sm tracking-wide">
                  {activeIndex < nodes.length - 1 ? nodes[activeIndex + 1].name : "\u00A0"}
                </div>

                {/* Flecha abajo centrada */}
                <button
                  onClick={goDown}
                  disabled={!canGoDown}
                  className="text-white/80 text-4xl leading-none select-none mx-auto"
                >
                  <span style={{ fontFamily: "sans-serif" }}>⌄</span>
                </button>
              </div>
            </div>
          </section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
