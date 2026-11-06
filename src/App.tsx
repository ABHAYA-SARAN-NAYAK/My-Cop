import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { startSimulationEngine, stopSimulationEngine } from './sim/engine';
import { useUIStore } from './store/useUIStore';
import { Toaster } from 'sonner';

export const App: React.FC = () => {
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    // Start simulation engine
    startSimulationEngine();

    // Sync theme class to document body
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    return () => {
      stopSimulationEngine();
    };
  }, [theme]);

  return (
    <BrowserRouter>
      <Toaster
        theme={theme === 'dark' ? 'dark' : 'light'}
        position="top-right"
        richColors
        closeButton
      />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
