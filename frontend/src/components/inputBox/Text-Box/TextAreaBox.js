export default function TextAreaBox({placeholder}) {
    return (
      <textarea
        placeholder={placeholder}
        rows="4"
        className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
      ></textarea>
    );
}