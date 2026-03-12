// export default function AuthLayout({ children }) {
//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side */}
//       <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10">
//         <div>
//           <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
//           <p className="text-lg">Secure and simple authentication system.</p>
//         </div>
//       </div>

//       {/* Right Side (Form Section) */}
//       <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
//         {children}
//       </div>
//     </div>
//   );
// }

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9]">
      {children}
    </div>
  );
}
