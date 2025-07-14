import { useState, useEffect } from 'react';
import { analytics } from './utils/analytics';

interface StatusBarProps {
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ className = "" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState(analytics.getVisitorStats());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setStats(analytics.getVisitorStats());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getUptime = () => {
    const start = performance.timeOrigin;
    const now = Date.now();
    const uptimeMs = now - start;
    const uptimeSeconds = Math.floor(uptimeMs / 1000);
    const hours = Math.floor(uptimeSeconds / 3600);
    const minutes = Math.floor((uptimeSeconds % 3600) / 60);
    const seconds = uptimeSeconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className={`bg-gray-900 border-t border-gray-700 px-4 py-2 text-xs font-mono ${className}`}>
      <div className="flex justify-between items-center text-gray-400">
        {/* Left side - System info */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Online</span>
          </span>
          <span>Uptime: {getUptime()}</span>
          <span>Visitors: {stats.totalVisits}</span>
        </div>

        {/* Right side - Time and date */}
        <div className="flex items-center space-x-4">
          <span>{currentTime.toLocaleDateString()}</span>
          <span className="text-green-400">{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
