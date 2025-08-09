import GetInTouch from "@/components/forms/GetInTouchForm";
import Heading from "@/components/misc/Heading";

export default function ContactRightPanel() {
    return (
      <div className="w-full lg:w-1/2 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <Heading text={"Get in touch"} />
        <GetInTouch />
      </div>
    );
}