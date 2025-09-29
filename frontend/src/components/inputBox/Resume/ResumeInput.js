'use client';
import {useEffect, useRef, useState} from 'react';
import {LuCirclePlus, LuUpload} from "react-icons/lu";
import {IoIosClose} from "react-icons/io";
import ProfileInputBox from "@/components/inputBox/Text-Box/profile-input-box";
import {FaRegFileAlt} from "react-icons/fa";
import {RiDeleteBin6Line} from "react-icons/ri";

export default function ResumeInput() {
    const [file, setFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const [filename, setFilename] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);


    // Function to open the modal
    const openModal = () => setIsOpen(true);
    // Function to close the modal
    const closeModal = () => {
        alert("File Uploaded Successfully" + file.name + " " + file.size + filename);
        setIsOpen(false);
    }

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

    const handleFileUpload = (e) => {
        e.preventDefault();
        const fileInput = e.target;
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            setFile(file);
            setFilename(file.name);
        }
    };

    return (
        <>
            <div onClick={handleModal}>
                <div
                    className="flex flex-row items-center justify-evenly border-2 border-dashed border-gray-300 rounded-lg px-2 py-4 gap-2 text-center cursor-pointer hover:border-blue-500 transition-all duration-200"
                >
                    <div>
                        <LuCirclePlus size={40} className="text-blue-500 mb-2"/>
                    </div>
                    <div className="text-center">
                        <p className="text-blue-600 text-sm font-medium">
                            {"Add Cv/Resume"}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                            Browse file or drop here <br/>
                            [PDF only]
                        </p>
                    </div>
                </div>
            </div>
            {/* The modal overlay and content */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm z-100 gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div ref={modalRef}
                         className="relative p-6 w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out">
                        {/* Modal header with title and close button */}
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Add Cv/Resume</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                            >
                                <IoIosClose size={35} className="cursor-pointer"/>
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="mt-4 space-y-4">
                            {/* CV/Resume Name field */}
                            <ProfileInputBox
                                htmlFor={"resume-name"}
                                label={"Resume Name"}
                                value={filename}
                                onChange={(e) => {
                                    setFilename(e.target.value);
                                }}
                            />
                            {/* Upload section */}
                            {!file &&
                                <label htmlFor="resume-upload">
                                    <div
                                        className="group mt-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition duration-200 cursor-pointer">
                                        <LuUpload size={40}
                                                  className="text-gray-500 mb-2 mx-auto group-hover:text-blue-500"/>

                                        <p className="mt-2 text-sm text-gray-600">
                                            <span
                                                className="font-semibold text-blue-600 cursor-pointer hover:underline">Browse File</span> or
                                            drop here
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">
                                            Only PDF format available. Max file size 12 MB.
                                        </p>

                                        {/* Hidden file input that gets triggered by the "Browse File" span */}
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            className="hidden"
                                            id="resume-upload"
                                            onChange={handleFileUpload}
                                        />
                                    </div>
                                </label>
                            }
                            {file &&
                                <div
                                    className="relative bg-gray-100 px-2 py-4 rounded-lg flex items-center justify-between">
                                    <div className="flex items-center">
                                        {/* File icon */}
                                        <FaRegFileAlt size={33} className="text-blue-500 mr-4"/>
                                        <div>
                                            <p className="font-semibold text-sm text-gray-700">{file.name}</p>
                                            <p className="text-xs text-gray-400 mt-1">{(file.size / (1024 * 1024)).toFixed(3)} MB</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button
                                            onClick={() => setFile(null)}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 rounded-b-lg transition-colors duration-200">
                                            <RiDeleteBin6Line size={25} className="mr-2 text-red-500"/>
                                        </button>
                                    </div>
                                </div>
                            }


                        </div>

                        {/* Modal footer with buttons */}
                        <div className="flex justify-end space-x-3 mt-4">
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
                                Add Cv/Resume
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
