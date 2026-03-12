// src/app/loading.js
// "use client";

// export default function Loading() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0D7C66] to-[#41B3A2] text-white">
//       {/* Spinner */}
//       <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>

//       {/* Loading Text */}
//       <h1 className="text-3xl font-bold mb-2">Loading...</h1>
//       <p className="text-center max-w-xs">
//         Please wait while we prepare your page. Good things take a moment!
//       </p>
//     </div>
//   );
// }

"use client";

import { Coffee, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#0D7C66] to-[#22a6b3] text-white">
      {/* Animated Icon */}
      <div className="mb-6 animate-bounce">
        <Coffee className="w-16 h-16 text-white drop-shadow-lg" />
      </div>

      {/* Loading Spinner */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-white animate-spin-slow" />
        </div>
      </div>

      {/* Loading Text */}
      <h1 className="text-4xl font-bold mb-2 drop-shadow-md text-center">
        Loading...
      </h1>
      <p className="text-center max-w-sm text-white/90">
        Your dashboard is getting ready. Great things are on the way!
      </p>

      {/* Animated Dots */}
      <div className="flex space-x-2 mt-6">
        <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-75"></span>
        <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></span>
        <span className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  );
}
