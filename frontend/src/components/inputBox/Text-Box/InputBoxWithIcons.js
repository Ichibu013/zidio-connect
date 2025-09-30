import React from "react";

export default function InputBoXWithIcon({
  htmlFor,
  label,
  defaultValue,
  value,
  onChange,
  icon,
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-gray-500 text-sm my-2">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1 focus-within:ring-2 focus-within:ring-blue-500 transition-shadow">
        <span className="text-blue-500 mr-3">{icon}</span>
        <input
          type="text"
          id={htmlFor}
          value={value}
          defaultValue={defaultValue}
          className="w-full text-gray-600 p-2 focus:outline-none transition-shadow"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
