"use client";

import { useEffect } from "react";
import { Container, tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

let particlesInitialized: Promise<void> | null = null;

function initializeParticles() {
  if (!particlesInitialized) {
    particlesInitialized = loadSlim(tsParticles);
  }

  return particlesInitialized;
}

export default function AmbientParticles() {
  useEffect(() => {
    let container: Container | undefined;
    let cancelled = false;

    async function init() {
      await initializeParticles();

      if (cancelled) return;

      container = await tsParticles.load({
        id: "ambient-particles",
        options: {
          fullScreen: {
            enable: false,
          },

          particles: {
            number: {
              value: 60,
            },

            color: {
              value: ["#ffffff"],
            },

            opacity: {
              value: {
                min: 0.1,
                max: 0.45,
              },
            },

            size: {
              value: {
                min: 1,
                max: 1.7,
              },
            },

            move: {
              enable: true,
              direction: "bottom",
              speed: 1,
              straight: true,
            },

            groups: {
              big: {
                number: {
                  value: 6,
                },
                size: {
                  value: {
                    min: 1,
                    max: 2,
                  },
                },
                opacity: {
                  value: {
                    min: 0.25,
                    max: 0.35,
                  },
                },
              },
            },
          },

          detectRetina: true,
        },
      });
    }

    init();

    return () => {
      cancelled = true;
      container?.destroy();
    };
  }, []);

  return <div
    id="ambient-particles"
    className="fixed inset-0 h-svh w-full z-0 pointer-events-none"
  />
}