import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <span className="text-2xl">⚽</span>
            </div>
            <div className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Predict Sport
            </div>
          </Link>

          <nav className="flex items-center space-x-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/teams"
              className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium"
            >
              ⚽ Équipes
            </Link>
            <Link
              href="/leagues"
              className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-200 font-medium"
            >
              🏆 Ligues
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
