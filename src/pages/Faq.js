import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqData = [
  {
    question: "How do I sell my books?",
    answer:
      "Simply search for your book, check the buyback price, add it to your cart, and schedule a pickup or drop-off.",
  },
  {
    question: "What types of books can I sell?",
    answer:
      "You can sell most genres, including Fiction, Non-Fiction, Science, History, Biographies, and more.",
  },
  {
    question: "How is the buyback price determined?",
    answer:
      "The price is based on the book’s condition, demand, and current market value.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No, you can sell books without an account. However, creating an account allows you to track your transactions.",
  },
  {
    question: "How will I receive payment?",
    answer:
      "Payment is made via bank transfer or UPI after a quick quality check.",
  },
  {
    question: "What if my book is in poor condition?",
    answer:
      "We accept books with minor wear and tear. However, severely damaged or missing pages may lead to rejection.",
  },
  {
    question: "Is there a minimum number of books I need to sell?",
    answer:
      "No, you can sell even a single book. However, bulk orders may be eligible for additional perks.",
  },
  {
    question: "Do you accept textbooks or academic books?",
    answer:
      "Yes, we accept academic books, school textbooks, and competitive exam preparation materials.",
  },
  {
    question: "Can I cancel my order after scheduling a pickup?",
    answer:
      "Yes, you can cancel your order anytime before the pickup is completed through your dashboard or by contacting support.",
  },
  {
    question: "Do you provide packaging materials for pickup?",
    answer:
      "Currently, we request customers to pack the books securely using available materials to avoid damage during transit.",
  },
  {
    question: "How long does the payment process take?",
    answer:
      "Once the books are received and pass quality check, payment is processed within 24–48 hours.",
  },
  {
    question: "Can I drop off books at a store location?",
    answer:
      "Yes, if you are near one of our partner drop-off points, you can choose that option during checkout.",
  },
];

const Faq = () => {
  return (
    <>
      
      <div className="bg-grey text-white min-h-screen p-6 space-y-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black">
          FAQs{" "}
          <span className="block w-14 h-1 bg-green-500 mt-1 rounded-sm"></span>
        </h1>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              disableGutters
              elevation={0}
              square={false}
              sx={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: 2,
                overflow: "hidden",
                color: "#ffffff",
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "1.125rem",
                    fontWeight: 600,
                  },
                }}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderTop: "1px solid #4b5563",
                }}
              >
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
