import React from 'react';
import './App.css';
import { ErrorFallback, Loading } from './pages';
import { ErrorBoundary } from 'react-error-boundary';
import AppRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

export const App: React.FC<Record<string, never>> = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <AppRoutes />
        </Router>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default App;
