"use client";

import { useEffect, useRef } from "react";

interface AvatarVideoProps {
  className?: string;
  poster?: string;
}

export function AvatarVideo({ className = "", poster }: AvatarVideoProps) {
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
      muted={true}
      autoPlay={true}
      playsInline={true}
      loop={true}
      preload="auto"
      className={className}
    >
      <source src="/avatar.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
