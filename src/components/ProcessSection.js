import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const sellingSteps = [
  {
    title: "Search Book",
    description: "Search for your book title in our catalog",
    icon: "🔍",
  },
  {
    title: "Check Price",
    description: "Check the current buyback price",
    icon: "💰",
  },
  {
    title: "Add to Cart",
    description: "Add the book to your sell cart",
    icon: "🛒",
  },
  {
    title: "Pickup/Drop-off",
    description: "Schedule a pickup or drop it off",
    icon: "📦",
  },
  {
    title: "Get Paid",
    description: "Get paid after a quick quality check",
    icon: "✅",
  },
];

const SellProcessSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white py-16 px-6 md:px-20 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
        How to Sell Your Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {sellingSteps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 text-white p-6 rounded-lg shadow-md text-center border border-gray-700"
          >
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-300">{step.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate("/sell")}
        >
          Start Selling
        </button>
      </div>
    </section>
  );
};

export default SellProcessSection;
