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
  canGoDown
}) {
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}`;
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-11/12 h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900">

      {/* VIDEO */}
      <video
        src={videoUrl}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-contain bg-black"
      />

      {/* GRADIENTES */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black/50 to-transparent z-10" />

      {/* HINT */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="
              pointer-events-none
              absolute
              bottom-8
              left-1/2
              -translate-x-1/2
              z-30
              flex
              items-center
              gap-3
              px-6
              py-3
              rounded-full
              bg-black/50
              backdrop-blur-md
              border border-white/30
              text-white
              text-xs
              tracking-widest
              uppercase
            "
          >
            <ChevronLeft size={16} />
            <ChevronUp size={16} />
            <ChevronDown size={16} />
            <ChevronRight size={16} />
            <span className="opacity-80">explorá</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IZQUIERDA */}
      {canGoLeft && (
        <motion.button
          onClick={onLeft}
          animate={{ x: [-4, 4, -4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="
            group
            absolute
            left-6
            top-1/2
            -translate-y-1/2
            z-40
            w-16
            h-16
            flex
            flex-col
            items-center
            justify-center
            rounded-full
            bg-black/50
            backdrop-blur-md
            border border-white/30
            hover:bg-black/70
            hover:scale-110
            transition-all
          "
        >
          <ChevronLeft size={28} className="opacity-60 group-hover:opacity-100 transition" />
          <Eye size={16} className="mt-0.5 opacity-60 group-hover:opacity-100 transition" />
        </motion.button>
      )}

      {/* DERECHA */}
      {canGoRight && (
        <motion.button
          onClick={onRight}
          animate={{ x: [4, -4, 4] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="
            group
            absolute
            right-6
            top-1/2
            -translate-y-1/2
            z-40
            w-16
            h-16
            flex
            flex-col
            items-center
            justify-center
            rounded-full
            bg-black/50
            backdrop-blur-md
            border border-white/30
            hover:bg-black/70
            hover:scale-110
            transition-all
          "
        >
          <ChevronRight size={28} className="opacity-60 group-hover:opacity-100 transition" />
          <Eye size={16} className="mt-0.5 opacity-60 group-hover:opacity-100 transition" />
        </motion.button>
      )}

      {/* ARRIBA (sin ojo) */}
      {canGoUp && (
        <motion.button
          onClick={onUp}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="
            group
            absolute
            top-6
            left-1/2
            -translate-x-1/2
            z-40
            w-16
            h-16
            flex
            items-center
            justify-center
            rounded-full
            bg-black/50
            backdrop-blur-md
            border border-white/30
            hover:bg-black/70
            hover:scale-110
            transition-all
          "
        >
          <ChevronUp size={28} className="opacity-60 group-hover:opacity-100 transition" />
        </motion.button>
      )}

      {/* ABAJO (sin ojo) */}
      {canGoDown && (
        <motion.button
          onClick={onDown}
          animate={{ y: [4, -4, 4] }}
          transition={{ duration: 2.6, repeat: Infinity }}
          className="
            group
            absolute
            bottom-6
            left-1/2
            -translate-x-1/2
            z-40
            w-16
            h-16
            flex
            items-center
            justify-center
            rounded-full
            bg-black/50
            backdrop-blur-md
            border border-white/30
            hover:bg-black/70
            hover:scale-110
            transition-all
          "
        >
          <ChevronDown size={28} className="opacity-60 group-hover:opacity-100 transition" />
        </motion.button>
      )}
    </div>
  );
}
