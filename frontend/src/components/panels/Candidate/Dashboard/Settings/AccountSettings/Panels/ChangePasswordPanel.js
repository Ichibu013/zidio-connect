import PasswordBox from "@/components/inputBox/Text-Box/password-box";

export default function ChangePasswordPanel() {
  const labelStyle = "block text-gray-500 text-sm my-2";
  return (
    <div className="bg-hite min-w-full ">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        Change Password
      </h3>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <label className={labelStyle}>Current Password</label>
          <PasswordBox placeholder="Current Password" />
        </div>
        <div className="col-span-1">
          <label className={labelStyle}>New Password</label>
          <PasswordBox placeholder="New Password" />
        </div>
        <div className="col-span-1">
          <label className={labelStyle}>Confirm New Password</label>
          <PasswordBox placeholder="Confirm Password" />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );
}
