import React from "react";
import {RiMapPin5Line} from "react-icons/ri";
import {IoSearch} from "react-icons/io5";
import Image from "next/image";
import HomeHeroImage from "../../../../../public/HomeHero.png";

const HeroImage = HomeHeroImage

export default function HeroSection() {
    return (

        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                    Find a job that suits your interest & skills.
                </h2>
                <p className="mt-4 text-gray-600 text-lg">
                    Here you can find the perfect job for you. <br/>
                    We have a wide range of jobs for you to choose from.
                </p>
                <div
                    className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white rounded-lg shadow-lg p-2">
                    <div className="flex flex-grow ">
                        <div className="relative flex-grow">
                            <IoSearch
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Job title or keyword"
                                className="text-black w-full px-4 py-3 pl-12 focus:outline-none focus:border-transparent transition duration-200"
                            />
                        </div>
                        <div className="relative flex-grow">
                            <RiMapPin5Line
                                size={20}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Location"
                                className="text-black w-full px-4 py-3 pl-12 border-l border-gray-300  focus:outline-none focus:border-transparent transition duration-200"
                            />
                        </div>
                    </div>
                    <button
                        className="w-30 p-2 bg-blue-600 text-white rounded-lg  hover:bg-blue-800 transition duration-300">
                        Find Job
                    </button>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                    Popular Searches: Designer, Developer, Web, IOS, PHP, Senior,
                    Engineer.
                </p>
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
                {/* The image is a placeholder for the hero illustration */}
                <Image
                    src={HeroImage}
                    alt="Hero Illustration"
                />
            </div>
        </div>
    )
}
