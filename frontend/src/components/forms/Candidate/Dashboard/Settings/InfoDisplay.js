import React, {useState} from "react";
import SelectBox from "../../../../inputBox/Text-Box/Select-box";
import {FiUploadCloud} from "react-icons/fi";
import CvItemBox from "../../../../Items/CvItem";
import ResumeInput from "../../../../inputBox/Resume/ResumeInput";
import {FaLink} from "react-icons/fa";
import ProfileInputBox from "@/components/inputBox/Text-Box/profile-input-box";

export default function InfoDisplay() {
    const [uploadedCvs, setUploadedCvs] = useState([
        {name: "Professional Resume", size: "3.5 MB"},
        {name: "Product Designer", size: "4.7 MB"},
        {name: "Visual Designer", size: "1.3 MB"},
    ]);

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            console.log("File selected:", uploadedFile);
        } else {
            console.error("No file selected");
        }
    };

    return (
        <div>
            {/* Personal Information section */}
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Displayed Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Profile Picture Upload */}
                    <div className="col-span-1">
                        <label className="block text-gray-500 text-sm my-2">
                            Profile Picture
                        </label>

                        <label
                            htmlFor="profile-pic-upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-63 cursor-pointer hover:border-blue-500 transition-all duration-200"
                        >
                            <FiUploadCloud size={40} className="text-gray-400 mb-2"/>
                            <p className="text-gray-500 text-sm font-medium">
                                Browse photo or drop here
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                A photo larger than 400 pixels work best. Max photo size 5 MB.
                            </p>
                            <input
                                type="file"
                                accept="image/*"
                                id="profile-pic-upload"
                                className="hidden"
                                onChange={handleFileUpload} // Handle file upload
                            />
                        </label>
                    </div>

                    {/* Form Inputs */}
                    <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <ProfileInputBox htmlFor={"fullName"} label={"Full Name"}/>
                        <ProfileInputBox htmlFor={"location"} label={"Location"}/>
                        <div>
                            <SelectBox
                                options={[
                                    {value: "intern", label: "Intern"},
                                    {value: "junior", label: "Junior"},
                                    {value: "mid", label: "Mid-level"},
                                    {value: "senior", label: "Senior"},
                                ]}
                                label="Experience"
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div>
                            <SelectBox
                                options={[
                                    {value: "bachelor", label: "Bachelor's"},
                                    {value: "master", label: "Master's"},
                                    {value: "phd", label: "PhD"},
                                ]}
                                label={"Education"}
                                onChange={(e) => console.log(e.target.value)}
                            />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                            <label
                                htmlFor="social"
                                className="block text-gray-500 text-sm mb-2"
                            >
                                Social Link
                            </label>
                            <div className="flex flex-col relative">
                                {/* Input for Social Link */}
                                <FaLink className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"/>
                                <input
                                    type="url"
                                    id="social"
                                    placeholder="Website url..."
                                    className="w-full text-black border border-gray-300 rounded-lg py-3 pr-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end">
                    <button
                        className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200">
                        Save Changes
                    </button>
                </div>
                {/* Your CV/Resume section */}
                <div className="bg-white p-8 ">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Your CV/Resume
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 h-20">
                        {uploadedCvs.map((cv, index) => (
                            <CvItemBox key={index} cv={cv}/>
                        ))}
                        {/* Add CV Button */}
                        <ResumeInput/>
                    </div>
                </div>
            </div>
        </div>
    );
}
