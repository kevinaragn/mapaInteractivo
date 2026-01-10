import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import LandingPage from "./components/LandingPage";
import VideoCard from "./components/VideoCard";
import SidebarNodes from "./components/SidebarNodes";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const nodes = [
  { key: "plazaMuñiz", name: "Plaza Muñiz", views: { center: { publicId: "nodoMuñiz_qh9x3n" }, left: { publicId: "" }, right: { publicId: "muñizDerecha_xnpvjb" } } },
  { key: "tillous", name: "Las Heras", views: { center: { publicId: "nodoTilous_xboare" }, left: { publicId: "" }, right: { publicId: "tillousIzquierda_lbwviu" } } },
  { key: "sargento", name: "Sargento Cabral", views: { center: { publicId: "sargentoCabralNodo_gzatvp" }, left: { publicId: "sargentoCabralIzquierda_zema7n" }, right: { publicId: "sargentoCabralDerecha_t04exr" } } },
  { key: "italia", name: "Italia", views: { center: { publicId: "0102_1_kbek2w" }, left: { publicId: "italiaIzquierda_dtm0ua" }, right: { publicId: "italiaDerechaa_kalxwf" } } },
  { key: "charlone", name: "Charlone", views: { center: { publicId: "CHARLONEE_t0e90w" }, left: { publicId: "rrrrrrrrrrrrr_ofkuv8" }, right: { publicId: "charloneDerechaaaa_wviczs" } } },
  { key: "belgrano", name: "Belgrano", views: { center: { publicId: "44444_sqsed9" }, left: { publicId: "BelgranoIzquierda_svnesb" }, right: { publicId: "BELGRANODERECHA_gkbugq" } } },
  { key: "PlazaSM", name: "Plaza San Miguel", views: { center: { publicId: "0110_dphpjq" }, left: { publicId: "plazaizquierdaa_kfxugf" }, right: { publicId: "plaza_derecha_vf9b8y" } } },
  { key: "mitre", name: "Mitre", views: { center: { publicId: "0110222_h6anl7" }, left: { publicId: "part2_ogiovn" }, right: { publicId: "66666_pquehv" } } }
];

export default function App() {
  const [started, setStarted] = useState(false);
  const [activeNode, setActiveNode] = useState(nodes[nodes.length - 1].key);
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

  const leftLabel = view === "center" && node.key === "charlone" ? "Mirar hacia atrás" : undefined;
  const rightLabel = view === "center" && node.key === "sargento" ? "Mirar hacia atrás" : undefined;

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
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/parallax1.jpg')" }} />
          <div className="absolute inset-0 bg-black/40" />

          <section className="relative h-full w-full grid grid-cols-1 md:grid-cols-[320px_1fr] gap-4 px-3 md:px-4 pt-4 md:pt-6">

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

            <div className="flex flex-col items-center w-full">

              {/* desktop titulo */}
              <div className="hidden md:flex relative mb-4 justify-center">
                <div className="absolute inset-0 rounded-2xl bg-black/20 backdrop-blur-3xl border border-white/10 shadow-2xl" />
                <h1 className="relative px-8 py-3 text-4xl font-serif text-white text-center">
                  {node.name}
                </h1>
              </div>

              <motion.div
                className="w-full flex justify-center relative"
                animate={{ opacity: isTransitioning ? 0.85 : 1, scale: isTransitioning ? 0.99 : 1 }}
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

              {/* === MOBILE CARTEL + SELECTOR (SMALLER) === */}
              <div className="block md:hidden mt-1 flex flex-row gap-2 w-full px-2 font-serif">

                {/* cartel */}
                <div className="flex flex-col justify-center basis-[55%] text-left">
                  <div
                    className="
                      px-4 py-1.5
                      mb-1
                      rounded-md
                      uppercase
                      text-[10px]
                      tracking-wide
                      text-white
                      border border-white/60
                      bg-black/75
                      shadow-[0_2px_1px_rgba(0,0,0,0.35)]
                      backdrop-blur-[0.4px]
                      text-center
                    "
                    style={{
                      maskImage: "radial-gradient(circle at center, black 70%, transparent 100%)",
                      WebkitMaskImage: "radial-gradient(circle at center, black 60%, transparent 100%)",
                      filter: "contrast(1.05) brightness(0.95) saturate(0)",
                    }}
                  >
                    Navegá por la avenida
                  </div>
                </div>

                {/* selector */}
                <div className="flex flex-col items-center gap-0.5 basis-[45%] leading-[1.05]">

                  {activeIndex > 0 && (
                    <button onClick={goUp} className="active:scale-95 transition" style={{ padding: 2 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </button>
                  )}

                  <div className="text-white/60 text-[10px] truncate max-w-[90px] text-center">
                    {activeIndex > 0 ? nodes[activeIndex - 1].name : "\u00A0"}
                  </div>

                  <motion.div
                    key={node.key}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-white font-bold text-[13px] truncate max-w-[100px]"
                    style={{ fontFamily: "Times New Roman" }}
                  >
                    {node.name}
                  </motion.div>

                  <div className="text-white/60 text-[10px] truncate max-w-[90px] text-center">
                    {activeIndex < nodes.length - 1 ? nodes[activeIndex + 1].name : "\u00A0"}
                  </div>

                  {activeIndex < nodes.length - 1 && (
                    <button onClick={goDown} className="active:scale-95 transition" style={{ padding: 2 }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
