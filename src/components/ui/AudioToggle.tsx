import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import useAudioStore from '../../store/audioStore';

const AudioToggle: React.FC = () => {
  const isMuted = useAudioStore((state) => state.isMuted);
  const toggleMute = useAudioStore((state) => state.toggleMute);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
      className="rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm focus:outline-none z-50"
      style={{
        background: 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isMuted ? 180 : 0,
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 0.5 }}
      >
        {isMuted ? (
          <VolumeX size={24} className="text-gray-300" />
        ) : (
          <Volume2 size={24} className="text-green-300" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default AudioToggle;