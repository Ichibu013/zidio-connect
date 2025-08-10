import { useState, useEffect } from "react";

// You'll need to create your own loading animation component.
// Here's a simple example of a skeleton loader.
const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-300 rounded-md w-full h-full"></div>
);

export default function TwoColumnLayout({ left, right }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating a data fetch with a 2-second delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  return (
    // Main container: full screen height, flex column for mobile, row for larger screens
    <div className="flex flex-col lg:flex-row lg:h-screen bg-gray-100 font-inter bg-white">
      {/* Left Side */}
      <div className="flex items-center justify-center w-full lg:w-6/9 p-4 sm:p-8 h-full">
        {isLoading ? <SkeletonLoader /> : left}
      </div>
      {/* Right side */}
      {isLoading ? (
        <div className="flex items-center justify-center w-full lg:w-3/9 p-4 sm:p-8 h-full">
          <SkeletonLoader />
        </div>
      ) : (
        right
      )}
    </div>
  );
}
