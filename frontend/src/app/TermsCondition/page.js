import SubHeader from "@/components/headers/SubHeader";
import TncBox from "@/components/misc/TncBox";

export default function TermsCondition() {
  return (
    <div className="bg-white min-h-screen">
      {/* Sub Header Component */}
      <SubHeader
        MainHeading={"Terms & Conditions"}
        RedirectText={"Signup"}
        RedirectLink={"/Signup"}
        SubHeader={"Terms & Conditions"}
      />
      <div className="max-w-6xl mx-auto ">
        {/* Terms and Condition component */}
        <TncBox />
      </div>
    </div>
  );
}
