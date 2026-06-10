import { getTeams } from '@/lib/api/teams';
import { TeamGrid } from '@/components/teams/TeamGrid';

export const metadata = {
  title: 'Équipes - Predict Sport',
  description: 'Liste complète des équipes de football',
};

export default async function TeamsPage() {
  const { data: teams, count } = await getTeams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Équipes de Football
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {count} équipes disponibles
          </p>
        </div>
      </div>

      <TeamGrid teams={teams} />
    </div>
  );
}
