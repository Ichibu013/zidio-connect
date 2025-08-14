import { IoMail } from "react-icons/io5";
import { AiOutlineBarcode } from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterWithLinks(params) {
  const footerlinks = [
    {
      title: "Quick Links",
      links: [
        { name: "About", url: "#" },
        { name: "Contact", url: "/contact" },
        { name: "Pricing", url: "#" },
      ],
    },
    {
      title: "Candidate",
      links: [
        { name: "Saved Jobs", url: "/candidate/job-alerts" },
        { name: "Browse Jobs", url: "/candidate/find-job" },
        { name: "Browse Employers", url: "/candidate/find-employers" },
        { name: "Candidate Dashboard", url: "/candidate/dashboard" },
      ],
    },
    {
      title: "Recruiter",
      links: [
        { name: "Post a Job", url: "#" },
        { name: "Applications", url: "/recruiter/application" },
        { name: "Browse Candidates", url: "/recruiter/find-candidate" },
        { name: "Recruiter Dashboard", url: "/recruiter/dashboard" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", url: "#" },
        { name: "Terms & Conditions", url: "/terms-and-condition" },
      ],
    },
  ];

  return (
    <div className="bg-gray-900 texr-gray-300 w-full ">
      <div className="mx-auto max-w-6xl">
        {/* Top section of footer */}
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 py-12 md:px-18 lg:px-8">
            {/* Company Info Section */}
            <div className="lg:col-span-1">
              <div className="flex flex-row">
                <AiOutlineBarcode className="w-8 h-8 mr-2 text-white" />
                <span className="text-white text-2x1 font-bold py-1">
                  ZIDIO connect
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-gray-400">
                Call now:{" "}
                <span className="font-bold text-white">+91-86688-66137</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Cinnabar Hills, Business Park, Challanghatta,Bengaluru,
                Karnataka - 560071
              </p>
            </div>

            {/* links section */}
            {footerlinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-white text-lg font-bold mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        className="text-gray-400 hover:text-white transistion-colors duration-300 flex items-center "
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Bottom Section */}
          <div className="border-t border-gray-700 ">
            <div className="container mx-auto py-6 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
              <p className="text-gray-400 text-center md:text-left md-4 md:mb=0">
                &copy; 2025 ZIDIO Connect - Job Portal. ALL rights reserved
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors durationn-300"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors durationn-300"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors durationn-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors durationn-300"
                >
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
