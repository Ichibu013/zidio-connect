import React from "react";

export default function ProfileInputBox({htmlFor, label, defaultValue, value, onChange}) {
    return (
        <div>
            <label
                htmlFor={htmlFor}
                className="block text-gray-500 text-sm my-2"
            >
                {label}
            </label>
            <input
                type="text"
                id={htmlFor}
                value={value}
                defaultValue={defaultValue}
                className="w-full border text-gray-600 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                onChange={onChange}
            />
        </div>
    )
}