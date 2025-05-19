import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsAndCondition = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      <div className="bg-grey text-black min-h-screen p-10 space-y-12 font-sans max-w-4xl mx-auto">
        <section>
          <h2 className="text-3xl font-semibold relative inline-block">
            Terms And Conditions
            <span className="block w-24 h-1 bg-green-500 mt-1 rounded-sm"></span>
          </h2>
        </section>

        <section>
          <h3 className="text-2xl font-semibold relative inline-block">
            Acceptance of Terms of Usage
            <span className="block w-28 h-1 bg-green-500 mt-1 rounded-sm"></span>
          </h3>
          <p className="mt-4 text-black-300 leading-relaxed max-w-4xl">
            The website www.bookstore.com (hereinafter referred to as “Website”)
            is owned by Bookstore Ltd, located at 123 Book Lane, City, Country
            (hereinafter referred to as “BOOKSTORE”). <br />
            <br />
            Your use of the Website, its services, and tools are governed by the
            following terms and conditions as applicable to the Website,
            including applicable policies incorporated herein by reference. If
            you purchase books on the Website, you shall be subject to the
            policies applicable to such transactions. By using the Website, you
            agree to contract with BOOKSTORE, and these terms and conditions,
            including the policies, constitute your binding obligations with
            BOOKSTORE. <br />
            <br />
            These Terms of Usage govern your access and use of this Site. By
            accessing or using this Site, you agree to be bound by these Terms
            of Usage and any additional guidelines, restrictions, or rules that
            may be posted in connection with specific sections or services. You
            are responsible for maintaining the confidentiality of your password
            and account, and are fully responsible for all activities that occur
            under your account. <br />
            <br />
            You agree to immediately notify BOOKSTORE of any unauthorized use of
            your password or account. BOOKSTORE reserves the right to modify
            this Site and these Terms of Usage at any time without prior notice.
            You should review these Terms of Usage each time you access this
            Site. <br />
            <br />
            You also agree that we may send all communications (including
            marketing) electronically by posting them on our website or by
            emailing the address provided during registration or contacting you
            through the registered phone number. You agree that service-related
            communications, such as order updates, will also be sent to the
            registered mobile number and email. <br />
            <br />
            All transactions and terms on www.bookstore.com are subject to the
            laws of City, Country. BOOKSTORE is not liable for any delays or
            damages due to unforeseen circumstances like natural disasters,
            pandemics, or government actions. The Buyer’s order constitutes
            acceptance of the Seller's terms. These Terms and Conditions are
            governed by the jurisdiction of the Courts in City, Country. All
            orders are subject to acceptance by BOOKSTORE, and we reserve the
            right to reject any order without recourse. Prices may also change
            at any time even after an order is received.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold relative inline-block">
            Cancellation/Refund Policy
            <span className="block w-28 h-1 bg-green-500 mt-1 rounded-sm"></span>
          </h3>

          <div className="mt-6 space-y-6">
            {[
              {
                id: "1",
                text: "We aim to provide our customers with the best value for their money with every book purchase.",
              },
              {
                id: "2",
                text: "Customer satisfaction is at the heart of everything we do. Our goal is to make every transaction seamless and enjoyable.",
              },
            ].map((pillar, i) => (
              <div key={i}>
                <p className="text-black-700 mt-2 max-w-4xl">{`${pillar.id}. ${pillar.text}`}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold relative inline-block">
            The Bookstore Promise
            <span className="block w-36 h-1 bg-green-500 mt-1 rounded-sm"></span>
          </h3>

          <div className="mt-6 space-y-6">
            {[
              {
                title: "Quality",
                text: "We pride ourselves on offering a vast selection of books with a robust quality check, ensuring that only the best books are sold.",
              },
              {
                title: "Fast Delivery",
                text: "Enjoy free shipping on orders across the country, with 1-day delivery available in select cities.",
              },
              {
                title: "Customer Support",
                text: "Our customer support team is always available to assist you with any issues or queries related to your orders or services.",
              },
              {
                title: "Easy Returns",
                text: "If you face any issues with your order, we offer an easy returns process to ensure your satisfaction (Terms and Conditions Apply).",
              },
            ].map((promise, i) => (
              <div key={i}>
                <h4 className="font-bold text-lg">{promise.title}:</h4>
                <p className="text-gray-700 mt-2 max-w-4xl">{promise.text}</p>
              </div>
            ))}
          </div>
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
      <Footer />
    </div>
  );
};

export default TermsAndCondition;
