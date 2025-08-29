import React from "react";

export default function StatsSection({stats}) {
    return (
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
                <div key={index} className="text-center">
                    <p className="text-3xl font-bold text-blue-500">
                        {stat.value}
                    </p>
                    <p className="mt-1 text-gray-600">{stat.label}</p>
                </div>
            ))}
        </div>
    )
}