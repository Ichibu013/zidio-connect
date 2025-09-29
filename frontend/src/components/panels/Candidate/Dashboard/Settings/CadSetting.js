"use client";
import InfoDisplay from "@/components/forms/Candidate/Dashboard/Settings/InfoDisplay";
import {useState} from "react";
import PersonalDetailsForm from "@/components/forms/Candidate/Dashboard/Settings/PersonalDetailsForm";
import TableLayout from "@/components/forms/Candidate/Dashboard/Settings/AdditionalInfo/TableLayout";
import {AnimatePresence, motion} from "framer-motion"; // Import motion and AnimatePresence
import SocailDetails from "@/components/forms/Candidate/Dashboard/Settings/SocailDetails";

export default function CadSetting() {
    const [tab, setTab] = useState("Display");

    return (
        <div className="bg-white p-8 mb-6 **w-full**">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 ">Setting</h2>
            {/* Top navigation for settings tabs */}
            <div className="flex space-x-4 border-b border-gray-200 mb-6">
                {Object.keys({
                    Display: {},
                    "Personal Info": {},
                    "Additional Info": {},
                    "Social Links": {},
                    "Account Setting": {},
                }).map((content) => (
                    <button
                        key={content}
                        className={`py-2 px-4 text-sm font-medium transition-all duration-200 ${
                            tab === content
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                        onClick={() => setTab(content)}
                    >
                        {content}
                    </button>
                ))}
            </div>

            {/* Conditional rendering with Framer Motion for sliding animation */}
            <AnimatePresence mode="wait">
                {tab === "Display" && (
                    <motion.div
                        key="display"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <InfoDisplay />
                    </motion.div>
                )}
                {tab === "Personal Info" && (
                    <motion.div
                        key="personal-info"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="min-w-full"
                    >
                        <PersonalDetailsForm />
                    </motion.div>
                )}
                {tab === "Additional Info" && (
                    <motion.div
                        key="additional-info"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <TableLayout />
                    </motion.div>
                )}
                {tab === "Social Links" && (
                    <motion.div
                        key="social-links"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -100, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Social Details Component */}
                        <SocailDetails />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}