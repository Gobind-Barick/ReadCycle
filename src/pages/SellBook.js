import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellBook = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    landmark: "",
    shippingMethod: "pickup",
    pickupSlot: "",
    paymentMethod: "",
    upiName: "",
    upiId: "",
    upiPhone: "",
    bankAccountNumber: "",
    bankAccountHolder: "",
    ifscCode: "",
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://readcycle-backend-gyud.onrender.com/api/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.error("Failed to fetch book details:", err);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const payload = {
        bookId: book.id,
        bookTitle: book.title,
        expectedPrice: book.sellPrice,
        ...formData,
      };

      const response = await axios.post(
        "https://readcycle-backend-gyud.onrender.com/api/books/sell-orders/create",
        payload
      );

      const { awb, message } = response.data;
      alert(`✅ ${message}\nAWB Number: ${awb}`);
      navigate("/"); // reset if needed
    } catch (err) {
      console.error("Error submitting sell order:", err.response?.data || err.message);
      alert("❌ Something went wrong while placing the order.");
    }
  };

  if (!book)
    return (
      <div className="p-10 text-center text-gray-600 dark:text-white">
        Loading book details...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 border border-gray-100 dark:border-gray-800">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Sell Your Book
        </h1>
        <p className="text-center text-gray-500 mb-2 dark:text-gray-400">
          You are selling: <strong>{book.title}</strong> for ₹{book.sellPrice}
        </p>

        {step === 1 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Step 1: Contact Details</h2>
            <div className="space-y-4">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Email (optional)" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Step 2: Shipping Address</h2>
            <div className="space-y-4">
              <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Address Line 1" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
              <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Address Line 2" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
              <input name="state" value={formData.state} onChange={handleChange} placeholder="State" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
              <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pin Code" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
              <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
              <input name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Landmark" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={handleBack} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">Back</button>
              <button onClick={handleNext} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Step 3: Pickup Slot</h2>
            <p className="text-gray-600 mb-2 dark:text-gray-300">Choose a convenient pickup time slot:</p>
            <div className="flex flex-wrap gap-3">
              {["9:00 AM - 12:00 PM", "12:00 PM - 3:00 PM", "3:00 PM - 6:00 PM", "6:00 PM - 9:00 PM"].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setFormData({ ...formData, pickupSlot: slot })}
                  className={`px-4 py-2 rounded-lg border transition ${
                    formData.pickupSlot === slot
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:text-white"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={handleBack} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">Back</button>
              <button onClick={handleNext} disabled={!formData.pickupSlot} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Next</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-white">Step 4: Summary & Payment</h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-2 text-sm">
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Address:</strong> {`${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.state}, ${formData.pincode}, ${formData.country}`}</p>
              <p><strong>Landmark:</strong> {formData.landmark}</p>
              <p><strong>Pickup Slot:</strong> {formData.pickupSlot}</p>
              <p><strong>Book:</strong> {book.title} — ₹{book.sellPrice}</p>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-gray-700 dark:text-white">Choose payment method:</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-gray-800 dark:text-white">
                  <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === "upi"} onChange={handleChange} />
                  UPI
                </label>
                <label className="flex items-center gap-2 text-gray-800 dark:text-white">
                  <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === "bank"} onChange={handleChange} />
                  Bank Transfer
                </label>
              </div>

              {formData.paymentMethod === "upi" && (
                <div className="space-y-4 mt-4">
                  <input name="upiName" value={formData.upiName} onChange={handleChange} placeholder="Name on UPI" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
                  <input name="upiId" value={formData.upiId} onChange={handleChange} placeholder="UPI ID" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
                  <input name="upiPhone" value={formData.upiPhone} onChange={handleChange} placeholder="Phone Number linked to UPI" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
                </div>
              )}

              {formData.paymentMethod === "bank" && (
                <div className="space-y-4 mt-4">
                  <input name="bankAccountHolder" value={formData.bankAccountHolder} onChange={handleChange} placeholder="Account Holder Name" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
                  <input name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} placeholder="Account Number" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
                  <input name="ifscCode" value={formData.ifscCode} onChange={handleChange} placeholder="IFSC Code" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:text-white" />
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={handleBack} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">Back</button>
              <button onClick={handleSubmit} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Confirm & Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellBook;
