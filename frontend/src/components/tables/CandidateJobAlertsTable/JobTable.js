import JobRow from './JobRow';
export default function CandidateJobTable({jobsData}) {
  return (
    <div className="bg-white rounded-md overflow-x-auto">
      {/* Table Header (Desktop View) */}
      <div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500 border-b border-gray-200 py-3 mb-2 px-2 bg-blue-100">
        <div className="col-span-5">JOB</div>
        <div className="col-span-3">DATE APPLIED</div>
        <div className="col-span-2 text-center">STATUS</div>
        <div className="col-span-2">ACTION</div>
      </div>

      {/* Job Rows */}
      {jobsData.map((job, index) => (
        <JobRow key={job.id} job={job} isLast={index === jobsData.length - 1} />
      ))}
    </div>
  );
}
