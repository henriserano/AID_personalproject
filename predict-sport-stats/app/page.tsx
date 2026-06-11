import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>

        <div className="relative z-10 text-center space-y-6 max-w-5xl mx-auto">
          <div className="float">
            <span className="inline-block text-6xl mb-4">⚽</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
            Predict Sport Stats
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Analysez et visualisez les statistiques des équipes et ligues de football en temps réel
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <div className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              📊 Statistiques en temps réel
            </div>
            <div className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium">
              🔐 API Sécurisée
            </div>
            <div className="px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm font-medium">
              ⚡ Performance optimale
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Link href="/teams" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-8 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl shimmer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                    ⚽
                  </div>
                  <span className="text-white/60 group-hover:text-white transition-colors text-4xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-3">
                  Équipes
                </h3>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Explorez les équipes de football avec leurs statistiques détaillées, historiques et performances
                </p>
              </div>
            </div>
          </Link>

          <Link href="/leagues" className="group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 p-8 h-full transform transition-all duration-500 hover:scale-105 hover:shadow-2xl shimmer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                    🏆
                  </div>
                  <span className="text-white/60 group-hover:text-white transition-colors text-4xl transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>

                <h3 className="text-3xl font-bold text-white mb-3">
                  Ligues
                </h3>
                <p className="text-purple-100 text-lg leading-relaxed">
                  Découvrez les ligues et compétitions du monde entier avec toutes leurs données
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">1000+</div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">Équipes</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <div className="text-4xl font-black text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">Ligues</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900">
              <div className="text-4xl font-black text-cyan-600 dark:text-cyan-400 mb-2">24/7</div>
              <div className="text-gray-700 dark:text-gray-300 font-medium">Mise à jour</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
