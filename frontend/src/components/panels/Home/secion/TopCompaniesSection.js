import {IoArrowForward} from "react-icons/io5";

export default function TopCompaniesSection({ topCompanies}) {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900">Top companies</h3>
                <a href="#" className="flex items-center text-blue-500 font-medium">
                    See all <IoArrowForward size={16} className="ml-1"/>
                </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {topCompanies.map((company, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-center space-x-4">
                            <img
                                src={company.logo}
                                alt={`${company.name} logo`}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    {company.name}
                                </h4>
                                <p className="text-sm text-gray-500">
                                    {company.jobs} Jobs
                                </p>
                            </div>
                        </div>
                        <button
                            className="mt-4 w-full py-2 bg-indigo-50 text-blue-500   font-medium rounded-lg hover:bg-indigo-100 transition duration-300">
                            Open Positions ({company.jobs})
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}