import InputBoXWithIcon from "@/components/inputBox/Text-Box/InputBoxWithIcons";
import { BiBriefcase } from "react-icons/bi";
import { MdOutlinePinDrop } from "react-icons/md";

export default function AlertsPanel() {
  return (
    <div className="bg-white min-w-full ">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Job Alerts</h3>
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-1">
          <InputBoXWithIcon
            label="Role"
            type="text"
            placeholder="Your Job Roles"
            icon={<BiBriefcase size={20} />}
          />
        </div>
        <div className="col-span-1">
          <InputBoXWithIcon
            label="Location"
            type="text"
            placeholder="City, State or Country Name"
            icon={<MdOutlinePinDrop size={20} />}
          />
        </div>
        <div className="col-span-1"></div>
      </div>
      {/* Add your alert settings inputs here */}
      <div className="mt-8 flex justify-end">
        <button className="cursor-pointer bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-lg hover:bg-blue-700 transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );
}
