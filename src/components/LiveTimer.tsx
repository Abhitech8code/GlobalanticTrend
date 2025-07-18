
import React, { useState, useEffect } from 'react';

interface LiveTimerProps {
  className?: string;
  showDate?: boolean;
}

const LiveTimer = ({ className = '', showDate = false }: LiveTimerProps) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`font-roboto-mono ${className}`}>
      {showDate && (
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          {formatDate(time)}
        </div>
      )}
      <div className="text-lg font-bold">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default LiveTimer;
