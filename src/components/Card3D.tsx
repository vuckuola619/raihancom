import React, { useRef, useState, useEffect } from "react";
import {
  waLink,
  WA_PRIMARY,
  WA_SECONDARY,
  WA_PRIMARY_DISPLAY,
  WA_SECONDARY_DISPLAY,
} from "@/lib/whatsapp";

interface Card3DProps {
  className?: string;
}

export function Card3D({ className = "" }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});
  const [sheenStyle, setSheenStyle] = useState<React.CSSProperties>({});

  const primaryHref = waLink(WA_PRIMARY);
  const secondaryHref = waLink(WA_SECONDARY);

  useEffect(() => {
    setTiltStyle({
      transform: isFlipped ? "rotateY(180deg) rotateX(0deg)" : "rotateY(0deg) rotateX(0deg)",
      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    });
    setGlareStyle({
      background:
        "radial-gradient(circle 250px at 50% 50%, rgba(255, 255, 255, 0) 0%, transparent 100%)",
      transition: "background 0.5s ease",
    });
    setSheenStyle({
      background:
        "radial-gradient(circle 350px at 50% 50%, rgba(58, 141, 255, 0) 0%, transparent 100%)",
      transition: "background 0.5s ease",
    });
  }, [isFlipped]);



  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside container
    const y = e.clientY - rect.top; // y position inside container

    // Normalize values between -0.5 and 0.5
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Degrees of tilt
    const maxTilt = 15;
    const tiltX = -normY * maxTilt;
    const tiltY = normX * maxTilt;

    // Apply rotation based on flip status
    if (isFlipped) {
      // Invert Y-tilt when flipped because of Y rotation
      setTiltStyle({
        transform: `rotateY(${180 - tiltY}deg) rotateX(${tiltX}deg)`,
        transition: "transform 0.05s ease-out",
      });
    } else {
      setTiltStyle({
        transform: `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
        transition: "transform 0.05s ease-out",
      });
    }

    // Glare & Sheen position percentages
    const pctX = (x / rect.width) * 100;
    const pctY = (y / rect.height) * 100;

    setGlareStyle({
      background: isFlipped
        ? `radial-gradient(circle 250px at ${100 - pctX}% ${pctY}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 45%, transparent 80%)`
        : `radial-gradient(circle 250px at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 40%, transparent 80%)`,
    });

    setSheenStyle({
      background: isFlipped
        ? `radial-gradient(circle 350px at ${100 - pctX}% ${pctY}%, rgba(58, 141, 255, 0.12) 0%, rgba(0, 102, 255, 0.06) 35%, transparent 75%)`
        : `radial-gradient(circle 350px at ${pctX}% ${pctY}%, rgba(58, 141, 255, 0.1) 0%, rgba(0, 102, 255, 0.05) 30%, transparent 70%)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: isFlipped ? "rotateY(180deg) rotateX(0deg)" : "rotateY(0deg) rotateX(0deg)",
      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    });
    setGlareStyle({
      background:
        "radial-gradient(circle 250px at 50% 50%, rgba(255, 255, 255, 0) 0%, transparent 100%)",
      transition: "background 0.5s ease",
    });
    setSheenStyle({
      background:
        "radial-gradient(circle 350px at 50% 50%, rgba(58, 141, 255, 0) 0%, transparent 100%)",
      transition: "background 0.5s ease",
    });
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      ref={containerRef}
      className={`card-3d-container select-none font-plus-jakarta ${className}`}
      style={{
        perspective: "2000px",
        width: "100%",
        maxWidth: "620px",
        margin: "0 auto",
      }}
    >
      {/* Scope styles specifically for the 3D card layout */}
      <style>{`
        .font-plus-jakarta {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .card-3d-scene {
          position: relative;
          width: 100%;
          aspect-ratio: 620 / 350;
          cursor: pointer;
          transform-style: preserve-3d;
        }
        .card-3d-scene:focus-visible {
          outline: 3px solid #3a8dff;
          outline-offset: 8px;
          border-radius: 22px;
        }
        
        /* Container-query-like sizing for text and elements inside the card */
        .card-3d-scene {
          container-type: inline-size;
          container-name: card;
        }
        
        .card-face-3d {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.08);
          transform-style: preserve-3d;
        }
        
        .card-grain-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.12;
          pointer-events: none;
          z-index: 10;
          mix-blend-mode: overlay;
        }
        
        .card-glare-overlay,
        .card-sheen-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 8;
        }
        
        .card-sheen-overlay {
          z-index: 9;
          mix-blend-mode: color-dodge;
        }

        /* Front Face styling */
        .card-front-3d {
          background-color: #0b1426;
          display: flex;
        }
        
        .front-left-panel-3d {
          position: absolute;
          left: 0;
          top: 0;
          width: 44%;
          height: 100%;
          background: #f7f9fc;
          clip-path: polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%);
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 6cqi 5cqi;
        }
        
        .front-accent-blue-3d {
          position: absolute;
          left: 0;
          top: 0;
          width: 46.5%;
          height: 100%;
          background: linear-gradient(135deg, #3a8dff 0%, #0066ff 100%);
          clip-path: polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%);
          z-index: 3;
        }
        
        .front-accent-dark-blue-3d {
          position: absolute;
          left: 0;
          top: 0;
          width: 49%;
          height: 100%;
          background: linear-gradient(135deg, #0d1e3a 0%, #060c18 100%);
          clip-path: polygon(0 0, 83.5% 0, 100% 50%, 83.5% 100%, 0 100%);
          z-index: 2;
        }
        
        .logo-rc-3d {
          width: 24cqi;
          height: auto;
        }
        
        .menerima-divider-3d {
          width: 6cqi;
          height: 0.5cqi;
          background-color: #0066ff;
          margin-bottom: 1.5cqi;
        }
        
        .menerima-title-3d {
          font-size: 2cqi;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #0066ff;
          text-transform: uppercase;
        }
        
        .menerima-desc-3d {
          font-size: 2.3cqi;
          font-weight: 700;
          color: #3b465e;
          line-height: 1.3;
        }
        
        .front-right-panel-3d {
          position: absolute;
          right: 0;
          top: 0;
          width: 60%;
          height: 100%;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          padding: 7cqi 5cqi 5cqi 7cqi;
        }
        
        .dot-grid-3d {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1.5px, transparent 1.5px);
          background-size: 2.5cqi 2.5cqi;
          pointer-events: none;
          z-index: 0;
        }
        
        .company-name-3d {
          font-size: 5cqi;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1;
          margin-bottom: 1cqi;
        }
        
        .company-name-3d span {
          color: #3a8dff;
        }
        
        .company-divider-3d {
          width: 10cqi;
          height: 0.35cqi;
          background-color: #3a8dff;
          margin-bottom: 1.5cqi;
        }
        
        .company-tagline-3d {
          font-size: 1.9cqi;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
        }
        
        .services-row-3d {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.5cqi;
          width: 100%;
          z-index: 2;
        }
        
        .service-item-3d {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .service-icon-3d {
          width: 5.5cqi;
          height: 5.5cqi;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1cqi;
          color: #3a8dff;
          transition: transform 0.2s ease;
        }
        
        .service-name-3d {
          font-size: 1.4cqi;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        /* Back Face styling */
        .card-back-3d {
          background-color: #f7f9fc;
          transform: rotateY(180deg);
          display: flex;
        }
        
        .back-left-panel-3d {
          position: absolute;
          left: 0;
          top: 0;
          width: 58%;
          height: 100%;
          background: #0b1426;
          clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);
          z-index: 4;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 6cqi 7cqi 6cqi 6cqi;
        }
        
        .back-accent-blue-3d {
          position: absolute;
          left: 0;
          top: 0;
          width: 60.5%;
          height: 100%;
          background: linear-gradient(135deg, #3a8dff 0%, #0066ff 100%);
          clip-path: polygon(0 0, 86.5% 0, 100% 50%, 86.5% 100%, 0 100%);
          z-index: 3;
        }
        
        .back-accent-gray-3d {
          position: absolute;
          left: 0;
          top: 0;
          width: 63%;
          height: 100%;
          background: #e1e7f0;
          clip-path: polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%);
          z-index: 2;
        }
        
        .profile-header-3d {
          display: flex;
          align-items: center;
          gap: 2cqi;
        }
        
        .profile-avatar-icon-3d {
          width: 6cqi;
          height: 6cqi;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px dashed rgba(255, 255, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3a8dff;
        }
        
        .profile-name-3d {
          font-size: 3cqi;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1.1;
        }
        
        .profile-name-3d span {
          color: #3a8dff;
        }
        
        .profile-title-3d {
          font-size: 1.5cqi;
          font-weight: 600;
          color: #7b8fae;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 0.3cqi;
        }
        
        .contact-details-3d {
          display: flex;
          flex-direction: column;
          gap: 1.8cqi;
          margin: 3.5cqi 0;
        }
        
        .contact-row-3d {
          display: flex;
          align-items: center;
          gap: 2cqi;
          color: #ffffff;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        
        .contact-row-3d:hover {
          opacity: 0.85;
        }
        
        .contact-icon-square-3d {
          width: 5cqi;
          height: 5cqi;
          border-radius: 6px;
          background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3a8dff;
        }
        
        .contact-text-3d {
          font-size: 2.3cqi;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        
        .motto-row-3d {
          display: flex;
          align-items: flex-start;
          gap: 1.5cqi;
        }
        
        .motto-icon-3d {
          color: #3a8dff;
          margin-top: 0.3cqi;
          flex-shrink: 0;
        }
        
        .motto-text-3d {
          font-size: 1.8cqi;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.35;
        }
        
        .motto-text-3d span {
          color: #3a8dff;
          font-weight: 700;
        }
        
        .back-right-panel-3d {
          position: absolute;
          right: 0;
          top: 0;
          width: 48%;
          height: 100%;
          z-index: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          padding: 6cqi 5cqi;
        }
        
        .tech-drawing-svg-3d {
          width: 100%;
          height: 20cqi;
          color: #9eb1cf;
          margin-bottom: auto;
        }
        
        .solusi-box-3d {
          text-align: right;
          width: 100%;
        }
        
        .solusi-title-3d {
          font-size: 1.8cqi;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: #3b465e;
          text-transform: uppercase;
          line-height: 1.3;
        }
        
        .solusi-title-3d span {
          color: #0066ff;
          display: block;
          font-weight: 800;
        }
        
        .solusi-divider-3d {
          width: 6cqi;
          height: 0.5cqi;
          background-color: #0066ff;
          margin-top: 1cqi;
          margin-left: auto;
        }
      `}</style>

      {/* 3D Perspective Scene Container */}
      <div
        ref={cardRef}
        className="card-3d-scene"
        style={{
          transformStyle: "preserve-3d",
          ...tiltStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleFlip}
      >
        {/* FRONT FACE OF THE CARD */}
        <div className="card-face-3d card-front-3d">
          {/* Matte/Paper Grain Overlay */}
          <svg
            className="card-grain-overlay"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <filter id="cardNoise3D">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.75"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#cardNoise3D)" />
          </svg>

          {/* Dynamic Glare & Sheen */}
          <div className="card-glare-overlay" style={glareStyle} />
          <div className="card-sheen-overlay" style={sheenStyle} />

          {/* Left White Panel with Chevron */}
          <div className="front-left-panel-3d">
            {/* RC Monogram Logo (SVG) */}
            <svg className="logo-rc-3d" viewBox="0 0 150 90" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoBlueGrad3D" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0058e6" />
                  <stop offset="100%" stopColor="#0088ff" />
                </linearGradient>
              </defs>
              {/* Stylized 'R' */}
              <path
                d="M20,15 L20,75 M20,15 L50,15 C66,15 70,28 70,38 C70,48 62,50 48,50 L20,50"
                fill="none"
                stroke="url(#logoBlueGrad3D)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M42,50 L68,75"
                fill="none"
                stroke="url(#logoBlueGrad3D)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Stylized 'C' which loops into/around the R */}
              <path
                d="M115,22 C115,22 102,15 85,20 C68,25 65,48 80,68 C92,80 115,73 115,73"
                fill="none"
                stroke="url(#logoBlueGrad3D)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Menerima text */}
            <div className="menerima-box-3d">
              <div className="menerima-divider-3d"></div>
              <div className="menerima-title-3d">Menerima</div>
              <div className="menerima-desc-3d">Alat-Alat Bekas Kantor</div>
            </div>
          </div>

          {/* Chevron Accent Stripes Behind Left Panel */}
          <div className="front-accent-blue-3d" />
          <div className="front-accent-dark-blue-3d" />

          {/* Right Dark Panel */}
          <div className="front-right-panel-3d">
            <div className="dot-grid-3d"></div>

            {/* Company Info */}
            <div>
              <h2 className="company-name-3d">
                RAIHAN <span>COM</span>
              </h2>
              <div className="company-divider-3d"></div>
              <p className="company-tagline-3d">Jual Beli Alat Kantor Bekas</p>
            </div>

            {/* Services Grid (6 Icons) */}
            <div className="services-row-3d">
              {/* PABX */}
              <div className="service-item-3d">
                <div className="service-icon-3d">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="100%"
                    height="100%"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    <rect x="14" y="2" width="8" height="8" rx="1" />
                  </svg>
                </div>
                <span className="service-name-3d">Pabx</span>
              </div>

              {/* PRINTER */}
              <div className="service-item-3d">
                <div className="service-icon-3d">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="100%"
                    height="100%"
                  >
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                </div>
                <span className="service-name-3d">Printer</span>
              </div>

              {/* CPU */}
              <div className="service-item-3d">
                <div className="service-icon-3d">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="100%"
                    height="100%"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    <circle cx="12" cy="18" r="0.5" fill="currentColor" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                  </svg>
                </div>
                <span className="service-name-3d">CPU</span>
              </div>

              {/* PROYEKTOR */}
              <div className="service-item-3d">
                <div className="service-icon-3d">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="100%"
                    height="100%"
                  >
                    <rect x="2" y="7" width="15" height="11" rx="2" />
                    <circle cx="10" cy="12.5" r="2.5" />
                    <path d="M17 10l5-3v10l-5-3" />
                  </svg>
                </div>
                <span className="service-name-3d">Proyektor</span>
              </div>

              {/* HT / RADIO */}
              <div className="service-item-3d">
                <div className="service-icon-3d">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="100%"
                    height="100%"
                  >
                    <rect x="5" y="9" width="14" height="12" rx="2" />
                    <line x1="12" y1="2" x2="12" y2="9" />
                    <circle cx="12" cy="15" r="2" />
                    <line x1="8" y1="6" x2="12" y2="6" />
                  </svg>
                </div>
                <span className="service-name-3d">HT/Radio</span>
              </div>

              {/* DLL */}
              <div className="service-item-3d">
                <div className="service-icon-3d">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="100%"
                    height="100%"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="8" cy="12" r="1" fill="currentColor" />
                    <circle cx="12" cy="12" r="1" fill="currentColor" />
                    <circle cx="16" cy="12" r="1" fill="currentColor" />
                  </svg>
                </div>
                <span className="service-name-3d">Dll</span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE OF THE CARD */}
        <div className="card-face-3d card-back-3d">
          {/* Matte/Paper Grain Overlay */}
          <svg
            className="card-grain-overlay"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <rect width="100%" height="100%" filter="url(#cardNoise3D)" />
          </svg>

          {/* Dynamic Glare & Sheen */}
          <div className="card-glare-overlay" style={glareStyle} />
          <div className="card-sheen-overlay" style={sheenStyle} />

          {/* Left Dark Panel with Chevron pointing left */}
          <div className="back-left-panel-3d">
            {/* Profile/Name header */}
            <div className="profile-header-3d">
              <div className="profile-avatar-icon-3d">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="70%"
                  height="70%"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="profile-info-3d">
                <h3 className="profile-name-3d">
                  EDI <span>JANUAR</span>
                </h3>
                <p className="profile-title-3d">Penanggung Jawab</p>
              </div>
            </div>

            {/* Contact info list */}
            <div className="contact-details-3d">
              {/* WA Primary */}
              <a
                href={primaryHref}
                target="_blank"
                rel="noopener"
                className="contact-row-3d"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="contact-icon-square-3d">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="60%"
                    height="60%"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>
                <span className="contact-text-3d">{WA_PRIMARY_DISPLAY}</span>
              </a>
              {/* WA Secondary */}
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener"
                className="contact-row-3d"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="contact-icon-square-3d">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="60%"
                    height="60%"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="contact-text-3d">{WA_SECONDARY_DISPLAY}</span>
              </a>
            </div>

            {/* Motto */}
            <div className="motto-row-3d">
              <div className="motto-icon-3d">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="16"
                  height="16"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <p className="motto-text-3d">
                Melayani dengan jujur, cepat,
                <br />
                dan <span>harga bersahabat.</span>
              </p>
            </div>
          </div>

          {/* Chevron accents Behind Left Panel */}
          <div className="back-accent-blue-3d" />
          <div className="back-accent-gray-3d" />

          {/* Right White Panel */}
          <div className="back-right-panel-3d">
            {/* Office Equipment Technical Illustration SVG */}
            <svg
              className="tech-drawing-svg-3d"
              viewBox="0 0 200 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Printer outline */}
              <rect
                x="25"
                y="55"
                width="60"
                height="35"
                rx="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M35,55 L35,42 L75,42 L75,55"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M35,90 L35,98 L75,98 L75,90"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              {/* Monitor/PC Outline */}
              <rect
                x="100"
                y="25"
                width="55"
                height="38"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <path
                d="M120,63 L120,78 L135,78 L135,63"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <path
                d="M110,78 L145,78"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.85"
              />
              {/* CPU Tower Outline (behind monitor) */}
              <rect
                x="150"
                y="15"
                width="22"
                height="63"
                rx="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.75"
              />
              <circle cx="161" cy="25" r="2" fill="currentColor" opacity="0.75" />
              <line
                x1="155"
                y1="35"
                x2="167"
                y2="35"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.75"
              />
              {/* Projector Outline (in front) */}
              <rect
                x="75"
                y="70"
                width="45"
                height="22"
                rx="3"
                fill="#f7f9fc"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="88" cy="81" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="88" cy="81" r="2" fill="currentColor" />
              {/* Small Telephone outline */}
              <rect
                x="135"
                y="65"
                width="30"
                height="22"
                rx="2"
                fill="#f7f9fc"
                stroke="currentColor"
                strokeWidth="1.2"
                opacity="0.9"
              />
              <path d="M138,65 L138,82" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
              <circle cx="148" cy="71" r="1" fill="currentColor" opacity="0.9" />
              <circle cx="154" cy="71" r="1" fill="currentColor" opacity="0.9" />
              <circle cx="160" cy="71" r="1" fill="currentColor" opacity="0.9" />
              <circle cx="148" cy="76" r="1" fill="currentColor" opacity="0.9" />
              <circle cx="154" cy="76" r="1" fill="currentColor" opacity="0.9" />
              <circle cx="160" cy="76" r="1" fill="currentColor" opacity="0.9" />
            </svg>

            {/* Solusi Cerdas */}
            <div className="solusi-box-3d">
              <h4 className="solusi-title-3d">
                Solusi Cerdas Untuk<span>Kebutuhan Kantor Anda</span>
              </h4>
              <div className="solusi-divider-3d"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Flip Control */}
      <div className="mt-5 flex justify-center">
        <button
          onClick={handleFlip}
          className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground border border-border bg-card/60 hover:bg-accent hover:text-foreground transition-all cursor-pointer shadow-sm hover:shadow"
        >
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          Balik Kartu (Flip Card)
        </button>
      </div>
    </div>
  );
}
