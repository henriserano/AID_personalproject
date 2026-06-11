export function Footer() {
  return (
    <footer className="relative mt-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-2xl">⚽</span>
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Predict Sport
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Votre plateforme d'analyse et de prédiction des statistiques sportives en temps réel.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Technologies
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>Next.js 15 + React 19</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span>FastAPI + Python</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                <span>JWT Authentication</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Tailwind CSS 4</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Fonctionnalités
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>📊</span>
                <span>Statistiques en temps réel</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>⚽</span>
                <span>1000+ équipes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>🏆</span>
                <span>50+ ligues</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>🔐</span>
                <span>API Sécurisée</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2026 Predict Sport. Powered by <span className="font-semibold text-blue-600 dark:text-blue-400">DTS</span>
            </p>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium">
                🔐 Sécurisé
              </span>
              <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
                ⚡ Rapide
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium">
                ✨ Moderne
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
