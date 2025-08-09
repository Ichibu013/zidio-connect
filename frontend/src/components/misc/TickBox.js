import { useState } from "react";
import { motion } from "framer-motion";

export default function TickBox({ blackText, blueText, href }) {
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Define the animation variants for the checkbox and the checkmark
  const checkboxVariants = {
    checked: {
      backgroundColor: "#2563EB", // Tailwind's blue-600
      borderColor: "#2563EB",
      transition: { duration: 0.2 },
    },
    unchecked: {
      backgroundColor: "white",
      borderColor: "#D1D5DB", // Tailwind's gray-300
      transition: { duration: 0.2 },
    },
  };

  const checkmarkVariants = {
    checked: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: 0.2, type: "spring", duration: 0.5, bounce: 0 },
        opacity: { delay: 0.2, duration: 0.1 },
      },
    },
    unchecked: {
      pathLength: 0,
      opacity: 0,
    },
  };

  return (
    <div className="flex items-center mb-2">
      {/* Container for the animated checkbox */}
      <motion.div
        variants={checkboxVariants}
        animate={termsAccepted ? "checked" : "unchecked"}
        initial={false}
        onClick={() => setTermsAccepted(!termsAccepted)}
        className="w-4 h-4 flex items-center justify-center rounded border cursor-pointer"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
          variants={checkmarkVariants}
          animate={termsAccepted ? "checked" : "unchecked"}
          initial={false}
        >
          {/* The SVG path for the checkmark */}
          <motion.path d="M5 13l4 4L19 7" variants={checkmarkVariants} />
        </motion.svg>
      </motion.div>

      <label htmlFor="terms" className="text-sm text-gray-600 ml-2">
        {blackText}{" "}
        <a href={href} className="text-blue-600 hover:underline">
          {blueText}
        </a>
      </label>
    </div>
  );
}
