import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pomodoro from '../Pomodoro';

describe('Pomodoro Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders Pomodoro timer correctly', () => {
    render(<Pomodoro />);

    expect(screen.getByText('Pomodoro Timer')).toBeInTheDocument();
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Focus Time! 🎯')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  test('starts and pauses the timer', () => {
    render(<Pomodoro />);

    const startButton = screen.getByText('Start');

    // Start timer
    fireEvent.click(startButton);
    expect(screen.getByText('Pause')).toBeInTheDocument();

    // Fast forward 1 second
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('24:59')).toBeInTheDocument();

    // Pause timer
    const pauseButton = screen.getByText('Pause');
    fireEvent.click(pauseButton);
    expect(screen.getByText('Start')).toBeInTheDocument();

    // Fast forward 1 second (should not change)
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('24:59')).toBeInTheDocument();
  });

  test('resets the timer', () => {
    render(<Pomodoro />);

    const startButton = screen.getByText('Start');
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(60000); // 1 minute
    });

    expect(screen.getByText('24:00')).toBeInTheDocument();

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  test('switches between work and break modes', () => {
    render(<Pomodoro />);

    const breakButton = screen.getByText('Break (5m)');
    fireEvent.click(breakButton);

    expect(screen.getByText('05:00')).toBeInTheDocument();
    expect(screen.getByText('Break Time! ☕')).toBeInTheDocument();

    const workButton = screen.getByText('Work (25m)');
    fireEvent.click(workButton);

    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('Focus Time! 🎯')).toBeInTheDocument();
  });
});
