'use client';

import { useCallback, useEffect, useState } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine } from '@tsparticles/engine';

export function BackgroundAnimation() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    setInit(true);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!init) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: 'transparent',
            },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: 'grab',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 150,
                links: {
                  opacity: 0.3,
                },
              },
            },
          },
          particles: {
            color: {
              value: ['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#6366f1'],
            },
            links: {
              color: {
                value: '#3b82f6',
              },
              distance: 120,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: true,
              speed: 0.3,
              straight: false,
              attract: {
                enable: false,
              },
            },
            number: {
              density: {
                enable: true,
                area: 1000,
              },
              value: 60,
            },
            opacity: {
              value: { min: 0.2, max: 0.5 },
              animation: {
                enable: true,
                speed: 0.5,
                sync: false,
                destroy: 'none',
              },
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 1, max: 4 },
              animation: {
                enable: true,
                speed: 1,
                sync: false,
                destroy: 'none',
              },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}


