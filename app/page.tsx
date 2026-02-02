export default function Home() {
  const gates = [
    { id: 1, img: '/res/blue.png' },
    { id: 2, img: '/res/white.png' },
    // { id: 3, img: '/res/purple.png' },
    // { id: 4, img: '/res/black.png' },
    // { id: 5, img: '/res/yellow.png' },
    // { id: 6, img: '/res/red.png' },
    // { id: 7, img: '/res/prism_tower.png' },
    // { id: 9, img: '/res/hope.png' },
    // { id: 10, img: '/res/final.png' },
  ];

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-[#0a0c10] text-[#191c20] dark:text-[#e1e2e6] font-sans selection:bg-blue-500 selection:text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <header className="mb-20 flex flex-col items-center">
          <div className="relative mb-6">
            <h1 className="relative z-10 text-5xl md:text-7xl font-bold tracking-tighter text-[#191c20] dark:text-[#e1e2e6] uppercase">
              万花筒攻略
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-4 bg-blue-500/20 dark:bg-blue-500/40 -skew-x-12 transform" />
          </div>
          <p className="text-lg md:text-xl text-[#42474e] dark:text-[#8b92a1] tracking-wide font-medium border-t border-gray-300 dark:border-gray-700 pt-4 mt-2">
            塔可Bot开发者制作
          </p>
        </header>
        
        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {gates.map((gate) => (
            <a
              key={gate.id}
              href={`/gate/${gate.id}`}
              className="group relative block w-full max-w-[444px] aspect-[444/128] overflow-hidden"
            >
              {/* Decorative Corner Markers */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-blue-500 transition-colors duration-300 z-20" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-blue-500 transition-colors duration-300 z-20" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-blue-500 transition-colors duration-300 z-20" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-blue-500 transition-colors duration-300 z-20" />

              {/* Image Container */}
              <div className="relative w-full h-full">
                 <img
                  src={gate.img}
                  alt={`Gate ${gate.id}`}
                  className="w-full h-full object-cover"
                />

              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
