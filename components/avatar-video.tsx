"use client";

import { useEffect, useRef, useState } from "react";

interface AvatarVideoProps {
  className?: string;
  poster?: string;
}

export function AvatarVideo({ className = "", poster }: AvatarVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Lazy load video when it enters viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before it's visible
        threshold: 0.1,
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    const handleVideoEnd = () => {
      // Clear any existing timeout
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      // Wait 5 seconds before restarting the loop
      pauseTimeoutRef.current = setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play();
        }
      }, 5000);
    };

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("loadeddata", handleLoadedData);

    // Only start playing when video is loaded and in view
    if (isLoaded) {
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    }

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("loadeddata", handleLoadedData);
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [isInView, isLoaded]);

  return (
    <div ref={containerRef} className={className}>
      {isInView ? (
        <video
          ref={videoRef}
          autoPlay
          loop={false}
          muted
          playsInline
          preload="metadata"
          poster={poster}
          className={className}
        >
          <source src="/avatar.mp4" type="video/mp4" />
        </video>
      ) : (
        // Show placeholder while not in view
        <div className={`${className} bg-muted animate-pulse`} />
      )}
    </div>
  );
}
