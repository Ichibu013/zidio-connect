'use client'
import React, {useEffect, useRef, useState} from "react";
import {IoIosAdd, IoIosClose} from "react-icons/io";
import ProfileInputBox from "@/components/inputBox/Text-Box/profile-input-box";
import {RiDeleteBin6Line} from "react-icons/ri";

export default function ExperienceTable({jobsData}) {

    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);

    // Function to open the modal
    const openModal = () => setIsOpen(true);
    // Function to close the modal
    const closeModal = () => setIsOpen(false);

    // Hook to handle clicks outside the modal
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        }

        // Attach the event listener when the modal is open
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up the event listener on component unmount or when the modal closes
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleModal = () => {
        openModal()
    };

    return (
        <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 uppercase">
                Experience
            </h3>

            {/* Table Header for larger screens */}
            <div
                className="hidden md:grid grid-cols-14 gap-4 py-4 px-4 text-sm font-semibold text-gray-500 uppercase bg-blue-50 rounded-t-sm border-b border-gray-200">

                <div className="col-span-4">Position</div>
                <div className="col-span-3">Company</div>
                <div className="col-span-3">Start Date</div>
                <div className="col-span-3 ">End Date</div>
                <div className="col-span-1 text-center" >-</div>
            </div>

            {/* Job List */}
            {jobsData.map((job, index) => (
                <div
                    key={index}
                    className={`grid grid-cols-1 md:grid-cols-14 gap-4 py-6 px-4 md:items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-all duration-200 `}
                >
                    {/* Job Title */}
                    <div className="col-span-4 hidden md:block text-gray-600 font-medium">{job.title}</div>

                    {/* Company Name */}
                    <div className="col-span-3 flex items-center">
                        <div className="text-base font-semibold text-gray-800">{job.company}</div>
                    </div>


                    {/* Start Date */}
                    <div className="col-span-3 flex items-center  md:pr-4">
                        <span className="text-gray-600">{job.startDate}</span>
                    </div>

                    {/* End Date */}
                    <div className="col-span-3 ">
                        <span className="text-gray-600">{job.endDate}</span>
                    </div>

                    <div className="col-span-1 text-gray-600 font-medium text-center pt-1">
                        <button
                            className="cursor-pointer">
                            <RiDeleteBin6Line size={20} className="text-red-500"/>
                        </button>
                    </div>
                </div>
            ))}
            <div
                onClick={handleModal}
                className="flex flex-row items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 my-2 text-center h-20 cursor-pointer hover:border-blue-500 transition-all duration-200">
                <IoIosAdd size={40} className="text-blue-500"/><span className="text-gray-600 ml-2 text-lg">Add New Work Experience</span>
            </div>
            {/* Modal For Experience Upload */}
            {isOpen &&
                <div
                    className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div
                        ref={modalRef}
                        className="relative p-6 w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800 p-4 uppercase">Add Experience</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                            >
                                <IoIosClose size={35} className="cursor-pointer"/>
                            </button>
                        </div>
                        <div
                            className="grid grid-cols-2 gap-4 py-4 px-4 text-sm font-semibold text-gray-500 uppercase border-t border-gray-200">
                            <div className="col-span-1">
                                <ProfileInputBox htmlFor="tittle" label="Tittle"/>
                                <ProfileInputBox htmlFor="location" label="Location"/>
                                <div>
                                    <label
                                        htmlFor="startDate"
                                        className="block text-gray-500 text-sm my-2">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        className="w-full border text-gray-600 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <ProfileInputBox htmlFor="company" label="Company"/>
                                <ProfileInputBox htmlFor="description" label="Description"/>
                                <div>
                                    <label htmlFor="endDate"
                                           className="block text-gray-500 text-sm my-2">End Date</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        className="w-full border text-gray-600 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Modal footer with buttons */}
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
                            >
                                Add Experience
                            </button>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}