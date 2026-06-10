// Carte d'équipe

import Image from 'next/image';
import type { Team } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={team.crest}
              alt={team.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1">
            <CardTitle>{team.name}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {team.tla}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Fondé:</span>
            <span className="font-medium">{team.founded}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Couleurs:</span>
            <span className="font-medium">{team.clubColors}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Stade:</span>
            <span className="font-medium truncate ml-2">{team.venue}</span>
          </div>

          <div className="pt-2 mt-2 border-t border-gray-200 dark:border-gray-700">
            <a
              href={team.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline text-xs"
            >
              Site officiel →
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
