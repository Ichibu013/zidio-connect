import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import SearchHeader from "@/components/headers/SearchHeader";
import SubHeader from "@/components/headers/SubHeader";
import TncBox from "@/components/misc/TncBox";

export default function TermsCondition() {
  return (
    <div className="bg-white min-h-screen">
      {/* SearchHeader component */}
      <SearchHeader btn1={<SignInBtn />} btn3={<PostAJobBtn />} />
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
