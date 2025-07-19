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
    <div className={`border-t px-4 py-2 text-xs font-mono ${className}`}
         style={{ 
           backgroundColor: 'var(--theme-background)', 
           borderColor: 'var(--theme-border)' 
         }}>
      <div className="flex justify-between items-center" style={{ color: 'var(--theme-muted)' }}>
        {/* Left side - System info */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }}></span>
            <span>Online</span>
          </span>
          <span>Uptime: {getUptime()}</span>
          <span>Visitors: {stats.totalVisits}</span>
        </div>

        {/* Right side - Time and date */}
        <div className="flex items-center space-x-4">
          <span>{currentTime.toLocaleDateString()}</span>
          <span style={{ color: 'var(--theme-primary)' }}>{formatTime(currentTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
