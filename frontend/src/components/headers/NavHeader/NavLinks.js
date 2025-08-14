"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinks({ navLinks }) {
  // State to manage the active link, 'Home' is the default
  const [activeLink, setActiveLink] = useState("Home");

  const pathname = usePathname();
  return (
    // {/* Navigation Links */}
    <div className="flex lg:flex-row flex-col lg:items-center s lg:space-x-6">
      <AnimatePresence>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`relative cursor-pointer p-4 lg:p-0 transition-colors duration-200 ${
              pathname === link.href
                ? "text-blue-600 font-medium"
                : "text-gray-400 hover:text-gray-800"
            }`}
            onClick={() => setActiveLink(link)}
          >
            <span>{link.name}</span>
            {/* Active link underline */}
            {pathname === link.href && (
              <motion.div
                key={pathname}
                layoutId="underline"
                className="absolute lg:bottom-[-8px] left-3 lg:left-0 h-0.5 w-full bg-blue-600"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
          </Link>
        ))}
      </AnimatePresence>
    </div>
  );
}
