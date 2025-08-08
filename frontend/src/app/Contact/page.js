import SearchHeader from "@/components/headers/SearchHeader";
import SubHeader from "@/components/headers/SubHeader";
import SmallTwoColumnLayout from "@/components/Layout/SmallTwoColumnLayout";
import GoogleMap from "@/components/misc/Map";
import ContactLeftPanel from "@/components/panels/Contact/ContactLeftPanel";
import ContactRightPanel from "@/components/panels/Contact/ContactRightPanel";
import EamilSubFooterPanel from "@/components/panels/Contact/EmailSub";

export default function Contact() {
  return (
    <div className="bg-white min-h-screen">
      <header className="flex flex-col">
        {/* SearchHeader component */}
        <SearchHeader />
        {/* SubHeader component */}
        <SubHeader
          MainHeading={"Contact"}
          RedirectText={"Home"}
          RedirectLink={"#"}
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
      <footer className="bg-gray-900 text-gray-300 py-12">
        <EamilSubFooterPanel />
      </footer>
    </div>
  );
}
