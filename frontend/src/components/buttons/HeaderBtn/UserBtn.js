'use client'
import {FaRegUserCircle} from "react-icons/fa";
import {RiSettings4Line} from "react-icons/ri";
import {MdLogout} from "react-icons/md";
import {useEffect, useRef, useState} from "react";

export default function UserBtn() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const dropdownRef = useRef(null);


    // Effect to handle clicks outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black cursor-pointer"
                onClick={toggleDropdown}
            >
                <FaRegUserCircle size={40}/>
            </div>
            <div
                className={`
                    absolute top-full right-0 mt-2  bg-white rounded-md border border-gray-100 shadow-lg z-10 max-h-60 overflow-y-auto 
                    transition-all duration-300 ease-in-out transform origin-top-right
                    ${isDropdownOpen
                    ? 'scale-y-100 opacity-100 visible'
                    : 'scale-y-0 opacity-0 invisible'
                }
                `}
            >
                <div className="p-2">
                    <a href="#" className="flex flex-row items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-300">
                        <FaRegUserCircle size={19}/>
                        Profile
                    </a>
                    <a href="#" className="flex flex-row items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-300">
                        <RiSettings4Line size={19}/>
                        Settings
                    </a>
                    <a href="#" className="flex flex-row items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 rounded-md transition-all duration-300">
                        <MdLogout size={19} className="hover:text-red-500"/>
                        Logout
                    </a>
                </div>
            </div>
        </div>
    )
}