import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlowerButton from '../features/FlowerButton';
import ForestScene from '../../components/ui/ForestScene';
import { motion, AnimatePresence } from 'framer-motion';
import { Bird } from '../features/Bird';

gsap.registerPlugin(ScrollTrigger);

// BirdFlyAnimation overlay using Bird component
const BirdFlyAnimation: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const birds = [
    { id: 1, x: [-200, 600, 1400], y: [200, 80, 0], rotate: [0, 10, -20], delay: 0 },
    { id: 2, x: [-300, 400, 1200], y: [400, 200, 100], rotate: [0, -15, 20], delay: 0.15 },
    { id: 3, x: [-100, 800, 1600], y: [600, 300, 50], rotate: [0, 20, -10], delay: 0.3 },
  ];
  return (
    <motion.div
      className="fixed inset-0 z-[3000] pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'transparent' }}
    >
      {birds.map((bird, i) => (
        <motion.div
          key={bird.id}
          initial={{ x: bird.x[0], y: bird.y[0], rotate: bird.rotate[0], opacity: 0 }}
          animate={{
            x: bird.x,
            y: bird.y,
            rotate: bird.rotate,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.6,
            times: [0, 0.2, 0.8, 1],
            delay: bird.delay,
            ease: 'easeInOut',
            onComplete: i === birds.length - 1 ? onComplete : undefined,
          }}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 3001, filter: 'drop-shadow(0 4px 16px #0008)' }}
        >
          <Bird isFlapping={true} rotation={bird.rotate[0]} pitchRotation={0} scale={1.2} direction={1} />
        </motion.div>
      ))}
    </motion.div>
  );
};

const HomeSection: React.FC = () => {
  // const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const jungle2Ref = useRef<HTMLImageElement>(null);
  const aboutBranchRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [jungle2Opacity, setJungle2Opacity] = useState(0);
  const [jungle2Scale, setJungle2Scale] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [contentY, setContentY] = useState(0);
  const [forestOpacity, setForestOpacity] = useState(0);
  const [jungleOpacity, setJungleOpacity] = useState(1);
  const navigate = useNavigate();
  const [showBirds, setShowBirds] = useState(false);

  useEffect(() => {
    let trigger: ScrollTrigger | undefined;
    if (wrapperRef.current) {
      trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.9, // smoother catch-up for all scroll speeds
        onUpdate: (self) => {
          // Fade out jungle.png in the first 30% of scroll
          if (self.progress <= 0.3) {
            setJungleOpacity(1 - self.progress / 0.3);
          } else {
            setJungleOpacity(0);
          }
          if (self.progress <= 0.4) {
            setJungle2Opacity(self.progress / 0.4);
            setJungle2Scale(1 + self.progress * 0.15 / 0.4);
            setForestOpacity(0);
          } else if (self.progress <= 0.8) {
            setJungle2Opacity(1);
            setJungle2Scale(1.15 + (self.progress - 0.4) * 0.15 / 0.4);
            setForestOpacity(0);
          } else {
            setJungle2Opacity(1 - (self.progress - 0.8) / 0.2);
            setJungle2Scale(1.3);
            setForestOpacity((self.progress - 0.8) / 0.2); // 0 → 1
          }
          setContentOpacity(1 - self.progress * 1.2);
          setContentY(-self.progress * 120);
        },
      });
    }
    return () => {
      if (trigger) trigger.kill();
      // Cleanup: forcibly remove the branch image if it exists
      const ref = aboutBranchRef.current;
      if (ref && ref.parentNode) {
        ref.parentNode.removeChild(ref);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hide-scrollbar" style={{ minHeight: '200vh', position: 'relative', scrollBehavior: 'smooth' }}>
      {/* BirdFlyAnimation overlay */}
      <AnimatePresence>
        {showBirds && (
          <BirdFlyAnimation
            onComplete={() => {
              setShowBirds(false);
              navigate('/projects');
            }}
          />
        )}
      </AnimatePresence>
      {/* Fixed scene in viewport */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
        }}
      >
        {/* mountain.png as the base background */}
        <img
          src="/mountain.png"
          alt="Mountain Background"
          className="w-full h-full object-cover absolute inset-0 -z-20"
        />
        {/* jungle.png only appears on HomeSection, not in deep scroll or other backgrounds */}
        <img
          src="/jungle.png"
          alt="Jungle Background"
          className="w-full h-full object-cover absolute inset-0 -z-5"
          style={{ opacity: jungleOpacity, willChange: 'opacity' }}
        />
        {/* jungle2.png fades in, then out, and zooms */}
        <img
          ref={jungle2Ref}
          src="/jungle2.png"
          alt="Jungle 2 Background"
          className="w-full h-full object-cover absolute inset-0"
          style={{
            opacity: jungle2Opacity,
            transform: `scale(${jungle2Scale})`,
            transition: 'opacity 0.2s, transform 0.2s',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        {/* ForestScene fades in as about-branch.png fades out, above all overlays */}
        <div
          style={{
            opacity: forestOpacity,
            transition: 'opacity 0.2s',
            zIndex: 30,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: forestOpacity > 0.1 ? 'auto' : 'none',
          }}
        >
          <ForestScene onGoForProject={() => setShowBirds(true)} />
        </div>
        {/* Main content stays centered, fades and moves up */}
        <div
          className="max-w-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          ref={contentRef}
          style={{ opacity: contentOpacity < 0 ? 0 : contentOpacity, transform: `translate(-50%, -50%) translateY(${contentY}px)` }}
        >
          <h1 className="text-5xl md:text-7xl mb-4 text-green-800 dark:text-green-300" style={{ fontFamily: 'Caveat, cursive' }}>
            Your Name
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-700 dark:text-green-400">
            Web Developer & Digital Explorer
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <FlowerButton
              label="Explore My Jungle"
              className="home-section-flower-button"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;