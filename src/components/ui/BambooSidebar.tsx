import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BambooSidebar.css';

gsap.registerPlugin(ScrollTrigger);

const BambooSidebar: React.FC = () => {
  return (
    <>
      {/* Only render the left bamboo (with icons) and the bottom left bamboo */}
      {/* Vertical icon stack overlay */}
      <div
        style={{
          position: 'fixed',
          top: '18%',
          left: 0,
          width: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.1rem',
          zIndex: 9999,
          pointerEvents: 'auto',
        }}
      >
          {/* Home Icon */}
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(20,30,20,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 8px 2px #fff8, 0 3px 12px rgba(0,0,0,0.18)', border: '2px solid #395c3b', transition: 'transform 0.3s', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.13) rotate(2deg)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#18351e"/>
              <path d="M12 3l8 6v10H4V9l8-6zm6 7.5l-6-4.5-6 4.5V17h4v-4h4v4h4v-6.5z" fill="#ffffff"/>
            </svg>
          </div>
          {/* GitHub Icon */}
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(20,20,30,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 8px 2px #fff8, 0 3px 12px rgba(0,0,0,0.18)', border: '2px solid #395c3b', transition: 'transform 0.3s', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.13) rotate(-2deg)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#23272e"/>
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.252-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill="#ffffff"/>
            </svg>
          </div>
          {/* LinkedIn Icon */}
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(20,30,40,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 8px 2px #fff8, 0 3px 12px rgba(0,0,0,0.18)', border: '2px solid #395c3b', transition: 'transform 0.3s', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.13) rotate(2deg)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="4" fill="#0077B5"/>
              <path d="M8.5 10v7h-2v-7h2zm-1-3.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25zm8.5 4.5c0-1.43-.81-2.25-2.25-2.25-.61 0-1.15.28-1.5.75v-.75h-2v7h2v-3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v3.5h2v-4z" fill="#ffffff"/>
            </svg>
          </div>
          {/* Portfolio Icon */}
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(20,30,20,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 8px 2px #fff8, 0 3px 12px rgba(0,0,0,0.18)', border: '2px solid #395c3b', transition: 'transform 0.3s', cursor: 'pointer', position: 'relative' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.13) rotate(-2deg)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ width: 28, height: 22, background: 'linear-gradient(135deg, #232e23, #395c3b 80%)', borderRadius: 4, border: '2px solid #2E7D32', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.13), 0 2px 8px rgba(0,0,0,0.2)', position: 'relative' }}>
              <div style={{ position: 'absolute', width: 12, height: 3, background: 'linear-gradient(135deg, #2E7D32, #1B5E20)', top: -3, left: '50%', transform: 'translateX(-50%)', borderRadius: '2px 2px 0 0', border: '1px solid #2E7D32', borderBottom: 'none' }} />
              <div style={{ position: 'absolute', width: 14, height: 2, background: 'linear-gradient(90deg, #2E7D32, #1B5E20)', top: 5, left: '50%', transform: 'translateX(-50%)', borderRadius: 1 }} />
              <div style={{ position: 'absolute', height: 1, width: 10, background: 'linear-gradient(90deg, #2E7D32, #1B5E20)', left: 3, borderRadius: 0.5, top: 10 }} />
              <div style={{ position: 'absolute', height: 1, width: 8, background: 'linear-gradient(90deg, #2E7D32, #1B5E20)', left: 3, borderRadius: 0.5, top: 14 }} />
            </div>
          </div>
          {/* Contact Icon */}
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(20,30,20,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 8px 2px #fff8, 0 3px 12px rgba(0,0,0,0.18)', border: '2px solid #395c3b', transition: 'transform 0.3s', cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.13) rotate(2deg)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="12" fill="#395c3b"/>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.53 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="#ffffff"/>
            </svg>
          </div>
          {/* Instagram Icon */}
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(30,20,30,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 8px 2px #fff8, 0 3px 12px rgba(0,0,0,0.18)', border: '2px solid #395c3b', transition: 'transform 0.3s', cursor: 'pointer', position: 'relative' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.13) rotate(-2deg)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <div style={{ width: 28, height: 28, borderRadius: 10, background: 'linear-gradient(135deg, #3a1c2a, #833AB4 80%)', border: '2px solid #2E7D32', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.13), 0 2px 8px rgba(0,0,0,0.2)', position: 'relative' }}>
              <div style={{ position: 'absolute', width: 8, height: 8, border: '2px solid #fff', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }} />
              <div style={{ position: 'absolute', width: 2, height: 2, background: '#fff', borderRadius: '50%', top: 5, right: 5, boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
              <div style={{ position: 'absolute', width: 3, height: 3, border: '1px solid #fff', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
          </div>
        </div>
      {/* Large bamboo in bottom left corner */}
      <img
        src="/bamboo.png"
        alt="Large Bamboo Corner"
        style={{
          position: 'fixed',
          left: -10,
          bottom: 0,
          width: '84px',
          height: 'auto',
          zIndex: 120,
          pointerEvents: 'none',
          opacity: 0.95,
        }}
      />
    </>
  );
};

export default BambooSidebar; 