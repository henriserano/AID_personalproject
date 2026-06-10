import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Predict Sport Stats
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Analysez et visualisez les statistiques des équipes et ligues de football
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link href="/teams">
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>⚽ Équipes</CardTitle>
                <span className="text-3xl">→</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Explorez les équipes de football avec leurs statistiques détaillées
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/leagues">
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>🏆 Ligues</CardTitle>
                <span className="text-3xl">→</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Découvrez les ligues et compétitions du monde entier
              </p>
            </CardContent>
          </Card>
        </Link>
      </section>
    </div>
  );
}
