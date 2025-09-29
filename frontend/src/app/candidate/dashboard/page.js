"use client";
import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import SearchHeader from "@/components/headers/SearchHeader";
import DashboardSideNav from "@/components/nav/DashboardSideNav";
import {useState} from "react";
import {PiUserCircleGear} from "react-icons/pi";
import {RiNotification4Line, RiStackLine} from "react-icons/ri";
import {LuBookmark, LuBriefcase} from "react-icons/lu";
import {useSearchParams} from "next/navigation";
import CadSetting from "@/components/panels/Candidate/Dashboard/Settings/CadSetting";

// Helper function to map the URL parameter to the tab name
const getActiveTabFromUrl = (searchParams) => {
  const activeTabFromUrl = searchParams.get("tab");
  // Map the URL parameter to a display name for the component
  switch (activeTabFromUrl) {
    case "applied_jobs":
      return "Applied Jobs";
    case "favorite_jobs":
      return "Favorite Jobs";
    case "job_alerts":
      return "Job Alert";
    case "settings":
      return "Settings";
    default:
      return "Overview";
  }
};

export default function CandidateDashboard() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    getActiveTabFromUrl(searchParams) || "Overview"
  );

  const navItems = [
    {
      name: "Overview",
      icon: <RiStackLine size={20} />,
      href: "?tab=overview",
    },
    {
      name: "Applied Jobs",
      icon: <LuBriefcase size={20} />,
      href: "?tab=applied_jobs",
    },
    {
      name: "Favorite Jobs",
      icon: <LuBookmark size={20} />,
      href: "?tab=favorite_jobs",
    },
    {
      name: "Job Alert",
      icon: <RiNotification4Line size={20} />,
      notificationCount: 9,
      href: "?tab=job_alerts",
    },
    {
      name: "Settings",
      icon: <PiUserCircleGear size={20} />,
      href: "?tab=settings",
    },
  ];

  return (
    <>
      <header className="bg-white border-b border-gray-300 shadow-sm position-fixed pt-10">
        <SearchHeader btn1={<SignInBtn />} btn3={<PostAJobBtn />} />
      </header>
      <div className="flex bg-white h-[calc(96vh-100px)] font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row px-2 md:px-6 w-full relative">
          {/* Sidebar Navigation */}
          <DashboardSideNav
            heading={"CANDIDATE DASHBOARD"}
            navItems={navItems}
            activeTabparm={activeTab}
          />
          {/* Main Content Area */}
          <div className="flex-1 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100 absolute md:relative pb-20  ">
            {/* Conditional rendering based on active tab */}
            {activeTab === "Overview" && null}
            {activeTab === "Applied Jobs" && null}
            {activeTab === "Favorite Jobs" && null}
            {activeTab === "Job Alert" && null}
            {activeTab === "Settings" && <CadSetting />}
          </div>
        </div>
      </div>
    </>
  );
}
