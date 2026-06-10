// Footer de l'application

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2026 Predict Sport. Powered by DTS.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>🔐 JWT Auth</span>
            <span>⚡ Next.js 16</span>
            <span>🐍 FastAPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
