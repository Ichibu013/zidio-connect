import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import SearchHeader from "@/components/headers/SearchHeader";
import SubHeader from "@/components/headers/SubHeader";

export default function CandidateFindEmployers() {
  return (
    <>
      <header className="bg-white border-b border-gray-300 shadow-sm position-fixed pt-10">
        <SearchHeader btn1={<SignInBtn />} btn3={<PostAJobBtn />} />
        <SubHeader
          MainHeading={"Find Employers"}
          RedirectText={"Home"}
          RedirectLink={"/"}
          SubHeader={"Find Employers"}
        />
      </header>
    </>
  );
}
