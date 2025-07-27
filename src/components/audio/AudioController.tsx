import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import useAudioStore from '../../store/audioStore';

const AudioController: React.FC = () => {
  const isMuted = useAudioStore((state) => state.isMuted);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Only create the sound if it doesn't exist
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: ['/jungle.mp3'],
        loop: true,
        volume: 0.3,
        html5: true,
        preload: true, // Ensure audio is preloaded
      });
    }

    // Handle play/pause based on mute state
    if (isMuted) {
      soundRef.current.pause();
    } else {
      // Only play if not already playing
      if (!soundRef.current.playing()) {
        soundRef.current.play();
      }
    }

    return () => {
      // Don't unload on cleanup to preserve the loaded audio
      // Only unload when component is actually unmounting
    };
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
        soundRef.current = null;
      }
    };
  }, []);

  return null;
};

export default AudioController;
