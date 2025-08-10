import Image from "next/image";
import heroImg from "../../../public/hero.jpg";
import { CgBriefcase } from "react-icons/cg";
import { LuBuilding2 } from "react-icons/lu";
import HeroStatBox from "../misc/HeroStatBox";

export default function HeroPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-white relative items-center justify-center overflow-hidden">
      {/* The background image */}
      <Image
        src={heroImg.src}
        alt="Hero Image"
        fill
        style={{ objectFit: "cover" }}
      />

      {/* This is the overlay with opacity, kept separate from content */}
      <div className="absolute inset-0 bg-black opacity-50" />

      {/* This is the content overlay, now at full opacity and aligned to the bottom */}
      <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-8 text-center">
          Over 1,75,324 candidates waiting for good employees.
        </h2>
        <div className="flex space-x-4">
          <HeroStatBox
            icon={<CgBriefcase size={50} />}
            numbers={"1,75,324"}
            heading={"Live Job"}
          />
          <HeroStatBox
            icon={<LuBuilding2 size={50} />}
            numbers={"97,354"}
            heading={"Companies"}
          />
          <HeroStatBox
            icon={<CgBriefcase size={50} />}
            numbers={"7,532"}
            heading={"New Jobs"}
          />
        </div>
      </div>
    </div>
  );
}
