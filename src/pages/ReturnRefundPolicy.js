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

const policyData = [
  {
    question: "What is the return period for sold books?",
    answer:
      "Once a book has been sold and passes quality checks, the transaction is considered final. Returns are not applicable unless there is a processing error.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Yes, you can cancel your pickup request before the courier is dispatched. Cancellations after pickup are not allowed.",
  },
  {
    question: "What if my payment is delayed?",
    answer:
      "Payments are usually processed within 24–48 hours after quality check. In case of delays, please contact our support team.",
  },
  {
    question: "How are refunds processed?",
    answer:
      "Refunds are processed to the original payment method. Please allow 3–5 business days for the amount to reflect in your account.",
  },
  {
    question: "Are there any non-returnable items?",
    answer:
      "Yes, books that do not meet our quality guidelines (e.g., torn, scribbled, or damaged copies) are not eligible for return or refund.",
  },
  {
    question: "What happens if a book fails quality check?",
    answer:
      "If your book fails the quality check, we will notify you. You can either request it to be returned (with delivery charges) or have us recycle it responsibly.",
  },
  {
    question: "What if I entered incorrect bank/UPI details?",
    answer:
      "Please double-check your payment details before submitting. If incorrect information was provided, we are not liable for any failed or misdirected payments.",
  },
  {
    question: "Is there a return fee involved?",
    answer:
      "If a book needs to be returned due to a failed quality check, return courier charges will be borne by the seller.",
  },
  {
    question: "Can I request a re-evaluation of a rejected book?",
    answer:
      "Yes, you can request a re-evaluation within 48 hours of receiving the rejection notification. Our team will reassess and provide a final decision.",
  },
  {
    question: "Do you offer partial refunds?",
    answer:
      "Partial refunds are not provided. If the book does not meet our acceptance criteria, it will either be returned (on request) or responsibly disposed of.",
  },
  {
    question: "What if my book gets lost during transit?",
    answer:
      "If the book is lost during courier pickup or in transit before quality check, we will investigate the issue with our logistics partner and compensate if applicable.",
  },
  {
    question: "How do I contact support regarding a return or refund?",
    answer:
      "You can contact our support team via email or the help section on our website. Please include your order ID and issue details for faster resolution.",
  },
];

const ReturnRefundPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-grey text-white min-h-screen p-6 space-y-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-black">
          Return & Refund Policy{" "}
          <span className="block w-20 h-1 bg-red-500 mt-1 rounded-sm"></span>
        </h1>

        <div className="space-y-4">
          {policyData.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: "#1f2937", 
                border: "1px solid #374151", 
                borderRadius: 2,
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
                <Typography>{item.question}</Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  borderTop: "1px solid #4b5563",
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnRefundPolicy;
