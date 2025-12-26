import { useEffect, useRef } from "react";

export default function VideoCard({ publicId, cloudName }) {
  const videoRef = useRef(null);

  const videoUrl = `https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/${publicId}.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.5, // 50% visible
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow-xl">
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        playsInline
        loop
        preload="metadata"
        className="w-full max-h-[85vh] object-contain rounded-2xl bg-black"
      />
    </div>
  );
}
