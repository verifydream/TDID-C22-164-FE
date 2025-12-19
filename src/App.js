import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Daily from './components/Daily';
import TodoList from './components/TodoList';
import Calendar from './components/Calendar';
import Recap from './components/Recap';
import About from './components/About';
import { requestNotificationPermission } from './services/notifications';
import './styles/main.css';

const App = () => {
  useEffect(() => {
    // Request notification permission on app load
    requestNotificationPermission();
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Daily />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/recap" element={<Recap />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
