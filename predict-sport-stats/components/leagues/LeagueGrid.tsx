import type { League } from '@/types';
import { LeagueCard } from './LeagueCard';

interface LeagueGridProps {
  leagues: League[];
}

export function LeagueGrid({ leagues }: LeagueGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {leagues.map((league) => (
        <LeagueCard key={league.id} league={league} />
      ))}
    </div>
  );
}
