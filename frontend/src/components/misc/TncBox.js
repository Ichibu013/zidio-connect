export default function TncBox() {
  return (
    // Main content area, structured with a two-column layout for desktop
    <main className="mt-8 flex flex-col md:flex-row gap-12 md:px-8 sm:px-8 xs:px-8">
      {/* Left column for the main text content */}
      <div className="md:w-3/4">
        {/* Section 1: Terms & Conditions */}
        <section id="section-1" className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            01. Terms & Conditions
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Welcome to our service. These terms and conditions outline the rules
            and regulations for the use of our website. By accessing this
            website, we assume you accept these terms and conditions in full. Do
            not continue to use the website if you do not accept all of the
            terms and conditions stated on this page.
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-600">
            <li>
              The content of the pages of this website is for your general
              information and use only. It is subject to change without notice.
            </li>
            <li>
              Your use of any information or materials on this website is
              entirely at your own risk, for which we shall not be liable.
            </li>
            <li>
              This website contains material which is owned by or licensed to
              us. This material includes, but is not limited to, the design,
              layout, look, appearance and graphics.
            </li>
            <li>
              Unauthorized use of this website may give rise to a claim for
              damages and/or be a criminal offense.
            </li>
            <li>
              From time to time, this website may also include links to other
              websites. These links are provided for your convenience to provide
              further information.
            </li>
          </ul>
        </section>

        {/* Section 2: Limitations */}
        <section id="section-2" className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            02. Limitations
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            In no event shall we, nor our directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect,
            incidental, special, consequential or punitive damages, including
            without limitation, loss of profits, data, use, goodwill, or other
            intangible losses, resulting from your access to or use of or
            inability to access or use the service.
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-600">
            <li>
              The service is provided on an "AS IS" and "AS AVAILABLE" basis.
            </li>
            <li>
              We do not warrant that the service will be uninterrupted, secure
              or error-free.
            </li>
            <li>
              You are responsible for safeguarding the password that you use to
              access the service.
            </li>
            <li>
              We assume no responsibility for the content, privacy policies, or
              practices of any third party web sites or services.
            </li>
            <li>
              We reserve the right to terminate or suspend your account
              immediately, without prior notice or liability, for any reason
              whatsoever.
            </li>
          </ul>
        </section>

        {/* Section 3: Security */}
        <section id="section-3" className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            03. Security
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We are committed to ensuring that your information is secure. In
            order to prevent unauthorized access or disclosure, we have put in
            place suitable physical, electronic and managerial procedures to
            safeguard and secure the information we collect online.
          </p>
        </section>

        {/* Section 4: Privacy Policy */}
        <section id="section-4" className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            04. Privacy Policy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            This Privacy Policy describes how your personal information is
            collected, used, and shared when you visit or make a purchase from
            our site. We collect certain information from you when you visit the
            site, including your device information, web browser, and some of
            the cookies that are installed on your device.
          </p>
          <ul className="list-disc pl-8 space-y-2 text-gray-600">
            <li>
              We use the information that we collect generally to fulfill any
              orders placed through the Site.
            </li>
            <li>
              We do not share your Personal Information with outside parties
              except to the extent necessary to provide the service.
            </li>
            <li>
              We may also share your Personal Information to comply with
              applicable laws and regulations.
            </li>
            <li>
              You have the right to access personal information we hold about
              you and to ask that your personal information be corrected,
              updated, or deleted.
            </li>
            <li>
              This privacy policy is subject to change at any time without prior
              notice.
            </li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-4">
            We take your privacy seriously and will only use your personal
            information to administer your account and to provide the products
            and services you have requested from us. We will not sell or share
            your personal data with any third party for marketing purposes
            without your explicit consent.
          </p>
        </section>
      </div>

      {/* Right column for the table of contents */}
      <div className="md:w-1/4">
        <div className="sticky top-8">
          <h3 className="uppercase text-sm tracking-wide font-bold text-gray-400 mb-4">
            TABLE OF CONTENTS
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a
                href="#section-1"
                className="block text-sm hover:text-gray-900 transition-colors duration-200"
              >
                01. Terms & Condition
              </a>
            </li>
            <li>
              <a
                href="#section-2"
                className="block text-sm hover:text-gray-900 transition-colors duration-200"
              >
                02. Limitations
              </a>
            </li>
            <li>
              <a
                href="#section-3"
                className="block text-sm hover:text-gray-900 transition-colors duration-200"
              >
                03. Security
              </a>
            </li>
            <li>
              <a
                href="#section-4"
                className="block text-sm hover:text-gray-900 transition-colors duration-200"
              >
                04. Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
