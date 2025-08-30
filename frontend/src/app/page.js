"use client";
import SearchHeader from "@/components/headers/SearchHeader";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import FooterWithLinks from "@/components/footer/FooterWithLinks";
import HomePanel from "@/components/panels/Home/HomePanel";
import {useState} from "react";
import NotificationBtn from "@/components/buttons/HeaderBtn/NotificationBtn";
import UserBtn from "@/components/buttons/HeaderBtn/UserBtn";

export default function Home() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <header className="bg-white border-b border-gray-300 shadow-sm position-fixed pt-10">
                <SearchHeader
                    isLoggedIn={isLoggedIn}
                    btn1={<SignInBtn/>}
                    btn3={<PostAJobBtn/>}
                    btn2={<NotificationBtn/>}
                    btn4={<UserBtn/>}
                />
            </header>
            <HomePanel/>
            <FooterWithLinks/>
        </>
    );
}
