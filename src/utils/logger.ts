// Logger utility for tracking form submissions and debugging

export interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'form_submit' | 'email_sent' | 'email_error' | 'info';
  data: any;
  status: 'success' | 'error' | 'pending' | 'info';
  message?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 50; // Keep last 50 logs
  private listeners: ((logs: LogEntry[]) => void)[] = [];

  constructor() {
    // Load logs from localStorage on initialization
    this.loadFromStorage();
  }

  // Subscribe to log updates
  subscribe(callback: (logs: LogEntry[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  // Notify all listeners
  private notify() {
    this.listeners.forEach(callback => callback([...this.logs]));
    this.saveToStorage();
  }

  // Save logs to localStorage
  private saveToStorage() {
    try {
      const logsToSave = this.logs.map(log => ({
        ...log,
        timestamp: log.timestamp.toISOString(),
      }));
      localStorage.setItem('portfolio_logs', JSON.stringify(logsToSave));
    } catch (error) {
      console.error('Failed to save logs to localStorage:', error);
    }
  }

  // Load logs from localStorage
  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('portfolio_logs');
      if (stored) {
        const parsedLogs = JSON.parse(stored).map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp),
        }));
        this.logs = parsedLogs.slice(-this.maxLogs); // Keep only last 50
      }
    } catch (error) {
      console.error('Failed to load logs from localStorage:', error);
    }
  }

  // Add a log entry
  log(type: LogEntry['type'], data: any, status: LogEntry['status'] = 'info', message?: string) {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type,
      data,
      status,
      message,
    };

    this.logs.unshift(entry); // Add to beginning
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs); // Keep only last 50
    }

    this.notify();
    console.log('[Logger]', entry);
  }

  // Get all logs
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Clear all logs
  clear() {
    this.logs = [];
    localStorage.removeItem('portfolio_logs');
    this.notify();
  }

  // Get logs by type
  getLogsByType(type: LogEntry['type']): LogEntry[] {
    return this.logs.filter(log => log.type === type);
  }

  // Get recent logs
  getRecentLogs(count: number = 10): LogEntry[] {
    return this.logs.slice(0, count);
  }
}

// Export singleton instance
export const logger = new Logger();
