import ArrowIcon from "@/components/icons/Arrow-icon";

export default function ArrowButton({ text , icon}) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-900 hover:scale-101 transition duration-300 ease-in-out flex items-center justify-center shadow-md"
    >
      {text}
      {/* Arrow icon component */}
      {icon}
    </button>
  );
}
