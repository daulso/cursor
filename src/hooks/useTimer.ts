import { useState, useEffect, useCallback } from 'react';
import { TimerState, TimerMode, TIMER_DURATIONS, POMODOROS_BEFORE_LONG_BREAK } from '../types/timer';

export const useTimer = () => {
  const [timerState, setTimerState] = useState<TimerState>({
    mode: 'work',
    timeLeft: TIMER_DURATIONS.work,
    isRunning: false,
    completedPomodoros: 0,
  });

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerState.isRunning && timerState.timeLeft > 0) {
      interval = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (timerState.timeLeft === 0) {
      // Timer completed
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.timeLeft]);

  const handleTimerComplete = useCallback(() => {
    setTimerState(prev => {
      let newMode: TimerMode;
      let newCompletedPomodoros = prev.completedPomodoros;

      if (prev.mode === 'work') {
        newCompletedPomodoros += 1;
        // After 4 pomodoros, take a long break
        if (newCompletedPomodoros % POMODOROS_BEFORE_LONG_BREAK === 0) {
          newMode = 'longBreak';
        } else {
          newMode = 'shortBreak';
        }
      } else {
        // After any break, go back to work
        newMode = 'work';
      }

      return {
        mode: newMode,
        timeLeft: TIMER_DURATIONS[newMode],
        isRunning: false,
        completedPomodoros: newCompletedPomodoros,
      };
    });

    // Play notification sound
    playNotificationSound();
  }, []);

  const startTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: true }));
  }, []);

  const pauseTimer = useCallback(() => {
    setTimerState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const skipTimer = useCallback(() => {
    handleTimerComplete();
  }, [handleTimerComplete]);

  const resetTimer = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      timeLeft: TIMER_DURATIONS[prev.mode],
      isRunning: false,
    }));
  }, []);

  const switchMode = useCallback((mode: TimerMode) => {
    setTimerState(prev => ({
      ...prev,
      mode,
      timeLeft: TIMER_DURATIONS[mode],
      isRunning: false,
    }));
  }, []);

  const playNotificationSound = useCallback(() => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    ...timerState,
    startTimer,
    pauseTimer,
    skipTimer,
    resetTimer,
    switchMode,
    formatTime,
  };
};

