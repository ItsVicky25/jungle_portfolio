import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mountainImgRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  useEffect(() => {
    if (sectionRef.current && mountainImgRef.current) {
      gsap.to(mountainImgRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.7,
        },
        ease: 'none',
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container relative min-h-screen py-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <img
          ref={mountainImgRef}
          src="/mountain.png"
          alt="Mountain Background"
          className="w-full h-full object-cover absolute inset-0"
          style={{ zIndex: 1 }}
        />
        <img
          src="/jungle2.png"
          alt="Jungle 2 Background"
          className="w-full h-full object-cover absolute inset-0"
          style={{ zIndex: 0 }}
        />
        {/* Overlay about-branch.png on top of jungle2.png, e.g. top left, visually prominent but not blocking content */}
        <img
          src="/about-branch.png"
          alt="About Branch Overlay"
          className="absolute left-1/2 top-1/2"
          style={{
            zIndex: 2,
            width: '520px',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            opacity: 0.97,
          }}
        />
      </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center px-8 text-center"
        style={{ zIndex: 3 }}
        >
          <img
            src="/about-text.png"
            alt="About Text"
            className="absolute top-12 left-1/2 -translate-x-1/2 max-w-[40%] h-auto"
            style={{ filter: 'drop-shadow(0 2px 12px #fffbe0)' }}
          />
          <div className="mt-44 w-full flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#3a2207', fontFamily: 'Berkshire Swash, cursive' }}>
              🚀 Hello, World! 👋
            </p>
            <p className="text-lg md:text-xl font-semibold mb-2" style={{ color: '#3a2207', fontFamily: 'Berkshire Swash, cursive' }}>
              I'm Manish Rathaur – A Web Developer & Machine Learning Enthusiast.
            </p>
            <p className="text-lg md:text-xl font-medium" style={{ color: '#3a2207', fontFamily: 'Berkshire Swash, cursive' }}>
              🎯 Turning ideas into reality with AI &amp; Code ✨
            </p>
          </div>
        </motion.div>
    </section>
  );
};

export default AboutSection;