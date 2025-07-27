import { useState, useEffect } from 'react';
import { Howl } from 'howler';

interface LoadingState {
  audio: boolean;
  models: boolean;
  textures: boolean;
  fonts: boolean;
}

export const useLoadingManager = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    audio: true,
    models: true,
    textures: true,
    fonts: true
  });
  const [overallProgress, setOverallProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Calculate overall progress
  useEffect(() => {
    const totalItems = Object.keys(loadingState).length;
    const loadedItems = Object.values(loadingState).filter(loaded => !loaded).length;
    const progress = ((totalItems - loadedItems) / totalItems) * 100;
    setOverallProgress(progress);

    if (progress >= 100) {
      setTimeout(() => setIsLoading(false), 800); // Small delay for smooth transition
    }
  }, [loadingState]);

  // Load audio
  useEffect(() => {
    const loadAudio = () => {
      new Howl({
        src: ['/jungle.mp3'],
        loop: true,
        volume: 0.3,
        html5: true,
        onload: () => {
          setLoadingState(prev => ({ ...prev, audio: false }));
        },
        onloaderror: () => {
          console.warn('Failed to load audio, continuing without it');
          setLoadingState(prev => ({ ...prev, audio: false }));
        }
      });
    };

    loadAudio();
  }, []);

  // Load fonts
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await document.fonts.ready;
        setLoadingState(prev => ({ ...prev, fonts: false }));
      } catch {
        console.warn('Font loading failed, continuing with fallbacks');
        setLoadingState(prev => ({ ...prev, fonts: false }));
      }
    };

    loadFonts();
  }, []);

  // Simulate model and texture loading (replace with actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState(prev => ({ ...prev, models: false, textures: false }));
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    overallProgress,
    loadingState
  };
}; 