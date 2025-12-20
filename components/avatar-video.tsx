"use client";

import { useEffect, useRef, useState } from "react";

interface AvatarVideoProps {
  className?: string;
  poster?: string;
}

export function AvatarVideo({ className = "", poster }: AvatarVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Ensure component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isMounted) return;

    const handleVideoEnd = () => {
      // Clear any existing timeout
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      // Wait 5 seconds before restarting the loop
      pauseTimeoutRef.current = setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {
            // Autoplay might be blocked
          });
        }
      }, 5000);
    };

    const handleError = () => {
      console.error("Video failed to load");
      setHasError(true);
    };

    const handleCanPlay = () => {
      // Try to play when video can play
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);

    // Try to load and play
    video.load();
    video.play().catch(() => {
      // Autoplay might be blocked, that's okay
    });

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className={`${className} bg-muted animate-pulse rounded-full`} />
    );
  }

  if (hasError) {
    return (
      <div className={`${className} bg-muted rounded-full flex items-center justify-center`}>
        <span className="text-2xl">👤</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      loop={false}
      muted
      playsInline
      preload="auto"
      poster={poster}
      className={className}
    >
      <source src="/avatar.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
