export default function     SelectBox({ options, label, onChange,defaultValue }) {
  return (
    <div>
      <label className="block text-gray-500 text-sm mb-2">{label}</label>
      <select
        onChange={onChange}
        defaultValue={defaultValue}
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
