"use client";

export default function Navbar() {
  return (
    <nav className="bg-[#0000B8] text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo y nombre */}
          <div className="flex items-center space-x-3">
            <div className="bg-black p-2">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="font-semibold text-xl hidden md:block">
              Keyless Notes
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
