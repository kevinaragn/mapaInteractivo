import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-full md:w-11/12 h-[70vh] md:h-[85vh] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-neutral-900">
      <video
        src={videoUrl}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-contain bg-black"
      />

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] md:text-xs tracking-widest uppercase"
          >
            deslizá con flechas
          </motion.div>
        )}
      </AnimatePresence>

      {/* IZQUIERDA */}
      {canGoLeft && (
        <motion.button
          onClick={onLeft}
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/30"
        >
          <ChevronLeft size={22} />
          <Eye size={14} />
          {leftLabel && (
            <span className="absolute -bottom-16 text-xs text-white/70">
              {leftLabel}
            </span>
          )}
        </motion.button>
      )}

      {/* DERECHA */}
      {canGoRight && (
        <motion.button
          onClick={onRight}
          animate={{ x: [3, -3, 3] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/30"
        >
          <ChevronRight size={22} />
          <Eye size={14} />
          {rightLabel && (
            <span className="absolute -bottom-16 text-xs text-white/70">
              {rightLabel}
            </span>
          )}
        </motion.button>
      )}

      {/* ARRIBA */}
      {canGoUp && isCenter && (
        <motion.button
          onClick={onUp}
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="absolute top-3 md:top-6 left-1/2 -translate-x-1/2 z-40 w-14 h-14 md:w-20 md:h-20 flex flex-col items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/30"
        >
          <ChevronUp size={22} />
          <span className="text-[10px] md:text-xs tracking-widest">AVANZAR</span>
        </motion.button>
      )}

      {/* ABAJO */}
      {canGoDown && (
        <motion.button
          onClick={onDown}
          animate={{ y: [3, -3, 3] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/30"
        >
          <ChevronDown size={22} />
        </motion.button>
      )}
    </div>
  );
}
