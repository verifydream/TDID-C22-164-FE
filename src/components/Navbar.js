import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
      <div className="container-fluid" style={{ justifyContent: 'space-around' }}>
        <b>
          <Link className={`navbar-brand ${isActive('/') ? 'active' : ''}`} to="/">
            <i className="fas fa-calendar-day"></i>Daily
          </Link>
          <Link className={`navbar-brand ${isActive('/calendar') ? 'active' : ''}`} to="/calendar">
            <i className="fas fa-calendar-week"></i>Calendar
          </Link>
          <Link className={`navbar-brand ${isActive('/todo') ? 'active' : ''}`} to="/todo">
            <i className="fas fa-tasks"></i>Manage Todo
          </Link>
          <Link className={`navbar-brand ${isActive('/recap') ? 'active' : ''}`} to="/recap">
            <i className="far fa-copy"></i>Report
          </Link>
          <Link className={`navbar-brand ${isActive('/about') ? 'active' : ''}`} to="/about">
            <i className="fas fa-address-card"></i>About
          </Link>
        </b>
      </div>
      <div 
        id="mobile-menu" 
        className="container-fluid d-flex" 
        style={{ justifyContent: 'space-around' }}
      >
        <Link to="/">
          <i className="fas fa-calendar-day"></i>
        </Link>
        <Link to="/calendar">
          <i className="fas fa-calendar-week"></i>
        </Link>
        <Link to="/todo">
          <i className="fas fa-tasks"></i>
        </Link>
        <Link to="/recap">
          <i className="far fa-copy"></i>
        </Link>
        <Link to="/about">
          <i className="fas fa-address-card"></i>
        </Link>
      </div>
    </nav>
  );
};

export default memo(Navbar);
