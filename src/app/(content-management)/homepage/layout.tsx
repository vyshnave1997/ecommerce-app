import { ReactNode } from 'react';

export default function CMSLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CMS Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Content Management System</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900">
                View Site
              </button>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}