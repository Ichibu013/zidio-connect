export default function JobRow ({ job, isLast }) {
  const borderClass = isLast ? '' : 'border-b border-gray-100';

  const CheckIcon = ({ className = 'w-4 h-4' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);
  return (
    <div className={`flex flex-col md:grid md:grid-cols-12 items-center py-4 px-2 ${borderClass} transition duration-150 hover:bg-gray-50`}>
      {/* Job Details (Col 1-5 on desktop) */}
      <div className="flex items-center space-x-4 col-span-5 w-full md:w-auto mb-2 md:mb-0">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${job.initialsBg} ${job.initialsColor} font-bold text-sm flex-shrink-0`}>
          {job.initials || job.initialsIcon}
        </div>
        <div>
          <div className="text-gray-900 font-medium">{job.title}</div>
          <div className="flex flex-wrap items-center space-x-2 text-xs text-gray-500">
            <span>{job.location}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span className="font-semibold">{job.salary}</span>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${job.type === 'Remote' ? 'bg-blue-100 text-blue-600' : job.type === 'Full Time' ? 'bg-indigo-100 text-indigo-600' : 'bg-yellow-100 text-yellow-600'}`}>
              {job.type}
            </span>
          </div>
        </div>
      </div>

      {/* Date Applied (Col 6-7) */}
      <div className="col-span-3 text-sm text-gray-600 w-full md:w-auto mb-2 md:mb-0 md:text-left text-right">
        {job.date}
      </div>

      {/* Status (Col 8-9) */}
      <div className="col-span-2 flex items-center justify-start md:justify-center w-full md:w-auto mb-2 md:mb-0">
        <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
          <CheckIcon className="w-4 h-4 text-green-500" />
          <span>{job.status}</span>
        </div>
      </div>

      {/* Action Button (Col 10-12) */}
      <div className="col-span-2 w-full md:w-auto">
        <button
          className= "cursor-pointer hover:bg-blue-600 hover:text-white bg-white border border-gray-300 text-blue-600 hover:text-white w-full md:w-auto py-2 px-4 text-sm font-semibold rounded-lg transition duration-150 shadow-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};