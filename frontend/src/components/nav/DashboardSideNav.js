import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";


export default function DashboardSideNav({ heading, navItems, activeTabparm }) {
  const [activeTab, setActiveTab] = useState(activeTabparm || "Overview");

  // Function to handle tab changes
  const handleTabChange = (tabName, href) => {
    setActiveTab(tabName);
    // Navigate to the specified href if provided
    if (href) {
      window.location.href = href;
    }
  };

  return (
    <aside className="w-full md:w-1/4 lg:w-70 bg-white border-r border-gray-200 p-4 md:p-6 lg:py-4 lg:px-3">
      <div className="flex items-center mb-2">
        <h1 className="text-xl text-gray-400">{heading}</h1>
      </div>
      <nav>
        <ul className="space-y-2 border-b border-gray-200 pb-4">
          {/* Map through navItems to create list items */}
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ${
                activeTab === item.name
                  ? "bg-blue-100 text-blue-600 font-semibold border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => handleTabChange(item.name, item.href)}
            >
              <span className="mr-2">{item.icon}</span>
              <span className="text-sm ">{item.name}</span>
              {item.notificationCount && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                  {item.notificationCount}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4">
        <a
          href="#"
          className="flex items-center text-red-500 font-semibold hover:text-red-700 transition-colors duration-200"
        >
          {/* Log-out icon */}
          <IoIosLogOut size={20} className="mr-2" />
          Log-out
        </a>
      </div>
    </aside>
  );
}
