import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/ui/Header';
import LoadingScreen from './components/ui/LoadingScreen';
import ThemeToggle from './components/ui/ThemeToggle';
import AudioToggle from './components/ui/AudioToggle';
import AudioController from './components/audio/AudioController';
import BambooSidebar from './components/ui/BambooSidebar';
import { useThemeStore } from './store/themeStore';
import { useLoadingManager } from './hooks/useLoadingManager';
import { BirdCursor } from './components/features/BirdCursor';
import CursorEffects from './components/effects/CursorEffects';
import HomeSection from './components/sections/HomeSection';
import ProjectsSection from './components/sections/ProjectsSection';

// Placeholder components for routes
const ExperiencesPage = () => <div style={{color: '#222', fontSize: '2rem', textAlign: 'center', marginTop: '4rem'}}>Experiences Page</div>;

function App() {
  const { theme } = useThemeStore();
  const { isLoading, overallProgress, loadingState } = useLoadingManager();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // setShowBranch(window.scrollY === 0); // This line was removed
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <div className={`relative min-h-screen w-full ${theme}`}>
        <CursorEffects />
        <BambooSidebar />
        <LoadingScreen 
          isLoading={isLoading} 
          progress={overallProgress} 
          loadingState={loadingState} 
        />

        <div className="relative z-10 isolate">
        {isHome && <Header />}
          <div className="fixed top-4 right-4 z-50 flex gap-2">
            <AudioToggle />
            <ThemeToggle />
          </div>
          <AudioController />
          <BirdCursor />
          {/* Main Content */}
          <main className="relative w-full">
            <Routes>
              <Route path="/" element={<HomeSection />} />
              <Route path="/projects" element={<ProjectsSection />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
            </Routes>
          </main>
        </div>
      </div>
  );
}

export default App;