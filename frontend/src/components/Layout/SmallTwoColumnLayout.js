export default function SmallTwoColumnLayout({ left, right }) {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-12 items-center lg:items-center max-w-6xl mx-auto py-15">
      {/* Left Panel */}
      {left}
      {/* Right Panel  */}
      {right}
    </div>
  );
}
