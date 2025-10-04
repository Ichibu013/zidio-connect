import CandidateJobTable from "@/components/tables/CandidateJobAlertsTable/JobTable";

export default function OverviewPanel() {
  const jobsData = [
    {
      id: 1,
      title: "Networking Engineer",
      type: "Remote",
      location: "Washington",
      salary: "$50k-80k/month",
      date: "Feb 2, 2019 19:28",
      status: "Active",
      initials: "Up",
      initialsBg: "bg-green-500",
      initialsIcon: null,
      initialsColor: "text-white",
    },
    {
      id: 2,
      title: "Product Designer",
      type: "Full Time",
      location: "Dhaka",
      salary: "$50k-80k/month",
      date: "Dec 7, 2019 23:26",
      status: "Active",
      initials: null,
      initialsIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            fill="white"
            d="M10.5 16.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3c.3 0 .5.2.5.5s-.2.5-.5.5h-3zM9 13c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v3c0 .6-.4 1-1 1H9z"
          />
        </svg>
      ),
      initialsBg: "bg-pink-500",
      initialsColor: "text-white",
    },
    {
      id: 3,
      title: "Junior Graphic Designer",
      type: "Temporary",
      location: "Brazil",
      salary: "$50k-80k/month",
      date: "Feb 2, 2019 19:28",
      status: "Active",
      initials: null,
      initialsIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.9V13h4.7a8.4 8.4 0 0 1-9.4 0H11v6.9a8 8 0 0 1-6.9-6.9H9V7.9a8 8 0 0 1 6.9 6.9H13v3.9a8 8 0 0 1-1-1.8z" />
        </svg>
      ),
      initialsBg: "bg-gray-800",
      initialsColor: "text-white",
    },
    {
      id: 4,
      title: "Visual Designer",
      type: "Contract Base",
      location: "Wisconsin",
      salary: "$50k-80k/month",
      date: "Dec 7, 2019 23:26",
      status: "Active",
      initials: null,
      initialsIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white"
        >
          <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zM4 18V7.3l8 5 8-5V18H4z" />
        </svg>
      ),
      initialsBg: "bg-blue-600",
      initialsColor: "text-white",
    },
  ];

  const username = "John Doe";
  const SUBHEADING_STYLING = "font-semibold text-black mb-2";
  const horizontailStyling = "my-4 border-t border-gray-200";
  return (
    <div className="bg-white px-8 py-4 mb-3 **w-full**">
      <h2 className={SUBHEADING_STYLING}>Welcome back, {username}!</h2>
      <p className="text-sm text-gray-600 mb-4">
        Here's a quick overview of your recent activities and job applications.
      </p>
      {/* Job Table Component */}
      <h2 className={SUBHEADING_STYLING}>Recently Applied</h2>
      <CandidateJobTable jobsData={jobsData} />
    </div>
  );
}
