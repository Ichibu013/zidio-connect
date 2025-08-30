import React from "react";

export default function VacanciesSection({popularVacancies}) {
    return (
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900">
                    Most Popular Vacancies
                </h3>
                <p className="mt-2 text-gray-600">
                    Here are some of the most popular vacancies.
                </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
                {popularVacancies.map((vacancy, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg  hover:shadow-md hover:bg-gray-50 transition-shadow"
                    >
                        <h4 className="font-semibold text-gray-800">
                            {vacancy.title}
                        </h4>
                        <p className="mt-1 text-gray-500 text-sm">
                            {vacancy.location}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}