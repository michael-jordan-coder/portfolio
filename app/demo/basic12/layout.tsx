export default function Basic12Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white" style={{backgroundColor: '#000000'}}>
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b" style={{backgroundColor: '#1C1C1E', borderColor: '#38383A'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(to right, #007AFF, #0056CC)'}}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">basik12</span>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#problem"
                className="transition-colors text-[#8E8E93] hover:text-white focus:text-white"
              >
                Problem
              </a>
              <a
                href="#architecture"
                className="transition-colors text-[#8E8E93] hover:text-white focus:text-white"
              >
                Architecture
              </a>
              <a
                href="#process"
                className="transition-colors text-[#8E8E93] hover:text-white focus:text-white"
              >
                Process
              </a>
              <a
                href="#results"
                className="transition-colors text-[#8E8E93] hover:text-white focus:text-white"
              >
                Results
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="transition-colors text-[#8E8E93] hover:text-white focus:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="h-1" style={{backgroundColor: '#2C2C2E'}}>
          <div className="h-full transition-all duration-300" 
               style={{background: 'linear-gradient(to right, #007AFF, #0056CC)', width: '0%'}} id="progress-bar"></div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
