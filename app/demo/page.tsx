import WobbleCardDemo from "@/components/ui/wobble-card-demo";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Wobble Card Demo
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Interactive cards with smooth hover animations and 3D transforms. 
            Hover over the cards to see the wobble effect!
          </p>
        </div>
        
        <WobbleCardDemo />
        
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-neutral-300">
              <div>
                <h3 className="font-semibold text-white mb-2">3D Transform</h3>
                <p>Smooth 3D transforms on hover with mouse tracking</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Responsive</h3>
                <p>Fully responsive design that works on all devices</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Performance</h3>
                <p>Optimized animations using Framer Motion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
