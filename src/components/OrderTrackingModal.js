import React from 'react';
import { format } from 'date-fns';

const OrderTrackingModal = ({ trackingData, onClose }) => {
  const shipment = trackingData?.ShipmentData?.[0]?.Shipment;

  if (!shipment) return null;

  const {
    Status,
    AWB,
    InvoiceAmount,
    DeliveryDate,
    ExpectedDeliveryDate,
    ReferenceNo,
    Consignee,
    Scans
  } = shipment;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tracking Details - Order #{ReferenceNo}</h2>
          <button className="text-red-500 font-bold text-lg" onClick={onClose}>✕</button>
        </div>

        <div className="mb-4">
          <p><strong>Status:</strong> {Status?.Status}</p>
          <p><strong>Location:</strong> {Status?.StatusLocation}</p>
          <p><strong>Date:</strong> {format(new Date(Status?.StatusDateTime), 'PPpp')}</p>
          <p><strong>Instructions:</strong> {Status?.Instructions}</p>
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><strong>AWB:</strong> {AWB}</div>
          <div><strong>Invoice Amount:</strong> ₹{InvoiceAmount}</div>
         {DeliveryDate ? (
  <div><strong>Delivery Date:</strong> {format(new Date(DeliveryDate), 'PPpp')}</div>
) : (
  <div><strong>Delivery Date:</strong> Not available yet</div>
)}

{ExpectedDeliveryDate ? (
  <div><strong>Expected Delivery:</strong> {format(new Date(ExpectedDeliveryDate), 'PPpp')}</div>
) : (
  <div><strong>Expected Delivery:</strong> Not available yet</div>
)}
          <div className="col-span-2"><strong>Consignee:</strong> {Consignee?.Name} ({Consignee?.City} - {Consignee?.PinCode})</div>
        </div>

        <hr className="my-4" />

        <h3 className="text-lg font-semibold mb-4">Tracking Timeline</h3>
        <div className="relative pl-4 max-h-80 overflow-y-auto">
          <div className="absolute left-1.5 top-0 w-0.5 bg-gray-300 h-full"></div>
          {Scans?.map((scanObj, index) => {
            const scan = scanObj?.ScanDetail;
            return (
              <div key={index} className="relative pl-6 mb-6">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white z-10"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{scan.Scan}</p>
                  <p className="text-sm text-gray-700">{scan.Instructions}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(scan.ScanDateTime), 'PPpp')} — {scan.ScannedLocation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;
