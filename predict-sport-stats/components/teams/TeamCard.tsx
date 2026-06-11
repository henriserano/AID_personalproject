import Image from 'next/image';
import type { Team } from '@/types';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        {/* Header with logo */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-xl bg-gray-50 dark:bg-gray-900 p-2 group-hover:scale-110 transition-transform duration-300">
            <Image
              src={team.crest}
              alt={team.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {team.name}
            </h3>
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
              {team.tla}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="text-lg">📅</span>
              Fondé
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">{team.founded}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="text-lg">🎨</span>
              Couleurs
            </span>
            <span className="font-semibold text-gray-900 dark:text-white truncate ml-2">{team.clubColors}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <span className="text-lg">🏟️</span>
              Stade
            </span>
            <span className="font-semibold text-gray-900 dark:text-white truncate ml-2 max-w-[150px]" title={team.venue}>
              {team.venue}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href={team.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group/link"
          >
            <span>Site officiel</span>
            <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
