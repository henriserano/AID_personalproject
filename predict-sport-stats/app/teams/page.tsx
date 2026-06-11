import { getTeams } from '@/lib/api/teams';
import { TeamGrid } from '@/components/teams/TeamGrid';

export const metadata = {
  title: 'Équipes - Predict Sport',
  description: 'Liste complète des équipes de football',
};

export default async function TeamsPage() {
  const { data: teams, count } = await getTeams();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl">
              ⚽
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                Équipes de Football
              </h1>
              <p className="text-blue-100 text-lg">
                Découvrez {count} équipes avec leurs statistiques complètes
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
              📊 Statistiques détaillées
            </div>
            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
              🏟️ Informations stade
            </div>
            <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
              🎨 Couleurs & logos
            </div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <TeamGrid teams={teams} />
    </div>
  );
}
