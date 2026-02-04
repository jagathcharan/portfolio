import { useState, useEffect } from 'react';
import { X, Trash2, FileText, Mail, AlertCircle, CheckCircle, Info, Eye, EyeOff } from 'lucide-react';
import { logger, LogEntry } from '../utils/logger';

export default function LoggerPanel() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  useEffect(() => {
    // Load initial logs
    setLogs(logger.getLogs());

    // Subscribe to log updates
    const unsubscribe = logger.subscribe((newLogs) => {
      setLogs(newLogs);
    });

    return unsubscribe;
  }, []);

  const getStatusIcon = (status: LogEntry['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={14} className="text-green-400" />;
      case 'error':
        return <AlertCircle size={14} className="text-red-400" />;
      case 'pending':
        return <Info size={14} className="text-yellow-400" />;
      default:
        return <Info size={14} className="text-blue-400" />;
    }
  };

  const getTypeIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'form_submit':
        return <FileText size={14} className="text-ai-primary" />;
      case 'email_sent':
        return <Mail size={14} className="text-green-400" />;
      case 'email_error':
        return <AlertCircle size={14} className="text-red-400" />;
      default:
        return <Info size={14} className="text-ai-secondary" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const clearLogs = () => {
    if (confirm('Clear all logs?')) {
      logger.clear();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-6 z-40 bg-slate-800 text-white p-3 rounded-full shadow-2xl border border-ai-primary/30 hover:border-ai-primary transition-all duration-300 hover:scale-110 group"
        aria-label="Open Logger"
        title="View Form Submission Logs"
      >
        <FileText size={20} className="group-hover:scale-110 transition-transform" />
        {logs.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-ai-primary rounded-full flex items-center justify-center text-xs font-bold">
            {logs.length > 9 ? '9+' : logs.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-96 max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-ai-primary/30 flex flex-col overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-ai-primary to-ai-secondary p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-white" />
          <h3 className="text-white font-semibold text-sm">Form Submission Logs</h3>
          {logs.length > 0 && (
            <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
              {logs.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            {isMinimized ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
          <button
            onClick={clearLogs}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            title="Clear Logs"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Logs List */}
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto p-3 bg-slate-950 space-y-2 max-h-[400px]">
          {logs.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              <FileText size={32} className="mx-auto mb-2 opacity-50" />
              <p>No logs yet</p>
              <p className="text-xs mt-1">Form submissions will appear here</p>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-800/80 rounded-lg p-3 border border-slate-700 hover:border-ai-primary/50 transition-all duration-200"
              >
                <div className="flex items-start gap-2 mb-2">
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {getStatusIcon(log.status)}
                    {getTypeIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white capitalize">
                        {log.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                    {log.message && (
                      <p className="text-xs text-slate-300 mb-2">{log.message}</p>
                    )}
                  </div>
                </div>

                {/* Log Data */}
                <details className="mt-2">
                  <summary className="text-xs text-ai-primary cursor-pointer hover:text-ai-secondary transition-colors">
                    View Data
                  </summary>
                  <pre className="mt-2 p-2 bg-slate-900 rounded text-xs text-slate-300 overflow-x-auto max-h-40 overflow-y-auto">
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </details>
              </div>
            ))
          )}
        </div>
      )}

      {/* Footer Info */}
      {!isMinimized && (
        <div className="p-2 bg-slate-800 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            Logs are stored locally in your browser
          </p>
        </div>
      )}
    </div>
  );
}
