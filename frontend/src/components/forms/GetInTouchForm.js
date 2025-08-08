import ArrowButton from "../buttons/Arrow-Button";
import InputBox from "../inputBox/input-box";
import TextAreaBox from "../inputBox/TextAreaBox";
import { BsFillSendFill } from "react-icons/bs";

export default function GetInTouch() {
  return (
    <form>
      {/* Name and Email fields */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        {/* Name InputBox component */}
        <InputBox placeholder={"Name"} />
        {/* Email InputBox component */}
        <InputBox placeholder={"Email"} />
      </div>
      {/* Subject field */}
      <div className="mb-4">
        {/* Subject InputBox component */}
        <InputBox placeholder={"Subject"} />
      </div>
      {/* Message field */}
      <div className="mb-6">
        <TextAreaBox placeholder={"Message"} />
      </div>
      {/* Send Message button */}
      <ArrowButton
        text={"Send Message"}
        icon={<BsFillSendFill className="pl-2" size={25}/>}
        type="submit"
      />
    </form>
  );
}
