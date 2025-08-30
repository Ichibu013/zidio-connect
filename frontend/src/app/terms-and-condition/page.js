import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import FooterWithLinks from "@/components/footer/FooterWithLinks";
import SearchHeader from "@/components/headers/SearchHeader";
import SubHeader from "@/components/headers/SubHeader";
import TncBox from "@/components/misc/TncBox";

export default function TermsCondition() {
  return (
    <>
      <div className="bg-white min-h-screen pt-10">
        {/* SearchHeader component */}
        <SearchHeader btn1={<SignInBtn />} btn3={<PostAJobBtn />} />
        {/* Sub Header Component */}
        <SubHeader
          MainHeading={"Terms & Conditions"}
          RedirectText={"Signup"}
          RedirectLink={"/auth/signup"}
          SubHeader={"Terms & Conditions"}
        />
        <div className="max-w-7xl mx-auto ">
          {/* Terms and Condition component */}
          <TncBox />
        </div>
        <FooterWithLinks />
      </div>
    </>
  );
}
