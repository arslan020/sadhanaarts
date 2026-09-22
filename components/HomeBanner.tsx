"use client";

import { useEffect, useRef } from "react";
import { mediaSrc } from "@/lib/blob";

export default function HomeBanner({ src, alt }: { src: string; alt: string }) {
  const trackRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const img = imgRef.current;
    if (!track || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const shift = (progress - 0.5) * 36;
      img.style.transform = `translate3d(0, ${shift}px, 0) scale(1.03)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative h-[170vh] bg-black">
      <div className="sticky top-[5.75rem] flex h-[calc(100svh-5.75rem)] items-center justify-center overflow-hidden bg-black sm:top-[6.5rem] sm:h-[calc(100svh-6.5rem)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={mediaSrc(src)}
          alt={alt}
          className="max-h-full w-full object-contain will-change-transform"
        />
      </div>
    </section>
  );
}
