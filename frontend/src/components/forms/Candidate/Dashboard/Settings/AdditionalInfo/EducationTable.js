import {IoIosAdd} from "react-icons/io";
import React from "react";
import {PiCertificateDuotone} from "react-icons/pi";
import {BiSolidInstitution} from "react-icons/bi";
import {RiDeleteBin6Line} from "react-icons/ri";

export default function EducationTable({educationData}) {
    return (
        <div className="col-span-1">
            <h3 className={`text-xl font-semibold text-gray-700 mb-4`}>
                Education
            </h3>
            {/* Table Header for larger screens */}
            <div
                className="hidden md:grid grid-cols-7 gap-4 py-4 px-4 text-sm font-semibold text-gray-500 uppercase bg-blue-50 rounded-t-sm border-b border-gray-200">
                <div className="col-span-4">Degree</div>
                <div className="col-span-1">S.Y</div>
                <div className="col-span-1 ">E.Y</div>
                <div className="col-span-1 text-center">-</div>
            </div>

            {educationData.map((education, index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-7 gap-4 py-6 px-4 md:items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-all duration-200">
                    <div className="col-span-4 text-gray-600 font-medium text-semibold">
                        {education.degree}
                        <div className="text-xs text-gray-500">
                            <PiCertificateDuotone size={16} className="inline-block mr-1"/>
                            {education.major}
                        </div>
                        <div className="text-xs text-gray-500">
                            <BiSolidInstitution size={16} className="inline-block mr-1"/>
                            {education.institution}
                        </div>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <span className="text-gray-600">{education.startDate}</span>
                    </div>
                    <div className="col-span-1 ">
                        <span className="text-gray-600">{education.endDate}</span>
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
                className="flex flex-row items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 my-2 text-center h-10 cursor-pointer hover:border-blue-500 transition-all duration-200">
                <IoIosAdd size={30} className="text-blue-500"/><span className="text-gray-600 ml-2 text-md">Add New Education</span>
            </div>
            <div className="border-t border-gray-200 pt-2"/>
        </div>
    );
}