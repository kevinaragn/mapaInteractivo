export default function VideoCard({
  publicId,
  cloudName,
  autoPlay,
  muted,
  loop,
  onLeft,
  onRight,
  canGoLeft,
  canGoRight
}) {
  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}`;

  return (
    <div className="relative w-full h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-neutral-900">

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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24
                      bg-gradient-to-r from-black/40 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24
                      bg-gradient-to-l from-black/40 to-transparent z-10" />

      {/* FLECHA IZQUIERDA */}
      {canGoLeft && (
        <button
          onClick={onLeft}
          aria-label="Mirar hacia la izquierda"
          className="group absolute left-6 top-1/2 -translate-y-1/2 z-40
                     w-14 h-14 rounded-full bg-white/10 backdrop-blur-md
                     border border-white/20 flex items-center justify-center
                     text-white text-3xl hover:bg-white/20 hover:scale-110
                     transition-all duration-300"
        >
          ‹
          <span
            className="pointer-events-none absolute left-1/2 -translate-x-1/2
                       bottom-full mb-3
                       opacity-0 group-hover:opacity-100
                       text-xs tracking-wide text-white
                       bg-black/60 backdrop-blur-md
                       px-3 py-1 rounded-full
                       transition-opacity duration-300"
          >
            Cambiar perspectiva
          </span>
        </button>
      )}

      {/* FLECHA DERECHA */}
      {canGoRight && (
        <button
          onClick={onRight}
          aria-label="Mirar hacia la derecha"
          className="group absolute right-6 top-1/2 -translate-y-1/2 z-40
                     w-14 h-14 rounded-full bg-white/10 backdrop-blur-md
                     border border-white/20 flex items-center justify-center
                     text-white text-3xl hover:bg-white/20 hover:scale-110
                     transition-all duration-300"
        >
          ›
          <span
            className="pointer-events-none absolute left-1/2 -translate-x-1/2
                       bottom-full mb-3
                       opacity-0 group-hover:opacity-100
                       text-xs tracking-wide text-white
                       bg-black/60 backdrop-blur-md
                       px-3 py-1 rounded-full
                       transition-opacity duration-300"
          >
            Cambiar perspectiva
          </span>
        </button>
      )}
    </div>
  );
}
