import LivingSquaresGrid from '@/components/LivingSquaresGrid'

export default function GsapSection() {
  return (
    <section
      id="tech-stack"
      className="relative py-60 bg-gradient-to-b from-black via-[#000000] to-black overflow-hidden"
    >
      {/* Noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{backgroundImage: 'url(/noise.svg)'}} />
      
      {/* Neon blob - Tech Stack Section */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-3xl pointer-events-none z-0" aria-hidden="true" />
      
      {/* Header */}
      <div className="text-center text-white max-w-4xl mx-auto mb-16 px-4">
        <h2 className="text-6xl font-bold mb-6">My Tech Stack</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore the technologies and tools I use to bring ideas to life. 
          Hover over the squares to see them come alive.
        </p>
      </div>

      {/* LivingSquaresGrid Container */}
      <div className="relative w-full h-[500px] max-w-6xl mx-auto px-4">
        <LivingSquaresGrid
          items={[
            '/imagetrail/gemini.svg',
            '/imagetrail/cursor.svg',
            '/imagetrail/figma.svg',
            '/imagetrail/tailwind.svg',
            '/imagetrail/gsap.svg',
            '/imagetrail/claude.svg',
            '/imagetrail/next.svg',
            '/imagetrail/gpt.svg',
          ]}
          gridSize={3}
        />
      </div>
    </section>
  )
}