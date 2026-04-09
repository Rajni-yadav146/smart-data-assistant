"use client";

import React, { useEffect, useRef } from 'react';

const SmartDataWallpaper = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = () => {
      const container = containerRef.current?.querySelector('#particles');
      if (!container) return;

      const particleCount = window.innerWidth < 768 ? 30 : 60;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle particle-small';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        const colors = ['#14c8c8', '#7c3aed', '#06b6d4', '#10b981'];
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];

        const duration = 4 + Math.random() * 4;
        const delay = Math.random() * 2;

        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        container.appendChild(particle);
      }

      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0);
          }
          50% {
            opacity: 0.8;
            transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px);
          }
        }
      `;
      document.head.appendChild(style);
    };

    const createDataLines = () => {
      const container = containerRef.current?.querySelector('#particles');
      if (!container) return;

      for (let i = 0; i < 5; i++) {
        const line = document.createElement('div');
        line.className = 'data-line active';
        line.style.top = Math.random() * 100 + '%';
        line.style.left = '0';
        line.style.width = Math.random() * 300 + 100 + 'px';
        line.style.animationDelay = i * 0.6 + 's';
        container.appendChild(line);
      }
    };

    const createFloatingLabels = () => {
      const container = containerRef.current?.querySelector('#particles');
      if (!container) return;

      const labels = ['Analytics', 'Data', 'Insights', 'Query', 'Processing', 'Smart'];

      for (let i = 0; i < 4; i++) {
        const label = document.createElement('div');
        label.className = 'floating-label';
        label.textContent = labels[Math.floor(Math.random() * labels.length)];
        label.style.left = Math.random() * 80 + 10 + '%';
        label.style.bottom = Math.random() * 40 + '%';
        label.style.animationDelay = i * 1.5 + 's';
        container.appendChild(label);
      }
    };

    const createPulseRings = () => {
      const container = containerRef.current?.querySelector('#particles');
      if (!container) return;

      for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.className = 'pulse-ring';
        ring.style.width = '40px';
        ring.style.height = '40px';
        ring.style.left = 30 + i * 20 + '%';
        ring.style.top = 40 + i * 10 + '%';
        ring.style.animationDelay = i * 1 + 's';
        container.appendChild(ring);
      }
    };

    const init = () => {
      createParticles();
      createDataLines();
      createFloatingLabels();
      createPulseRings();
    };

    init();

    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="wallpaper-container">
      <style>{`
        .wallpaper-container {
          width: 100%;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          overflow: hidden;
          background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 50%, #0d1117 100%);
          z-index: 0;
        }

        .grid-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.05;
          background-image:
            linear-gradient(0deg, transparent 24%, rgba(20, 200, 200, 0.05) 25%, rgba(20, 200, 200, 0.05) 26%, transparent 27%, transparent 74%, rgba(20, 200, 200, 0.05) 75%, rgba(20, 200, 200, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(20, 200, 200, 0.05) 25%, rgba(20, 200, 200, 0.05) 26%, transparent 27%, transparent 74%, rgba(20, 200, 200, 0.05) 75%, rgba(20, 200, 200, 0.05) 76%, transparent 77%, transparent);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #14c8c8 0%, transparent 70%);
          top: -100px;
          right: -50px;
          animation: orbFloat 15s ease-in-out infinite;
        }

        .orb-2 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #7c3aed 0%, transparent 70%);
          bottom: -50px;
          left: 10%;
          animation: orbFloat 18s ease-in-out infinite reverse;
        }

        .orb-3 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
          top: 30%;
          left: -100px;
          animation: orbFloat 20s ease-in-out infinite;
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, -30px);
          }
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          opacity: 0.6;
        }

        .particle-small {
          width: 1px;
          height: 1px;
          box-shadow: 0 0 10px currentColor;
        }

        .data-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, #14c8c8, transparent);
          opacity: 0;
        }

        .data-line.active {
          animation: flowLine 3s ease-in-out infinite;
        }

        @keyframes flowLine {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }
          50% {
            opacity: 0.8;
            transform: scaleX(1);
          }
          100% {
            opacity: 0;
            transform: scaleX(1);
          }
        }

        .floating-label {
          position: absolute;
          font-size: 12px;
          color: rgba(20, 200, 200, 0.4);
          font-weight: 500;
          letter-spacing: 1px;
          pointer-events: none;
          animation: floatUp 6s ease-in-out infinite;
          text-transform: uppercase;
        }

        @keyframes floatUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0;
            transform: translateY(-60px);
          }
        }

        .pulse-ring {
          position: absolute;
          border: 2px solid rgba(20, 200, 200, 0.3);
          border-radius: 50%;
          animation: pulse 3s ease-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .center-glow {
          position: absolute;
          width: 100px;
          height: 100px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(20, 200, 200, 0.1) 0%, transparent 70%);
          filter: blur(40px);
          animation: glowPulse 4s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        .watermark {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 12px;
          color: rgba(20, 200, 200, 0.3);
          font-weight: 600;
          letter-spacing: 2px;
          pointer-events: none;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .orb-1, .orb-2, .orb-3 {
            filter: blur(60px);
            opacity: 0.1;
          }
          
          .watermark {
            font-size: 10px;
            top: 10px;
            right: 10px;
          }
        }
      `}</style>

      <div className="grid-bg"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="center-glow"></div>
      <div className="particles" id="particles"></div>
      <div className="watermark">Smart Data Assistant</div>
    </div>
  );
};

export default SmartDataWallpaper;
