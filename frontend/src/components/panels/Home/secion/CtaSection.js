import React from "react";
import EmployeeImage from "../../../../../public/employeeImage.png";
import RecruiterImage from "../../../../../public/recruiterImage.png";
import Image from "next/image";

const Employee = EmployeeImage;
const Recruiter = RecruiterImage;

export default function CtaSection() {
    return (
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
                className="bg-gray-200 p-8 rounded-lg text-black flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex-grow">
                    <h4 className="text-xl font-bold">Become a Candidate</h4>
                    <p className="mt-2 text-gray-400">
                        Foster a career by applying for jobs.
                        Get registered as a candidate and start exploring.
                    </p>
                    <button
                        className="mt-4 px-6 py-3 bg-white text-blue-500 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                        Register Here
                    </button>
                </div>
                <Image src={Employee}
                       alt="Employee"
                       width={200}
                       height={200}
                />
            </div>

            <div
                className="bg-blue-600 p-8 rounded-lg text-white flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="flex-grow">
                    <h4 className="text-xl font-bold">Become a Employer</h4>
                    <p className="mt-2 text-blue-100">
                        Post a job and view the applicants.
                        Get registered as recruiter and start hiring.
                    </p>
                    <button
                        className="mt-4 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                        Register Here
                    </button>
                </div>
                <Image src={Recruiter}
                       alt="Recruiter Image"
                       width={200}
                       height={200}
                />
            </div>
        </div>
    )
}