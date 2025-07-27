import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Music, Package, FileText, Image } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  progress: number;
  loadingState: {
    audio: boolean;
    models: boolean;
    textures: boolean;
    fonts: boolean;
  };
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading, 
  progress, 
  loadingState 
}) => {
  const loadingItems = [
    { key: 'audio', label: 'Loading Jungle Sounds', icon: Music, loading: loadingState.audio },
    { key: 'models', label: 'Preparing 3D Models', icon: Package, loading: loadingState.models },
    { key: 'textures', label: 'Loading Textures', icon: Image, loading: loadingState.textures },
    { key: 'fonts', label: 'Loading Fonts', icon: FileText, loading: loadingState.fonts }
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 bg-gradient-to-br from-green-900/95 via-green-800/95 to-green-900/95 backdrop-blur-sm flex flex-col justify-center items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-10 -left-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300/20 rounded-full blur-xl"
              animate={{
                x: [0, -80, 0],
                y: [0, -60, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center relative z-10"
          >
            {/* Main Logo */}
            <motion.div
              animate={{ 
                rotate: [0, 15, 0, -15, 0],
                y: [0, -15, 0, -10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <Leaf size={80} className="text-green-300 drop-shadow-lg" />
                <motion.div
                  className="absolute inset-0 bg-green-300 rounded-full blur-md opacity-50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              className="text-6xl text-white mb-8 font-caveat drop-shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Entering the Jungle...
            </motion.h1>
            
            {/* Loading Items */}
            <div className="mb-8 space-y-3">
              {loadingItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  className="flex items-center justify-center space-x-3 text-green-200"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    animate={item.loading ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: item.loading ? Infinity : 0 }}
                  >
                    <item.icon size={20} className={item.loading ? "text-green-400" : "text-green-500"} />
                  </motion.div>
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                  {!item.loading && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="w-80 h-3 bg-green-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-green-700/30">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 via-green-300 to-green-500 relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            
            {/* Progress Text */}
            <motion.p 
              className="mt-4 text-green-200 font-medium"
              key={progress}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {Math.round(progress)}% Complete
            </motion.p>

            {/* Loading Tips */}
            <motion.div
              className="mt-8 text-green-300/70 text-sm max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <p>🌿 Prepare to explore a magical jungle experience</p>
              <p className="mt-1">🎵 Don't forget to enable audio for the full atmosphere</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;