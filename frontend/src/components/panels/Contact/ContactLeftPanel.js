import ArrowButton from "../../buttons/Arrow-Button";

export default function ContactLeftPanel() {
  return (
    <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
      <span className="text-sm font-semibold text-blue-600">Who we are</span>
      <h1 className="text-4xl lg:text-5xl font-bold leading-tight mt-2 text-black">
        We care about
        <br />
        customer services
      </h1>
      <p className="mt-4 text-gray-600 max-w-lg">
        Want to chat? We'd love to hear from you! Get in touch with our Customer
        Success Team to inquire about speaking events, advertising rates, or
        just say hello.
      </p>
    </div>
  );
}
