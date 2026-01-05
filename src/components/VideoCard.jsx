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
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}`;
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-11/12 h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900">
      <video
        src={videoUrl}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-contain bg-black"
      />

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/30 text-xs tracking-widest uppercase"
          >
            explorá con las flechas
          </motion.div>
        )}
      </AnimatePresence>

      {canGoLeft && (
        <motion.button
          onClick={onLeft}
          animate={{ x: [-4, 4, -4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-16 h-16 flex flex-col items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/30"
        >
          <ChevronLeft size={28} />
          <Eye size={16} className="mt-0.5" />
          {leftLabel && (
            <span className="absolute -bottom-28 text-[15px] text-white/70 tracking-wide">
              {leftLabel}
            </span>
          )}
        </motion.button>
      )}

      {canGoRight && (
        <motion.button
          onClick={onRight}
          animate={{ x: [4, -4, 4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-16 h-16 flex flex-col items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/30"
        >
          <ChevronRight size={28} />
          <Eye size={16} className="mt-0.5" />
          {rightLabel && (
            <span className="absolute -bottom-20 text-[15px] text-white/70 tracking-wide">
              {rightLabel}
            </span>
          )}
        </motion.button>
      )}

      {canGoUp && isCenter && (
        <motion.button
          onClick={onUp}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-40 w-20 h-20 flex flex-col items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/30"
        >
          <ChevronUp size={28} />
          <span className="mt-1 text-xs tracking-widest">AVANZAR</span>
        </motion.button>
      )}

      {canGoDown && (
        <motion.button
          onClick={onDown}
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-16 h-16 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/30"
        >
          <ChevronDown size={28} />
        </motion.button>
      )}
    </div>
  );
}
