import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bird } from '../features/Bird';

const Header: React.FC = () => {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          key="header-branch"
          className="w-full z-40 bg-no-repeat transition-transform duration-300"
          style={{
            backgroundImage: "url('/branch1.png')",
            backgroundSize: 'auto 300px',
            backgroundPosition: 'left -80px',
            backgroundRepeat: 'no-repeat',
            height: '300px',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
          }}
          initial={{ opacity: 1 }}
          animate={{ rotate: [0, 2, -2, 0], opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.7 }, rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
        >
          {/* Animated birds on the branch */}
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <motion.div
              style={{ position: 'absolute', left: '24%', top: '38px', zIndex: 2, transform: 'rotate(-8deg)' }}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Bird isFlapping={false} rotation={0} pitchRotation={0} scale={0.85} direction={1} />
            </motion.div>
            <motion.div
              style={{ position: 'absolute', left: '41%', top: '54px', zIndex: 1, transform: 'rotate(10deg)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Bird isFlapping={false} rotation={0} pitchRotation={0} scale={0.6} direction={-1} />
            </motion.div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;