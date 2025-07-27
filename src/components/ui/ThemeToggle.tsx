import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      ref={buttonRef}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="rounded-full w-12 h-12 flex items-center justify-center bg-opacity-80 backdrop-blur-sm focus:outline-none z-50"
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, #1A202C 0%, #2D3748 100%)' 
          : 'linear-gradient(135deg, #FEF9C3 0%, #FDE68A 100%)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 180 : 0,
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <Moon size={24} className="text-yellow-200" />
        ) : (
          <Sun size={24} className="text-yellow-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;