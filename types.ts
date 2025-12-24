
export enum TournamentStatus {
  UPCOMING = 'UPCOMING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}

export enum MapType {
  BERMUDA = 'Bermuda',
  PURGATORY = 'Purgatory',
  KALAHARI = 'Kalahari',
  ALPINE = 'Alpine',
  NEXETERRA = 'Nexeterra'
}

export interface User {
  id: string;
  username: string;
  email: string;
  ffUid: string;
  balance: number;
  role: 'player' | 'admin';
  avatar?: string;
  points?: number;
  matchesPlayed?: number;
  totalKills?: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  level: number;
  rank: string;
  kills: number;
  wins: number;
  points: number;
}

export interface Tournament {
  id: string;
  title: string;
  description: string;
  status: TournamentStatus;
  prizePool: string;
  entryFee: string;
  maxTeams: number;
  registeredTeams: number;
  map: MapType;
  startDate: string;
  organizer: string;
  banner: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'entry' | 'win';
  status: 'pending' | 'success' | 'failed';
  date: Date;
  user?: string;
}

export interface AdminSettings {
  upiId: string;
  qrCodeUrl: string;
  announcement: string;
  isMaintenance: boolean;
}
