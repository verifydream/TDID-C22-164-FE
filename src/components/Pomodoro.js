import React, { useState, useEffect } from 'react';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else {
            if (prev.minutes > 0) {
              return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
            } else {
              // Timer finished, stay at 0
              return prev;
            }
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0 && isActive) {
      setIsActive(false);
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft({ minutes: 5, seconds: 0 });
      } else {
        setIsBreak(false);
        setTimeLeft({ minutes: 25, seconds: 0 });
      }
    }
  }, [timeLeft, isActive, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft({ minutes: 25, seconds: 0 });
    setIsBreak(false);
  };

  const setWorkMode = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft({ minutes: 25, seconds: 0 });
  };

  const setBreakMode = () => {
    setIsActive(false);
    setIsBreak(true);
    setTimeLeft({ minutes: 5, seconds: 0 });
  };

  return (
    <div className="container mt-5">
      <div className="card text-center shadow">
        <div className="card-header bg-primary text-white">
          <h2><i className="fas fa-stopwatch me-2"></i>Pomodoro Timer</h2>
        </div>
        <div className="card-body">
          <h3 className="card-title mb-4">
            {isBreak ? "Break Time! ☕" : "Focus Time! 🎯"}
          </h3>

          <div className="display-1 mb-4 fw-bold">
            {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
          </div>

          <div className="d-flex justify-content-center gap-2 mb-4">
            <button
              className={`btn ${isActive ? 'btn-warning' : 'btn-success'} btn-lg`}
              onClick={toggleTimer}
            >
              {isActive ? <><i className="fas fa-pause me-2"></i>Pause</> : <><i className="fas fa-play me-2"></i>Start</>}
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={resetTimer}
            >
              <i className="fas fa-redo me-2"></i>Reset
            </button>
          </div>

          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${!isBreak ? 'btn-primary active' : 'btn-outline-primary'}`}
              onClick={setWorkMode}
            >
              Work (25m)
            </button>
            <button
              type="button"
              className={`btn ${isBreak ? 'btn-success active' : 'btn-outline-success'}`}
              onClick={setBreakMode}
            >
              Break (5m)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
