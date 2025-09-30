import InputBoXWithIcon from "@/components/inputBox/Text-Box/InputBoxWithIcons";
import ProfileInputBox from "@/components/inputBox/Text-Box/profile-input-box";
import SelectBox from "@/components/inputBox/Text-Box/Select-box";
import { MdOutlineEmail } from "react-icons/md";

export default function ContactIInfoPanel() {
  return (
    <div className="bg-hite min-w-full ">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Contact Information
      </h3>
      <ProfileInputBox
        label="Map Location"
        placeholder="Enter your map location"
        type="text"
      />
      <SelectBox
        label="Phone Number"
        placeholder="Select your country code"
        options={[
          { value: "", label: "Select..." },
          { value: "usa", label: "+1" },
          { value: "uk", label: "+2" },
          { value: "india", label: "+91" },
        ]}
      />
      <InputBoXWithIcon
        icon={<MdOutlineEmail size={20} />}
        label="Email Address"
        placeholder="Enter your email address"
        type="email"
      />
      <div className="mt-8 flex justify-end">
        <button className="cursor-pointer bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:shadow-md hover:bg-blue-700 transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );
}
