"use client";

import { useEffect, useRef } from "react";

interface AvatarVideoProps {
  className?: string;
  poster?: string;
}

export function AvatarVideo({
  className = "",
  poster = "/about.png",
}: AvatarVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Silently handle autoplay restrictions
      });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      autoPlay
      playsInline
      preload="auto"
      controls={false}
      poster={poster}
      className={className}
      aria-label="Raz Kedem - Senior Full Stack Developer"
    >
      <source src="/avatar-ios.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
