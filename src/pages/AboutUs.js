import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <>
      
      <div className="bg-gray-50 min-h-screen">
        <div class="bg-grey text-black min-h-screen p-10 space-y-12 font-sans max-w-4xl mx-auto">
          <section>
            <h2 class="text-3xl font-semibold relative inline-block">
              About Us
              <span class="block w-28 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h2>
          </section>

          <section>
            <h3 class="text-2xl font-semibold relative inline-block">
              Who are we?
              <span class="block w-28 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>
            <p class="mt-4 text-black-300 leading-relaxed max-w-4xl">
              We are a team of passionate readers and professionals who strive
              to make books more accessible and enjoyable for everyone. The
              world of reading has long been seen as a luxury for the few. We
              aim to change that perception. We want to empower readers. We want
              book lovers to enjoy the best of literature without worrying about
              cost or availability.
              <br />
              <br />
              Everything we do is a sincere effort to build a vibrant and
              inclusive community of readers—a place where anyone can find and
              afford the books they love, whether it's timeless classics, modern
              bestsellers, or rare finds.
            </p>
          </section>

          <section>
            <h3 class="text-2xl font-semibold relative inline-block">
              Our offerings:
              <span class="block w-29 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>

            <div class="mt-6 space-y-6">
              <div>
                <h4 class="font-bold text-lg">
                  Wide range of books for every reader:
                </h4>
                <p class="text-black-300 mt-2 max-w-4xl">
                  Whether you’re looking for the latest bestsellers, timeless
                  classics, or academic guides, we’ve got you covered. From
                  fiction to non-fiction, children’s books to competitive exam
                  materials — our collection is curated for all ages and
                  interests. Enjoy affordable pricing, free shipping nationwide,
                  and 1-day delivery in select cities.
                </p>
              </div>

              <div>
                <h4 class="font-bold text-lg">
                  Sell or exchange your old books:
                </h4>
                <p class="text-black-300 mt-2 max-w-4xl">
                  Got books you no longer need? Trade them in with us. You can
                  sell or exchange your used books for instant credit or cash,
                  making room for your next great read while helping others
                  discover it.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              Our Pillars
              <span className="block w-26 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>

            <div className="mt-6 space-y-6">
              {[
                {
                  title: "Customer Obsession",
                  text: "Our customers are at the heart of everything we do. We strive to offer them maximum value and a seamless reading experience.",
                },
                {
                  title: "Value For Money",
                  text: "Every book we list, every service we provide is focused on offering great deals and smooth transactions, ensuring our customers return happy and satisfied.",
                },
                {
                  title: "Passion",
                  text: "We are book lovers first. From curating the right selection to providing recommendations, our passion drives every choice we make.",
                },
                {
                  title: "Evolution",
                  text: "We continually evolve—expanding our catalog, improving our platform, and exploring new ways to make reading more accessible to everyone.",
                },
                {
                  title: "Affordable Doesn’t Mean Average",
                  text: "Books should be for everyone. We believe affordability shouldn’t come at the cost of quality, and we work to make great books available at great prices.",
                },
              ].map((pillar, i) => (
                <div key={i}>
                  <h4 className="font-bold text-lg">{pillar.title}:</h4>
                  <p className="text-gray-700 mt-2 max-w-4xl">{pillar.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* The BookNest Promise */}
          <section>
            <h3 className="text-2xl font-semibold relative inline-block">
              The BookNest Promise
              <span className="block w-45 h-1 bg-green-500 mt-1 rounded-sm"></span>
            </h3>

            <div className="mt-6 space-y-6">
              {[
                {
                  title: "Quality",
                  text: "Each book goes through a thorough quality check, whether new or pre-owned. We're committed to delivering only the best to your doorstep.",
                },
                {
                  title: "Fast Delivery",
                  text: "We offer quick dispatch, free shipping across India, and same-day or next-day delivery in select cities.",
                },
                {
                  title: "Reliability",
                  text: "Our dedicated support team is always ready to assist you with orders, queries, and recommendations to make your reading journey smooth.",
                },
                {
                  title: "Easy Returns",
                  text: "Facing any issues with your order? We offer hassle-free returns, refunds, or replacements—because your satisfaction matters. (Terms and Conditions Apply).",
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
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
