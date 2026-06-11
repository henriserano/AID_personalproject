import Image from 'next/image';
import type { League } from '@/types';

interface LeagueCardProps {
  league: League;
}

export function LeagueCard({ league }: LeagueCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'league':
        return 'from-blue-500 to-blue-600';
      case 'cup':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-cyan-500 to-cyan-600';
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'league':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'cup':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300';
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Gradient top bar */}
      <div className={`h-2 bg-gradient-to-r ${getTypeColor(league.type)}`}></div>

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        {/* Header with logo */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Image
              src={league.logo}
              alt={league.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight">
              {league.name}
            </h3>
            <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getTypeBadgeColor(league.type)} capitalize`}>
              {league.type}
            </span>
          </div>
        </div>

        {/* Footer with ID */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
            ID: {league.id}
          </span>
          <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
            🏆
          </span>
        </div>
      </div>
    </div>
  );
}
