import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import axios from "axios";

const OrderTrackingModal = ({ isOpen, onClose, razorpayOrderId }) => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && razorpayOrderId) {
      setLoading(true);
      axios
        .get(`/api/orders/track?orderId=${razorpayOrderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setTrackingData(res.data);
        })
        .catch((err) => {
          setTrackingData({ error: "Failed to fetch tracking info." });
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, razorpayOrderId]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 p-4">
      <Dialog.Panel className="mx-auto max-w-md bg-white p-6 rounded-xl shadow-lg">
        <Dialog.Title className="text-xl font-semibold mb-4">Track Order</Dialog.Title>
        {loading ? (
          <p>Loading...</p>
        ) : trackingData?.error ? (
          <p className="text-red-500">{trackingData.error}</p>
        ) : trackingData ? (
          <div className="space-y-2 text-sm">
            <p><strong>Status:</strong> {trackingData.status}</p>
            <p><strong>AWB:</strong> {trackingData.awb}</p>
            <p><strong>Courier:</strong> {trackingData.courier}</p>
            <p><strong>Last Update:</strong> {trackingData.last_update}</p>
            <p><strong>Remarks:</strong> {trackingData.remark}</p>
            <p><strong>Tracking URL:</strong> <a href={trackingData.tracking_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Track Online</a></p>
          </div>
        ) : (
          <p>No tracking data found.</p>
        )}
        <div className="mt-4">
          <button onClick={onClose} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            Close
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default OrderTrackingModal;
