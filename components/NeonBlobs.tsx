import React from 'react';

const NeonBlobs: React.FC = () => (
  <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
    {/* Top Left - Pink */}
    <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] rounded-full bg-pink-500 opacity-60 blur-3xl border-2 border-pink-300" />
    {/* Bottom Right - Blue */}
    <div className="absolute bottom-[-100px] right-[-100px] w-[260px] h-[260px] rounded-full bg-blue-500 opacity-60 blur-3xl border-2 border-blue-300" />
    {/* Top Right - Purple */}
    <div className="absolute top-[-80px] right-[-80px] w-[180px] h-[180px] rounded-full bg-purple-500 opacity-60 blur-2xl border-2 border-purple-300" />
    {/* Bottom Left - Cyan */}
    <div className="absolute bottom-[-60px] left-[-60px] w-[140px] h-[140px] rounded-full bg-cyan-400 opacity-60 blur-2xl border-2 border-cyan-200" />
  </div>
);

export default NeonBlobs; 