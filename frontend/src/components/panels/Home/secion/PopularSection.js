import {IoArrowForward} from "react-icons/io5";

export default function PopularSection({ jobCategories}) {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900">Popular category</h3>
                <a href="#" className="flex items-center text-blue-500 font-medium">
                    See all <IoArrowForward size={16} className="ml-1"/>
                </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {jobCategories.map((category, index) => (
                    <div
                        key={index}
                        className="group bg-white p-6 rounded-lg hover:drop-shadow-md hover:bg-auto hover:scale-102 transition-shadow duration-200 flex items-center space-x-4 ease-in-out cursor-pointer "
                    >
                        <div className="p-3 bg-indigo-50 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300 ease-in-out">
                            {category.icon}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">
                                {category.title}
                            </h4>
                            <p className="text-sm text-gray-500">{category.jobs} jobs</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}