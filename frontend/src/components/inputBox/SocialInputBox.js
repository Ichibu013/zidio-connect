import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
export default function SocialInputBox({}) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        Social Links
      </label>
      <div className="space-y-4 ">
        {[
          {
            name: "Facebook",
            placeholder: "Enter Facebook URL",
            icon: "FaFacebookF",
          },
          {
            name: "Twitter",
            placeholder: "Enter Twitter URL",
            icon: "FaTwitter",
          },
          {
            name: "LinkedIn",
            placeholder: "Enter LinkedIn URL",
            icon: "FaLinkedinIn",
          },
          {
            name: "Instagram",
            placeholder: "Enter Instagram URL",
            icon: "FaInstagram",
          },
        ].map((social) => (
          <div key={social.name} className="flex items-center gap-3 border border-gray-200 rounded-md px-3 min-w-full">
            <span className="mr-3">
              {social.icon === "FaFacebookF" && (
                <FaFacebookF className="text-blue-600" />
              )}
              {social.icon === "FaTwitter" && (
                <FaTwitter className="text-blue-400" />
              )}
              {social.icon === "FaLinkedinIn" && (
                <FaLinkedinIn className="text-blue-700" />
              )}
              {social.icon === "FaInstagram" && (
                <FaInstagram className="text-pink-500" />
              )}
            </span>
            <span className="w-24 text-gray-600">{social.name}</span>
            <input
              type="url"
              placeholder={social.placeholder}
              className="flex-1 w-full border-l border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
