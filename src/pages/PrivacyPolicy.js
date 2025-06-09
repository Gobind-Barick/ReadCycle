import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <div className="text-black min-h-screen p-10 space-y-12 font-sans max-w-4xl mx-auto">
          <section>
            <h2 className="text-3xl font-semibold relative inline-block">
              Privacy Policy
              <span className="block w-32 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h2>
            <p className="mt-4 text-black-300 leading-relaxed max-w-4xl">
              At ReadCycle, we are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your
              personal information when you visit our website, make purchases,
              or interact with our services.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              Information We Collect
              <span className="block w-48 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>
            <ul className="list-disc list-inside mt-4 text-black-300 space-y-2">
              <li>Your name, phone number, and email address</li>
              <li>Shipping and billing addresses</li>
              <li>Payment information (processed securely via Razorpay)</li>
              <li>Book preferences and browsing history on our site</li>
              <li>Messages sent to us via WhatsApp or our contact form</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              How We Use Your Information
              <span className="block w-56 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>
            <p className="mt-4 text-black-300 leading-relaxed max-w-4xl">
              We use your data to:
            </p>
            <ul className="list-disc list-inside mt-2 text-black-300 space-y-2">
              <li>Process orders and deliver products to you</li>
              <li>Send OTPs for secure login and authentication</li>
              <li>Provide customer support and resolve queries</li>
              <li>Personalize your shopping experience</li>
              <li>Send updates, offers, and newsletters (with your consent)</li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              Sharing & Disclosure
              <span className="block w-44 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>
            <p className="mt-4 text-black-300 leading-relaxed max-w-4xl">
              We do not sell or rent your personal data to third parties. We may
              share your data only with trusted partners like:
            </p>
            <ul className="list-disc list-inside mt-2 text-black-300 space-y-2">
              <li>Razorpay (for payment processing)</li>
              <li>Delhivery (for order shipping and tracking)</li>
              <li>WhatsApp/Gupshup (for OTP verification and communication)</li>
            </ul>
            <p className="mt-4 text-black-300">
              These services are governed by their own privacy policies.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              Your Rights
              <span className="block w-32 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>
            <ul className="list-disc list-inside mt-4 text-black-300 space-y-2">
              <li>Access, update, or delete your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
            <p className="mt-4 text-black-300">
              You can exercise these rights by contacting us at{" "}
              <a
                href="mailto:readcycle.in@gmail.com"
                className="text-green-600 underline"
              >
                readcycle.in@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              Data Security
              <span className="block w-36 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>
            <p className="mt-4 text-black-300 leading-relaxed max-w-4xl">
              We take security seriously. Your data is stored securely and we use
              encrypted transmission and storage wherever possible. All
              transactions are protected via HTTPS and secure gateways.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              Updates to This Policy
              <span className="block w-48 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>
            <p className="mt-4 text-black-300 leading-relaxed max-w-4xl">
              We may update this policy from time to time. Changes will be
              reflected on this page with the updated date. We encourage you to
              review it periodically.
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              Contact Us
              <span className="block w-32 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>
            <p className="mt-4 text-black-300 leading-relaxed max-w-4xl">
              If you have questions or concerns about our Privacy Policy or your
              personal data, feel free to contact us at{" "}
              <a
                href="mailto:readcycle.in@gmail.com"
                className="text-green-600 underline"
              >
                readcycle.in@gmail.com
              </a>
              .
            </p>
          </section>
        </div>

        {/* WhatsApp FAB */}
        <a
          href="https://wa.me/918447466860"
          className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 p-4 rounded-full shadow-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-6 h-6"
          />
        </a>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
