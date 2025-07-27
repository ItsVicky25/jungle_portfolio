import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import "./ForestScene.css";

const ForestScene = ({ onGoForProject }) => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function scaleContainer() {
      const container = containerRef.current;
      if (!container) return;
      const scaleX = window.innerWidth / 1600;
      const scaleY = window.innerHeight / 600;
      const scale = Math.min(scaleX, scaleY, 1);
      container.style.transform = `scale(${scale})`;
      container.style.transformOrigin = "top left";
    }
    window.addEventListener("resize", scaleContainer);
    scaleContainer();
    return () => window.removeEventListener("resize", scaleContainer);
  }, []);

  const handleDeepNavigate = (path) => {
    const container = containerRef.current;
    if (!container) return;
    gsap.to(container, {
      opacity: 0,
      scale: 1.2,
      duration: 1,
      onComplete: () => {
        navigate(path);
        // Reset for when user comes back
        gsap.set(container, { opacity: 1, scale: 1 });
      }
    });
  };

  return (
    <>
      <div className="container" ref={containerRef}>
        <div className="trees"></div>
        <div className="wbf"></div>
        <div className="wooden-bridge"></div>
        <div className="main-bord"></div>
        <div className="wooden-signpost signpost1" style={{ zIndex: 100 }}>
          <a
            href="/projects"
            className="signpost-text"
            style={{
              position: 'absolute',
              top: 28,
              left: 0,
              width: '100%',
              height: 40,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(75, 46, 5, 0.3)',
              borderRadius: '8px',
              color: '#4B2E05',
              fontFamily: 'Berkshire Swash, cursive',
              fontSize: '1.2rem',
              cursor: 'pointer',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            }}
            onClick={e => {
              e.preventDefault();
              if (onGoForProject) {
                onGoForProject();
              } else {
                handleDeepNavigate('/projects');
              }
            }}
          >
            Go for Project
          </a>
        </div>
        <div className="wooden-signpost signpost2" style={{ zIndex: 100 }}>
          <a
            href="/experiences"
            className="signpost-text"
            style={{
              position: 'absolute',
              top: 28,
              left: 0,
              width: '100%',
              height: 40,
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(75, 46, 5, 0.3)',
              borderRadius: '8px',
              color: '#4B2E05',
              fontFamily: 'Berkshire Swash, cursive',
              fontSize: '1.2rem',
              cursor: 'pointer',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={e => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
            }}
            onClick={e => {
              e.preventDefault();
              handleDeepNavigate('/experiences');
            }}
          >
            Experiences
          </a>
        </div>
        <div className="green-landscape-right"></div>
      </div>
    </>
  );
};

export default ForestScene; 