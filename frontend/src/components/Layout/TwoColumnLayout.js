import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TwoColumnLayout({ left, right }) {
  const [isLoading, setIsLoading] = useState(true);

  const [isLoadingLeft, setIsLoadingLeft] = useState(true);
  const [isLoadingRight, setIsLoadingRight] = useState(true);

  // TODO add animation only on element call
  useEffect(() => {
    // Simulating a data fetch with a 2-second delay
    const timerL = setTimeout(() => {
      setIsLoadingLeft(false);
    }, 2000);

    const timerR = setTimeout(() => {
      setIsLoadingRight(false);
    }, 4000);

    // Cleanup the timer to prevent memory leaks
    return () => clearTimeout(timerL, timerR);
  }, []);

  return (
    // Main container: full screen height, flex column for mobile, row for larger screens
    <div className="flex flex-col lg:flex-row lg:h-screen font-inter bg-white">
      {/* Left Side */}
      <div className="flex items-center justify-center w-full lg:w-5/9 p-4 sm:p-8 h-full">
        {isLoadingLeft ? (
          <div className="flex flex-col space-y-4 px-42 w-full">
            <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
              <Skeleton rectangle width={100} height={100} />
              <Skeleton count={5} />
            </SkeletonTheme>
          </div>
        ) : (
          left
        )}
      </div>
      {/* Right side */}
      {isLoadingRight ? (
        <div className="w-full lg:w-4/9 pr-40 h-full flex items-center justify-center">
          <Skeleton circle width={100} height={100} />
        </div>
      ) : (
        right
      )}
    </div>
  );
}
