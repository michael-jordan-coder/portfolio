'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface NextProjectButtonProps {
  nextProjectPath: string;
  nextProjectTitle: string;
  nextProjectDescription?: string;
  className?: string;
}

export default function NextProjectButton({
  nextProjectPath,
  nextProjectTitle,
  nextProjectDescription,
  className = '',
}: NextProjectButtonProps) {
  const isDarkTheme = className.includes('bg-black');
  
  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        <div className={`rounded-2xl p-8 border shadow-sm ${
          isDarkTheme 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
        }`}>
          <div className="mb-6">
            <span className={`inline-block text-sm px-4 py-2 rounded-full font-medium ${
              isDarkTheme 
                ? 'bg-blue-900/30 text-blue-300' 
                : 'bg-blue-100 text-blue-700'
            }`}>
              Next Project
            </span>
          </div>
          
          <h3 className={`text-2xl md:text-3xl font-semibold mb-4 ${
            isDarkTheme ? 'text-white' : 'text-gray-900'
          }`}>
            {nextProjectTitle}
          </h3>
          
          {nextProjectDescription && (
            <p className={`text-lg mb-8 max-w-2xl mx-auto ${
              isDarkTheme ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {nextProjectDescription}
            </p>
          )}
          
          <Link
            href={nextProjectPath}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold focus:outline-none transition-all duration-200 shadow-lg hover:shadow-xl ${
              isDarkTheme
                ? 'bg-white text-black hover:bg-gray-100 focus:ring-2 focus:ring-white/50'
                : 'bg-gray-900 text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-900/50'
            }`}
          >
            <span>Explore Project</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
} 