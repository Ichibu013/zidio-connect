export default function SubHeader({MainHeading,RedirectText,RedirectLink,SubHeader}) {
    return (
      <div className="bg-gray-100">
        {/* Header section with navigation links */}
        <header className="max-w-6xl mx-auto flex justify-between items-center py-6 sm:px-8">
          <h1 className="text-xl font-bold text-gray-800">{MainHeading}</h1>
          <nav className="text-sm space-x-4 text-gray-500">
            <a href={RedirectLink} className="hover:text-gray-900">
              {RedirectText}
            </a>
            <span>/</span>
            <a className="font-semibold text-gray-900">{SubHeader}</a>
          </nav>
        </header>
      </div>
    );
}