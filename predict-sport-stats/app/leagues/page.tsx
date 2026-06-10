import { getLeagues } from '@/lib/api/leagues';
import { LeagueGrid } from '@/components/leagues/LeagueGrid';

export const metadata = {
  title: 'Ligues - Predict Sport',
  description: 'Liste complète des ligues de football',
};

export default async function LeaguesPage() {
  const { data: leagues, count } = await getLeagues();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Ligues de Football
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {count} ligues disponibles
          </p>
        </div>
      </div>

      <LeagueGrid leagues={leagues} />
    </div>
  );
}
