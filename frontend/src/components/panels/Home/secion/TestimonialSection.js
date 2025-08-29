import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function TestimonialSection({ testimonials }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    const itemRefs = useRef([]);
    // 1. New state variable for window width
    const [innerWidth, setInnerWidth] = useState(0);

    // Set up the itemRefs array dynamically
    useEffect(() => {
        itemRefs.current = itemRefs.current.slice(0, testimonials.length);
        // 2. Set the window width in useEffect
        setInnerWidth(window.innerWidth);
    }, [testimonials]);

    // Handles moving to the next testimonial
    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        setCurrentIndex(nextIndex);
        itemRefs.current[nextIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    // Handles moving to the previous testimonial
    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        setCurrentIndex(prevIndex);
        itemRefs.current[prevIndex].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    // Updates the current index when the user manually scrolls
    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollLeft = container.scrollLeft;
            const newIndex = testimonials.findIndex((_, index) => {
                const item = itemRefs.current[index];
                if (!item) return false;
                const itemLeft = item.offsetLeft;
                const itemWidth = item.offsetWidth;
                const containerWidth = container.offsetWidth;
                return (scrollLeft > itemLeft - containerWidth / 2) && (scrollLeft < itemLeft + itemWidth - containerWidth / 2);
            });

            if (newIndex !== -1 && newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
            }
        }
    };

    // Handles clicking on an indicator dot
    const handleDotClick = (index) => {
        setCurrentIndex(index);
        itemRefs.current[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    // Helper function to determine number of visible cards
    const getVisibleCards = () => {
        if (innerWidth === 0) return 1; // Default to 1 on server-side
        if (innerWidth < 768) return 1;
        if (innerWidth < 1024) return 2;
        return 3;
    };

    return (
        <div className="container mx-auto px-4">
            <div className="text-center mb-8">
                <h3 className="text-5xl font-bold text-gray-900">What Our Clients Say</h3>
            </div>
            <div className="relative">
                <div
                    className="flex translate-x-12 w-11/12 overflow-y-scroll overscroll-y-none space-x-6 scrollbar-none"
                    style={{ scrollSnapType: "x mandatory" }}
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            ref={(e1) => (itemRefs.current[index] = e1)}
                            className="flex-shrink-0 w-full md:w-1/3 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
                            style={{ scrollSnapAlign: "center" }}
                        >
                            <FaRegUserCircle className="text-indigo-600 mb-4" size={40} />
                            <p className="text-gray-600">{testimonial.text}</p>
                            <div className="mt-4 flex items-center space-x-3">
                                <img
                                    src="https://placehold.co/40x40/f4f4f4/6b7280?text=P"
                                    alt={testimonial.author}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">
                                        {testimonial.author}
                                    </p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-xl p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                    <IoIosArrowBack size={24} className="text-blue-500" />
                </button>
                <button
                    onClick={handleNext}
                    // 3. Use the new state variable in the disabled check
                    disabled={currentIndex >= testimonials.length - getVisibleCards()}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-xl p-2 shadow-md hover:bg-gray-100 transition-colors"
                >
                    <IoIosArrowForward size={24} className="text-blue-500" />
                </button>
                <div className="absolute translate-y-6 left-1/2 -translate-x-1/2 flex space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                index === currentIndex ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
}