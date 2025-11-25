import { useState, useEffect } from 'react';

export interface SecurityAlert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical' | 'success';
  timestamp: Date;
}

export const useRealtimeAlerts = () => {
  const [alert, setAlert] = useState<SecurityAlert | null>(null);

  useEffect(() => {
    // Simulate a random background event occurring after a delay
    const initialDelay = 4000; // 4 seconds after dashboard load

    const timer = setTimeout(() => {
      setAlert({
        id: `alert-${Date.now()}`,
        title: 'Threat Neutralized',
        message: 'MobSafe background shield blocked an unauthorized connection attempt from "WeatherWidget.apk".',
        severity: 'success', // Green/Success because the system worked
        timestamp: new Date()
      });
    }, initialDelay);

    return () => clearTimeout(timer);
  }, []);

  const dismissAlert = () => {
    setAlert(null);
  };

  return { alert, dismissAlert };
};