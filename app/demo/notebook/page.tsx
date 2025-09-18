'use client';

import { useState } from 'react';

export default function NotebookDemo() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 5;

  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6">
            Notebook Demo
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A realistic notebook design with spiral binding, margin lines, and grid paper.
            Perfect for showcasing sketches, wireframes, and design concepts.
          </p>
        </div>

        {/* Notebook Container */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-300">
            
            {/* Notebook Paper Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30" />
            
            {/* Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-40" 
              style={{
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px'
              }} 
            />
            
            {/* Red Margin Line */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-red-300/70" />
            
            {/* Top Margin Line */}
            <div className="absolute left-0 right-0 top-20 h-0.5 bg-red-300/70" />
            
            {/* Spiral Binding Holes */}
            <div className="absolute left-8 top-0 bottom-0 flex flex-col justify-evenly py-8">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-inner border border-gray-300" 
                />
              ))}
            </div>

            {/* Page Content Area */}
            <div className="relative p-24 pl-24 min-h-[700px]">
              
              {/* Page Number */}
              <div className="absolute top-6 right-8 text-sm text-gray-400 font-mono">
                Page {currentPage + 1} of {totalPages}
              </div>

              {/* Content based on current page */}
              {currentPage === 0 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'cursive' }}>
                      My Design Notebook
                    </h2>
                    <p className="text-gray-600 italic">Ideas, sketches, and creative explorations</p>
                  </div>
                  
                  <div className="mt-16 space-y-6">
                    <div className="h-1 bg-gray-300 w-3/4"></div>
                    <div className="h-1 bg-gray-300 w-2/3"></div>
                    <div className="h-1 bg-gray-300 w-4/5"></div>
                    <div className="h-1 bg-gray-300 w-1/2"></div>
                  </div>
                </div>
              )}

              {currentPage === 1 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-8" style={{ fontFamily: 'cursive' }}>
                    Wireframe Sketches
                  </h3>
                  
                  {/* Mock wireframe boxes */}
                  <div className="grid grid-cols-2 gap-8">
                    <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg h-48">
                      <div className="h-4 bg-gray-300 w-3/4 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 w-full"></div>
                        <div className="h-2 bg-gray-200 w-2/3"></div>
                        <div className="h-2 bg-gray-200 w-4/5"></div>
                      </div>
                      <div className="mt-4 h-16 bg-gray-100 rounded"></div>
                    </div>
                    
                    <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg h-48">
                      <div className="h-4 bg-gray-300 w-2/3 mb-4"></div>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="h-8 bg-gray-200 rounded"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                        <div className="h-8 bg-gray-200 rounded"></div>
                      </div>
                      <div className="h-20 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-8" style={{ fontFamily: 'cursive' }}>
                    User Flow Diagrams
                  </h3>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-20 h-12 bg-blue-200 rounded-lg flex items-center justify-center text-sm">Start</div>
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <div className="w-20 h-12 bg-yellow-200 rounded-lg flex items-center justify-center text-sm">Process</div>
                    <div className="w-8 h-0.5 bg-gray-400"></div>
                    <div className="w-20 h-12 bg-green-200 rounded-lg flex items-center justify-center text-sm">End</div>
                  </div>
                  
                  <div className="mt-12 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                      <div className="h-1 bg-gray-300 flex-1"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                      <div className="h-1 bg-gray-300 flex-1"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 rounded-full bg-green-400"></div>
                      <div className="h-1 bg-gray-300 flex-1"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 3 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-8" style={{ fontFamily: 'cursive' }}>
                    Component Ideas
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="border border-gray-300 rounded-lg p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
                        <div className="h-3 bg-gray-300 w-32"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 w-full"></div>
                        <div className="h-2 bg-gray-200 w-3/4"></div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <div className="h-6 w-16 bg-blue-200 rounded"></div>
                        <div className="h-6 w-16 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-300 rounded-lg p-6">
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <div className="h-12 bg-red-200 rounded"></div>
                        <div className="h-12 bg-green-200 rounded"></div>
                        <div className="h-12 bg-blue-200 rounded"></div>
                        <div className="h-12 bg-yellow-200 rounded"></div>
                      </div>
                      <div className="h-2 bg-gray-300 w-2/3"></div>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 4 && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-8" style={{ fontFamily: 'cursive' }}>
                    Notes & Ideas
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2 bg-gray-300 w-full"></div>
                        <div className="h-2 bg-gray-300 w-4/5"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2 bg-gray-300 w-3/4"></div>
                        <div className="h-2 bg-gray-300 w-full"></div>
                        <div className="h-2 bg-gray-300 w-2/3"></div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-2 bg-gray-300 w-5/6"></div>
                        <div className="h-2 bg-gray-300 w-1/2"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 p-4 border-2 border-dashed border-yellow-400 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800 font-medium">💡 Remember to test on mobile devices!</p>
                  </div>
                </div>
              )}

            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevPage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center group"
              aria-label="Previous page"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:text-gray-900">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            
            <button
              onClick={nextPage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center group"
              aria-label="Next page"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 group-hover:text-gray-900">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

          </div>

          {/* Page Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentPage
                    ? 'bg-blue-600 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto border border-white/20">
            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
              Notebook Design Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Spiral Binding</h3>
                <p>Realistic spiral holes with 3D shadow effects</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Grid Lines</h3>
                <p>Subtle grid pattern for authentic notebook feel</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Margin Lines</h3>
                <p>Classic red margin and header lines</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Page Navigation</h3>
                <p>Smooth page transitions with indicators</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
