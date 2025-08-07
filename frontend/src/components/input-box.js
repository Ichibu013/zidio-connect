export default function InputBox({placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
    />
  );
}