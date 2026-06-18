"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  poster: string;
  src: string;
  title?: string;
};

export function VideoPlayer({ poster, src, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onLoaded = () => setReady(true);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("loadeddata", onLoaded);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("loadeddata", onLoaded);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <figure className="group relative aspect-[16/9] w-full overflow-hidden bg-stage">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster}
        preload="metadata"
        controls={playing}
        playsInline
      >
        <source src={src} type="video/mp4" />
      </video>

      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Lire la vidéo${title ? ` : ${title}` : ""}`}
          className="absolute inset-0 flex items-center justify-center bg-ink/30 hover:bg-ink/10 transition-colors duration-700"
        >
          <span className="relative flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-full border border-ivory/40 backdrop-blur-sm group-hover:scale-105 transition-transform duration-700 ease-velvet">
            <span className="absolute inset-0 rounded-full border border-champagne/60 animate-[veil_2.4s_ease-in-out_infinite_alternate]" />
            <svg width="22" height="26" viewBox="0 0 22 26" fill="none" className="ml-1 text-ivory">
              <path d="M0 0 L22 13 L0 26 Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      )}

      {title && (
        <figcaption className="pointer-events-none absolute left-6 bottom-6 right-6 flex items-end justify-between text-[11px] uppercase tracking-ultra text-ivory/80">
          <span>{title}</span>
          {!ready && <span className="opacity-60">Chargement…</span>}
        </figcaption>
      )}
    </figure>
  );
}
