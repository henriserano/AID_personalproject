import Image from 'next/image';
import type { League } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface LeagueCardProps {
  league: League;
}

export function LeagueCard({ league }: LeagueCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <Image
              src={league.logo}
              alt={league.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{league.name}</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {league.type}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ID: {league.id}
          </span>
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
            {league.type}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
