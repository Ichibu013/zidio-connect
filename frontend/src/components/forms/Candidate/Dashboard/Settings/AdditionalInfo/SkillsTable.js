import {IoIosAdd, IoIosClose} from "react-icons/io";
import React, {useEffect, useRef, useState} from "react";
import SelectBox from "@/components/inputBox/Select-box";
import {MdOutlineRemoveCircleOutline} from "react-icons/md";
import {RiDeleteBin6Line} from "react-icons/ri";

export default function SkillsTable({skillsData}) {

    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);
    const [additionalFields, setAdditionalFields] = useState([{id: 1, name: ''}]);

    const [skills] = useState([
        {option: "HTML", value: "HTML"},
        {option: "CSS", value: "CSS"},
        {option: "JavaScript", value: "JavaScript"},
        {option: "React", value: "React"},
        {option: "Node.js", value: "Node.js"},
        {option: "Express.js", value: "Express.js"},
        {option: "MongoDB", value: "MongoDB"},
        {option: "MySQL", value: "MySQL"},
        {option: "Python", value: "Python"},
        {option: "Java", value: "Java"},
    ])

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

    // Function to add a new document field
    const addField = () => {
        setAdditionalFields(prevFields => [
            ...prevFields,
            {id: Date.now(), name: ''}
        ]);
    };

    // Function to remove a document field
    const removeField = (id) => {
        setAdditionalFields(prevFields => prevFields.filter(field => field.id !== id));
    };

    const handleModal = () => {
        openModal()
    };

    return (
        <div className="col-span-1 border-l border-gray-200 pl-2">
            <h3 className={`text-xl font-semibold text-gray-700 mb-4`}>
                Skills
            </h3>
            {/*Table Header */}
            <div
                className="hidden md:grid grid-cols-4 gap-4 py-4 px-4 text-sm font-semibold text-gray-500 uppercase bg-blue-50 rounded-t-sm border-b border-gray-200">
                <div className="col-span-2">Skill</div>
                <div className="col-span-1">Level</div>
                <div className="col-span-1 text-center">-</div>
            </div>

            {skillsData.map((skill, index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 py-6 px-4 md:items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-100 transition-all duration-200">
                    <div className="col-span-2 text-gray-600 font-medium">{skill.skill}</div>
                    <div className="col-span-1 text-gray-600 font-medium">{skill.level}</div>
                    <div className="col-span-1 text-gray-600 font-medium text-center pt-1">
                        <button
                            className="cursor-pointer">
                            <RiDeleteBin6Line size={20} className=" text-red-500"/>
                        </button>
                    </div>
                </div>
            ))}
            <div
                onClick={handleModal}
                className="flex flex-row items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 my-2 text-center h-10 cursor-pointer hover:border-blue-500 transition-all duration-200">
                <IoIosAdd size={30} className="text-blue-500"/><span className="text-gray-600 ml-2 text-md">Add New Skills</span>
            </div>
            {/* Modal For  Skill Upload */}
            {isOpen &&
                <div
                    className="fixed inset-0 bg-gray-50/80 backdrop-blur-sm gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div
                        ref={modalRef}
                        className="relative p-6 w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-800 p-4 uppercase">Add Skills</h2>
                            <div className="flex flex-row items-center gap-2">
                                <span
                                    className="text-gray-600 cursor-pointer hover:text-blue-500 transition-colors duration-200 text-md"
                                    onClick={addField}>Add New</span>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                                >
                                    <IoIosClose size={35} className="cursor-pointer"/>
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 overflow-y-auto max-h-80">
                            {additionalFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid grid-cols-2 gap-4 py-4 px-4 text-sm font-semibold text-gray-500 uppercase border-t border-gray-200">
                                    <div className="col-span-1">
                                        <label
                                            htmlFor={`skill-${index}`}
                                            className="block text-gray-500 text-sm mb-2">Skill</label>
                                        <select
                                            id={`skill-${index}`}
                                            className="w-full border text-gray-600 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                                            value={field.name}
                                            onChange={(e) => {
                                                const updatedFields = additionalFields.map(f =>
                                                    f.id === field.id ? {...f, name: e.target.value} : f
                                                );
                                                setAdditionalFields(updatedFields);
                                            }}
                                        >
                                            {skills.map((skill) => (
                                                <option key={skill.value} value={skill.value}>{skill.option}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-1 flex flex-row items-center justify-evenly gap-2">
                                        <SelectBox
                                            label={"Proficiency Level"}
                                            options={[
                                                {value: "BEGINNER", label: "Beginner"},
                                                {value: "INTERMEDIATE", label: "Intermediate"},
                                                {value: "ADVANCED", label: "Advanced"},
                                                {value: "EXPERT", label: "Expert"},
                                            ]}
                                        />
                                        <MdOutlineRemoveCircleOutline size={25}
                                                                      className="cursor-pointer text-red-300 hover:text-red-600 transition-colors duration-200 translate-y-3.5"
                                                                      onClick={() => removeField(field.id)}/>
                                    </div>
                                </div>
                            ))}
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
                                Add Skills
                            </button>
                        </div>

                    </div>
                </div>
            }
        </div>
    )
}