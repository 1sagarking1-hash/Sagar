
import { Tournament, TournamentStatus, MapType } from './types';

export const INITIAL_TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    title: 'Elite Pro League S1',
    description: 'The biggest regional tournament for professional Free Fire teams.',
    status: TournamentStatus.ONGOING,
    prizePool: '₹50,000',
    entryFee: '₹500',
    maxTeams: 48,
    registeredTeams: 48,
    map: MapType.BERMUDA,
    startDate: '2024-05-20',
    organizer: 'Garena Official',
    banner: 'https://picsum.photos/seed/ff1/800/400'
  },
  {
    id: '2',
    title: 'Kalahari King Duo Cup',
    description: 'Fast-paced duo action in the desert of Kalahari.',
    status: TournamentStatus.UPCOMING,
    prizePool: '₹10,000',
    entryFee: 'Free',
    maxTeams: 32,
    registeredTeams: 12,
    map: MapType.KALAHARI,
    startDate: '2024-05-25',
    organizer: 'Community Hub',
    banner: 'https://picsum.photos/seed/ff2/800/400'
  },
  {
    id: '3',
    title: 'Midnight Sniper Scrims',
    description: 'Sharpen your skills with AWM and M82B in this sniper-only tournament.',
    status: TournamentStatus.UPCOMING,
    prizePool: '₹5,000',
    entryFee: '₹100',
    maxTeams: 24,
    registeredTeams: 8,
    map: MapType.PURGATORY,
    startDate: '2024-05-22',
    organizer: 'Deadshot Gaming',
    banner: 'https://picsum.photos/seed/ff3/800/400'
  }
];

export const MAP_IMAGES: Record<MapType, string> = {
  [MapType.BERMUDA]: 'https://picsum.photos/seed/bermuda/300/200',
  [MapType.PURGATORY]: 'https://picsum.photos/seed/purgatory/300/200',
  [MapType.KALAHARI]: 'https://picsum.photos/seed/kalahari/300/200',
  [MapType.ALPINE]: 'https://picsum.photos/seed/alpine/300/200',
  [MapType.NEXETERRA]: 'https://picsum.photos/seed/nexeterra/300/200',
};
