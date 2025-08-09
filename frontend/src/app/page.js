"use client";
import SearchHeader from "@/components/headers/SearchHeader";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import NavHeader from "@/components/headers/NavHeader/NavHeaderContainer";

export default function Home() {
  return (
    <>
      <NavHeader />
      <header className="bg-white border-b border-gray-300 shadow-sm position-fixed pt-10">
        <SearchHeader btn1={<SignInBtn />} btn3={<PostAJobBtn />} />
      </header>
    </>
  );
}
