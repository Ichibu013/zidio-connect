import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import NavHeader from "@/components/headers/NavHeader/NavHeaderContainer";
import SearchHeader from "@/components/headers/SearchHeader";

export default function AdminDashboard() {
  return (
    <>
      <NavHeader />
      <header className="bg-white border-b border-gray-300 shadow-sm position-fixed pt-10">
        <SearchHeader btn1={<SignInBtn />} btn3={<PostAJobBtn />} />
      </header>
    </>
  );
}
