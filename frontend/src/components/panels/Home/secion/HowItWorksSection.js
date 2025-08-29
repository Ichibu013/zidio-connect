import {IoArrowForward} from "react-icons/io5";
import React from "react";

export default function HowItWorksSection({howItWorks}) {
    return (
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900">How Jobpilot works</h3>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {howItWorks.map((step, index) => (
                    <div key={index} className="text-center p-6">
                        <div className="bg-white p-4 inline-block rounded-full text-indigo-600 shadow-md">
                            {step.icon}
                        </div>
                        <h4 className="mt-4 font-semibold text-gray-900">
                            {step.title}
                        </h4>
                        <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
