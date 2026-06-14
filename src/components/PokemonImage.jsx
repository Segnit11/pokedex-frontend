"use client";
import React, { useState } from "react";
import Image from "next/image";
import { artwork, sprite } from "@/lib/config";

// Official artwork with a graceful fallback to the basic sprite, then a
// placeholder, so a missing image never breaks the layout.
const PokemonImage = ({ id, name, size = 200, priority = false }) => {
  const [src, setSrc] = useState(artwork(id));
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.4,
        }}
      >
        ❓
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={name || `Pokemon ${id}`}
      width={size}
      height={size}
      priority={priority}
      style={{ objectFit: "contain", filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.25))" }}
      onError={() => {
        if (src !== sprite(id)) setSrc(sprite(id));
        else setFailed(true);
      }}
      unoptimized
    />
  );
};

export default PokemonImage;
