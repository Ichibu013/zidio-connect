import {FaRegUserCircle} from "react-icons/fa";
import {FaBriefcase, FaRegBookmark} from "react-icons/fa6";
import {RiMapPin5Line} from "react-icons/ri";
import {IoArrowForward} from "react-icons/io5";

export default function FeaturedJobSection({featuredJobs}) {

    const handleBookmarkClick = () => {
        alert('Bookmark added!');
    };

    return (<div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900">Featured job</h3>
                <a href="#" className="flex items-center text-blue-500 font-medium">
                    See all <IoArrowForward size={16} className="ml-1"/>
                </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredJobs.map((job, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={job.logo}
                                    alt={`${job.company} logo`}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {job.title}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {job.company}
                                    </p>
                                </div>
                            </div>
                            <label className="cursor-pointer">
                                <FaRegBookmark size={20} className="text-gray-400 hover:text-blue-500"/>
                                <input type="checkbox" className="hidden" onClick={handleBookmarkClick}/>
                            </label>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                             <RiMapPin5Line size={14} className="text-blue-500"/>
                             <span>{job.location}</span>
                          </span>
                            <span className="flex items-center space-x-1">
                                <FaBriefcase size={14} className="text-blue-500"/>
                                <span>{job.type}</span>
                          </span>
                            <span className="flex items-center space-x-1">
                                <FaRegUserCircle size={14} className="text-blue-500"/>
                                <span>{job.salary}</span>
                          </span>
                        </div>
                        <p className="mt-4 text-gray-600">{job.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {job.tags.map((tag, tagIndex) => (
                                    <span
                                        key={tagIndex}
                                        className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                                    > {tag} </span>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}