import { motion, AnimatePresence } from "framer-motion";
import { Eye, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export default function VideoCard({
  publicId,
  cloudName,
  autoPlay,
  muted,
  loop,
  onLeft,
  onRight,
  onUp,
  onDown,
  canGoLeft,
  canGoRight,
  canGoUp,
  canGoDown,
  isCenter,
  leftLabel,
  rightLabel
}) {
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto,so_0,eo_12/${publicId}.mp4`;

  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const calc = () => {
      if (!containerRef.current || !innerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = innerRef.current.scrollWidth;

      if (contentWidth > containerWidth) {
        setConstraints({ left: -(contentWidth - containerWidth), right: 0 });
      } else {
        setConstraints({ left: 0, right: 0 });
      }
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [publicId]);

  return (
    <div
      ref={containerRef}
      className="
        relative w-full
        h-[70vh] md:h-[80vh]
        rounded-xl md:rounded-3xl
        overflow-hidden shadow-2xl bg-neutral-900
        flex justify-center items-center
      "
    >
      {/* MOBILE horizontal drag */}
      <motion.div
        ref={innerRef}
        drag="x"
        dragMomentum={true}
        dragElastic={0.08}
        dragConstraints={constraints}
        dragTransition={{ power: 0.22, timeConstant: 260 }}
        className="relative w-full h-full block md:hidden"
        style={{ touchAction: "pan-y" }}
      >
        <video
          src={videoUrl}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          preload="metadata"
          className="h-full w-[200vw] max-w-none object-cover bg-black"
        />
      </motion.div>

      {/* DESKTOP */}
      <video
        src={videoUrl}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        className="
          hidden md:block
          absolute inset-0 w-full h-full
          object-contain bg-black
        "
      />

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="
              absolute bottom-5 left-1/2 -translate-x-1/2 z-30
              px-5 py-2 rounded-full bg-black/60 backdrop-blur-md
              text-[10px] md:text-xs uppercase tracking-wider
            "
          >
            Deslizá para mirar
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT */}
      {canGoLeft && (
        <motion.button
          onClick={onLeft}
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="
            absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-40
            w-10 h-10 md:w-16 md:h-16 flex flex-col items-center justify-center
            rounded-full bg-black/50 backdrop-blur-md border border-white/30
          "
        >
          <ChevronLeft size={20} />
          <Eye size={12} />
          {leftLabel && (
            <span className="absolute -bottom-12 text-[10px] text-white/70">
              {leftLabel}
            </span>
          )}
        </motion.button>
      )}

      {/* RIGHT */}
      {canGoRight && (
        <motion.button
          onClick={onRight}
          animate={{ x: [3, -3, 3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="
            absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-40
            w-10 h-10 md:w-16 md:h-16 flex flex-col items-center justify-center
            rounded-full bg-black/50 backdrop-blur-md border border-white/30
          "
        >
          <ChevronRight size={20} />
          <Eye size={12} />
          {rightLabel && (
            <span className="absolute -bottom-12 text-[10px] text-white/70">
              {rightLabel}
            </span>
          )}
        </motion.button>
      )}

      {/* UP (centrado en la card) */}
      {canGoUp && isCenter && (
        <motion.button
          onClick={onUp}
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="
            absolute z-40
            top-4 md:top-6
            left-1/1 -translate-x-1/2
            w-14 h-14 md:w-20 md:h-20
            flex flex-col items-center justify-center
            rounded-full bg-black/50 backdrop-blur-md border border-white/30
          "
        >
          <ChevronUp size={24} />
          <span className="text-[9px] md:text-xs tracking-widest mt-1">
            AVANZAR
          </span>
        </motion.button>
      )}

      {/* DOWN (centrado en la card) */}
      {canGoDown && (
        <motion.button
          onClick={onDown}
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="
            absolute z-40
            bottom-4 md:bottom-6
            left-1/1 -translate-x-1/2
            w-14 h-14 md:w-16 md:h-16
            flex items-center justify-center
            rounded-full bg-black/50 backdrop-blur-md border border-white/30
          "
        >
          <ChevronDown size={24} />
        </motion.button>
      )}
    </div>
  );
}
