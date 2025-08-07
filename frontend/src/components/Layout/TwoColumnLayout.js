export default function TwoColumnLayout({ left, right }) {
  return (
    // Main container: full screen height, flex column for mobile, row for larger screens
    <div className="flex flex-col lg:flex-row lg:h-screen bg-gray-100 font-inter bg-white">
      {/* Left Side */}
      <div className="flex items-center justify-center w-full lg:w-6/9 p-4 sm:p-8 h-full">
        {left}
      </div>
      {/* Right side */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-800 relative items-center justify-center rounded-l-3xl overflow-hidden">
        {right}
      </div>
    </div>
  );
}
