"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinks({ navLinks }) {
  // State to manage the active link, 'Home' is the default
  const [activeLink, setActiveLink] = useState("Home");

  const pathname = usePathname();
  return (
    // {/* Navigation Links */}
    <div className="flex items-center space-x-6">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`relative cursor-pointer transition-colors duration-200 ${
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
              layoutId="underline"
              className="absolute bottom-[-8px] left-0 h-0.5 w-full bg-blue-600"
            />
          )}
        </Link>
      ))}
    </div>
  );
}
