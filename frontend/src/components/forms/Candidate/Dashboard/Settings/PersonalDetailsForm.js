import React, {useState} from "react";
import {FiItalic, FiUnderline} from "react-icons/fi";
import SelectBox from "@/components/inputBox/Select-box";
import {FaLink, FaListOl, FaListUl} from "react-icons/fa";
import {RiBold} from "react-icons/ri";
import {LuStrikethrough} from "react-icons/lu";
import ProfileInputBox from "@/components/inputBox/profile-input-box";

export default function PersonalDetailsForm() {
    const [formData, setFormData] = useState({
        country: '',
        dob: '',
        gender: '',
        phoneNumber: '',
        JobSearchStatus: '',
        currentLocation: '',
        bio: '',
        willingToRelocate: false,
        expectedSalaryMin: '',
        expectedSalaryMax: '',
        availabilityDate: '',
    });


    const [personalDetails] = useState({
        country: 'usa',
        dob: '2000-01-01',
        gender: 'male',
        phoneNumber: '133713371337',
        JobSearchStatus: 'ACTIVELY_LOOKING',
        currentLocation: 'New York',
        bio: 'Test Biography',
        willingToRelocate: false,
        expectedSalaryMin: '10000',
        expectedSalaryMax: '15000',
        availabilityDate: '2024-01-01',
    });


    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [isLink, setIsLink] = useState(false);
    const [isBulletedList, setIsBulletedList] = useState(false);
    const [isNumberedList, setIsNumberedList] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleBiographyChange = (e) => {
        setFormData({
            ...formData,
            biography: e.target.value,
        });
    };

    const locationToggle = () => {
        setFormData({
            ...formData,
            willingToRelocate: !formData.willingToRelocate,
        });
    };

    const applyStyle = (style) => {
        const textarea = document.getElementById('biography');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.bio.substring(start, end);
        let newText = selectedText;

        switch (style) {
            case 'bold':
                newText = `<b>${selectedText}</b>`;
                break;
            case 'italic':
                newText = `<i>${selectedText}</i>`;
                break;
            case 'underline':
                newText = `<u>${selectedText}</u>`;
                break;
            case 'strikethrough':
                newText = `<s>${selectedText}</s>`;
                break;
            case 'link':
                const url = prompt('Enter URL:');
                if (url) {
                    newText = `<a href="${url}">${selectedText}</a>`;
                }
                break;
            case 'bulleted':
                newText = `<ul><li>${selectedText.split('\n').join('</li><li>')}</li></ul>`;
                break;
            case 'numbered':
                newText = `<ol><li>${selectedText.split('\n').join('</li><li>')}</li></ol>`;
                break;
            default:
                break;
        }

        setFormData({
            ...formData,
            biography: formData.bio.substring(0, start) + newText + formData.bio.substring(end),
        });
    };

    const handleFileUpload = () => {
        console.log('Form Data:', formData);
        alert('Form saved! Check the console for data.');
    };

    const iconClasses = "p-2 rounded cursor-pointer hover:bg-gray-200 transition-colors duration-200";
    const buttonClass = "w-full border text-gray-600 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow mb-2";

    return (
        <div>
            {/* Personal Information section */}
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="col-span-1 w-70">
                        {/* Nationality */}
                        <div>
                            <SelectBox
                                label="Nationality"
                                defaultValue={personalDetails.country}
                                onChange={(value) => setFormData({...formData, country: value})}
                                options={[
                                    {value: "", label: "Select..."},
                                    {value: "usa", label: "USA"},
                                    {value: "uk", label: "UK"},
                                    {value: "conda", label: "Canada"},
                                ]}
                            />
                        </div>
                        {/* Location */}
                        <ProfileInputBox
                            htmlFor="CurrentLocation"
                            label="Current Location"
                            defaultValue={personalDetails.currentLocation}
                        />
                        {/* Date of Birth */}
                        <div>
                            <label
                                htmlFor="dateOfBirth"
                                className="block text-gray-500 text-sm mb-2 mt-2"
                            >
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                onChange={handleInputChange}
                                className={buttonClass}
                                defaultValue={personalDetails.dob}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-500 text-sm mb-1 mt-3">Willing to Relocate?</label>
                            {/* Container for the toggle switch and its labels */}
                            <div className="flex items-center space-x-3 p-2 w-full">
                                {/* The "No" label */}
                                <span
                                    className={`text-lg font-medium transition-colors duration-300
                                ${!formData.willingToRelocate ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'}
                                `}
                                >No</span>

                                {/* The main toggle container */}
                                <div
                                    onClick={locationToggle}
                                    className={`relative flex items-center w-14 h-8 rounded-full cursor-pointer
                                transition-colors duration-300 ease-in-out
                                ${formData.willingToRelocate ? 'bg-blue-500' : 'bg-gray-400'}
                                shadow-inner
                                `}
                                >
                                    {/* The switch "thumb" or circle */}
                                    <div
                                        className={`
                                    absolute w-6 h-6 rounded-full bg-white shadow
                                    transform transition-transform duration-300 ease-in-out
                                    ${formData.willingToRelocate ? 'translate-x-7' : 'translate-x-1'}
                                  `}
                                    ></div>
                                </div>

                                {/* The "Yes" label */}
                                <span
                                    className={`
                                  text-lg font-medium transition-colors duration-300
                                  ${formData.willingToRelocate ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'}
                                `}
                                >
                                Yes
                              </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 w-70">
                        {/* Availability Date */}
                        <div>
                            <label
                                htmlFor="availability"
                                className="block text-gray-500 text-sm mb-2 "
                            >
                                Availability Date
                            </label>
                            <input
                                type="date"
                                name="availability"
                                onChange={handleInputChange}
                                className={buttonClass}
                                defaultValue={personalDetails.availabilityDate}
                            />
                        </div>
                        {/* Job Search Status */}
                        <div>
                            <SelectBox
                                label="Job Status"
                                options={[
                                    {value: "ACTIVELY_LOOKING", label: "Actively Looking"},
                                    {value: "OPEN_TO_OFFERS", label: "Open to Offers"},
                                    {value: "uk", label: "Not Looking"},
                                ]}
                                defaultValue={personalDetails.JobSearchStatus}
                            />
                        </div>
                        {/* Min Expected Salary */}
                        <div>
                            <label
                                htmlFor="expected_salary_min"
                                className="block text-gray-500 text-sm my-2"
                            >
                                Min Expected Salary
                            </label>
                            <input
                                type="Number"
                                id="expected_salary_min"
                                className="w-full border text-gray-600 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                defaultValue={personalDetails.expectedSalaryMin}
                            />
                        </div>
                    </div>
                    <div className="col-span-1 w-70">
                        {/* Gender */}
                        <div>
                            <SelectBox
                                label="Gender"
                                options={[
                                    {value: "", label: "Select..."},
                                    {value: "male", label: "Male"},
                                    {value: "female", label: "Female"},
                                    {value: "other", label: "Other"},
                                ]}
                                defaultValue={personalDetails.gender}
                            />
                            <label
                                htmlFor="phoneNumber"
                                className="block text-gray-500 text-sm my-2"
                            >
                                Phone Number
                            </label>
                            <input
                                type="Phone"
                                id="phoneNumber"
                                className="w-full border text-gray-600 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                defaultValue={personalDetails.phoneNumber}
                            />
                            <label
                                htmlFor="expected_salary_max"
                                className="block text-gray-500 text-sm my-2"
                            >
                                Max Expected Salary
                            </label>
                            <input
                                type="Number"
                                id="expected_salary_max"
                                className="w-full border text-gray-600 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                defaultValue={personalDetails.expectedSalaryMax}
                            />
                        </div>
                    </div>
                </div>
                {/* Biography */}
                <div className="mb-6">
                    <label className="block text-gray-500 text-sm mb-2 mt-3">Biography</label>
                    <div
                        className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 bg-gray-50">
                        {/* Toolbar for styling */}
                        <div className="flex p-2bg-gray-50 border-b border-gray-300">
                            <span onClick={() => applyStyle('bold')} className={iconClasses}><RiBold size={24}
                                                                                                     className="text-gray-500"/></span>
                            <span onClick={() => applyStyle('italic')} className={iconClasses}><FiItalic size={24}
                                                                                                         className="text-gray-500"/></span>
                            <span onClick={() => applyStyle('underline')} className={iconClasses}><FiUnderline size={24}
                                                                                                               className="text-gray-500"/></span>
                            <span onClick={() => applyStyle('strikethrough')} className={iconClasses}><LuStrikethrough
                                size={24} className="text-gray-500"/></span>
                            <span onClick={() => applyStyle('link')}
                                  className="p-2  cursor-pointer hover:bg-gray-200 transition-colors duration-200 border-l border-gray-300"><FaLink
                                size={24} className="text-gray-500"/></span>
                            <span onClick={() => applyStyle('bulleted')}
                                  className="p-2  cursor-pointer hover:bg-gray-200 transition-colors duration-200 border-l border-gray-300"><FaListUl
                                size={24} className={`text-gray-500 ${isBulletedList ? 'text-blue-500' : ''}`}/>              </span>
                            <span onClick={() => applyStyle('numbered')} className={iconClasses}><FaListOl size={24}
                                                                                                           className={`text-gray-500 ${isNumberedList ? 'text-blue-500' : ''}`}/>              </span>
                        </div>
                        <textarea
                            id="biography"
                            name="biography"
                            onChange={handleBiographyChange}
                            rows="6"
                            placeholder="Write down your biography here. Let the recruiters know who you are..."
                            className="w-full p-4 resize-none focus:outline-none bg-white cursor-text focus:ring-0 transition-all duration-200 border-none border-b border-gray-300 text-gray-500"
                            defaultValue={personalDetails.bio}
                        ></textarea>
                    </div>
                </div>
                <div className="mt-8 flex justify-end">
                    <button
                        className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );

}