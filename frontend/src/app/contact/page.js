import SearchHeader from "@/components/headers/SearchHeader";
import SubHeader from "@/components/headers/SubHeader";
import SmallTwoColumnLayout from "@/components/Layout/SmallTwoColumnLayout";
import GoogleMap from "@/components/misc/Map";
import ContactLeftPanel from "@/components/panels/Contact/ContactLeftPanel";
import ContactRightPanel from "@/components/panels/Contact/ContactRightPanel";
import EamilSubFooterPanel from "@/components/panels/Contact/EmailSub";
import SignInBtn from "@/components/buttons/HeaderBtn/SignInBtn";
import PostAJobBtn from "@/components/buttons/HeaderBtn/PostAJobBtn";
import NavHeader from "@/components/headers/NavHeader/NavHeaderContainer";
import FooterWithLinks from "@/components/footer/FooterWithLinks";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <NavHeader />
      <div className="pt-10">
        <header className="flex flex-col ">
          {/* SearchHeader component */}
          <SearchHeader btn1={<SignInBtn />} btn3={<PostAJobBtn />} />
          {/* SubHeader component */}
          <SubHeader
            MainHeading={"Contact"}
            RedirectText={"Home"}
            RedirectLink={"/"}
            SubHeader={"Contact"}
          />
        </header>

        {/* Info panels */}
        <SmallTwoColumnLayout
          left={<ContactLeftPanel />}
          right={<ContactRightPanel />}
        />
        {/* map panel */}
        <GoogleMap />
        <footer className="bg-gray-900 text-gray-300 pt-12">
          <EamilSubFooterPanel />
          <FooterWithLinks />
        </footer>
      </div>
    </div>
  );
}
