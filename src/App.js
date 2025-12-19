import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { requestNotificationPermission } from './services/notifications';
import './styles/main.css';

// Lazy load components for better performance
const Daily = lazy(() => import('./components/Daily'));
const TodoList = lazy(() => import('./components/TodoList'));
const Calendar = lazy(() => import('./components/Calendar'));
const Recap = lazy(() => import('./components/Recap'));
const About = lazy(() => import('./components/About'));
const Pomodoro = lazy(() => import('./components/Pomodoro'));

// Loading component
const LoadingSpinner = () => (
  <div className="text-center py-5">
    <div className="spinner-border" role="status" style={{ color: '#8ec3b0' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    // Request notification permission on app load
    requestNotificationPermission();
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Navbar />
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Daily />} />
              <Route path="/todo" element={<TodoList />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/recap" element={<Recap />} />
              <Route path="/pomodoro" element={<Pomodoro />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
