export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export enum ThreatLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  SAFE = 'SAFE'
}

export interface Vulnerability {
  id: string;
  name: string;
  description: string;
  severity: ThreatLevel;
  remediation: string;
}

export interface SecurityReport {
  overallStatus: ThreatLevel;
  scanDate: string;
  scannedFilesCount: number;
  threatsDetected: number;
  vulnerabilities: Vulnerability[];
  summary: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}
