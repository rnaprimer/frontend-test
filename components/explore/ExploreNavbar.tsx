import Link from 'next/link';

export default function ExploreNavbar() {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white rounded-full p-2 flex items-center gap-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100">
        <Link 
          href="/" 
          className="px-6 py-3 font-semibold text-black hover:opacity-70 transition-opacity rounded-full whitespace-nowrap"
        >
          Go back
        </Link>
        <button 
          className="bg-[#c4f092] hover:bg-[#b6e87f] transition-colors rounded-full pl-6 pr-2 py-2 flex items-center gap-4 text-black font-semibold whitespace-nowrap"
        >
          <span>Join the club</span>
          <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
            5
          </div>
        </button>
      </div>
    </nav>
  );
}
