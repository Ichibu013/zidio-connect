import { IoCloseCircleOutline } from "react-icons/io5";
export default function DeleteAccountPanel() {
    return (
        <div className="bg-hite min-w-full ">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Delete Account
            </h3>
            <div className="text-gray-600">
                Deleting your account will result in the permanent loss of the following data, and we will not be able to restore it for you:
                <ul className="list-disc list-inside mt-2 font-bold">
                    <li>Your profile information</li>
                    <li>Your resume and cover letters</li>
                    <li>Your job applications and history</li>
                    <li>Your saved jobs and searches</li>
                    <li>Your messages and communications</li>
                </ul>
                <br />
                Please ensure that you have saved any important information before proceeding with the deletion of your account.
            </div>
            <div className="mt-8 flex justify-end items-center">
                <button className="cursor-pointer bg-white hover:bg-red-600 text-red-600 hover:text-white font-semibold py-3 px-8 rounded-lg flex items-center hover:shadow-md transition-colors duration-300 ease-in-out">
                    <IoCloseCircleOutline className="inline-block mr-2" size={20}/>
                    Delete Account
                </button>
            </div>
        </div>
    );
}