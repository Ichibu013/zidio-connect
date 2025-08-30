import React, {useEffect, useRef, useState} from 'react';

/**
 * Renders a section detailing how a service works with dynamically drawn
 * dotted curved arrows connecting each step.
 */
export default function HowItWorksSection({ howItWorks }) {
    // A ref to hold a reference to the main container div
    const containerRef = useRef(null);
    // A ref to hold a reference to each icon div, allowing us to get its position
    const iconRefs = useRef({});

    // State to store the calculated SVG paths for each arrow
    const [arrowPaths, setArrowPaths] = useState([]);

    /**
     * Calculates the SVG path data for each connecting arrow.
     * The paths are drawn from the right side of a source icon div to the left side
     * of the next target icon div.
     */
    const calculatePaths = () => {
        const paths = [];
        // Get the position of the main container to normalize coordinates
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();

        // Loop through the steps, stopping before the last one as there's no next step
        for (let i = 0; i < howItWorks.length - 1; i++) {
            const sourceIcon = iconRefs.current[i];
            const targetIcon = iconRefs.current[i + 1];

            // Only proceed if both the source and target elements are in the DOM
            if (sourceIcon && targetIcon) {
                const sourceRect = sourceIcon.getBoundingClientRect();
                const targetRect = targetIcon.getBoundingClientRect();

                // Define the start and end points for the arrow based on the icon divs' positions,
                // and normalize them to be relative to the container.
                const startX = sourceRect.right - containerRect.left;
                let startY = sourceRect.top + sourceRect.height / 2 - containerRect.top;
                const endX = targetRect.left - containerRect.left;
                let endY = targetRect.top + targetRect.height / 2 - containerRect.top;

                // For the second arrow (index 1), make it go from the top
                if (i === 1) {
                    startY = (sourceRect.top - containerRect.top) + (sourceRect.height / 2); // Corrected to connect with the icon
                }

                // Calculate control points for a cubic Bézier curve to create the arc
                const controlPoint1X = startX + (endX - startX) * 0.4;
                const controlPoint2X = endX - (endX - startX) * 0.4;

                let controlPoint1Y;
                let controlPoint2Y;

                // Flip the 'S' curve for the second arrow
                if (i === 1) {
                    controlPoint1Y = startY + 60; // Pulls the curve down
                    controlPoint2Y = endY - 60; // Pulls the curve up
                } else {
                    controlPoint1Y = startY - 60; // Pulls the curve up
                    controlPoint2Y = endY + 60; // Pulls the curve down
                }

                // Construct the SVG path string with the new 'S' curve
                const path = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`;

                paths.push(path);
            }
        }
        setArrowPaths(paths);
    };

    // Use a useEffect hook to run the calculation on mount and whenever the window is resized
    useEffect(() => {
        calculatePaths();
        window.addEventListener('resize', calculatePaths);
        // Clean up the event listener on unmount
        return () => window.removeEventListener('resize', calculatePaths);
    }, []);

    return (
        <div ref={containerRef} className="container mx-auto px-4 relative">
            <div className="text-center">
                <h3 className="text-3xl font-bold text-gray-900">How Jobpilot works</h3>
            </div>

            {/* This is the SVG container. It's positioned absolutely over the grid
                and is hidden on mobile screens to avoid vertical arrow issues. */}
            <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 hidden md:block"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Define the reusable arrowhead marker */}
                <defs>
                    <marker
                        id="arrowhead"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerUnits="strokeWidth"
                        markerWidth="8"
                        markerHeight="6"
                        orient="auto"
                    >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#93c5fd" />
                    </marker>
                </defs>

                {/* Map over the calculated paths to draw each dotted arrow */}
                {arrowPaths.map((path, index) => (
                    <path
                        key={index}
                        d={path}
                        fill="none"
                        stroke="#93c5fd" // Tailwind's gray-300
                        strokeWidth="2"
                        strokeDasharray="4, 4" // Changed from dotted to a dashed style
                        markerEnd="url(#arrowhead)" // Apply the marker to the end of the path
                    />
                ))}
            </svg>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {howItWorks.map((step, index) => (
                    <div
                        key={index}
                        className={`group text-center p-6 rounded-xl relative hover:bg-white transition-colors duration-300 ease-in-out cursor-default`}
                    >
                        <div
                            ref={(el) => (iconRefs.current[index] = el)}
                            className="bg-white p-4 inline-block rounded-full text-blue-500 shadow-md group-hover:text-white group-hover:bg-blue-500 transition-colors duration-300 ease-in-out"
                        >
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
    );
}
