export default function SpiningLoadingOverLay() {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-indigo-500"></div>
      </div>
    );
}