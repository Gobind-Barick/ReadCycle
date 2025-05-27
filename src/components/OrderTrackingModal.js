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
          <button className="text-red-500 font-bold" onClick={onClose}>✕</button>
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
          <div><strong>Delivery Date:</strong> {format(new Date(DeliveryDate), 'PPpp')}</div>
          <div><strong>Expected Delivery:</strong> {format(new Date(ExpectedDeliveryDate), 'PPpp')}</div>
          <div><strong>Consignee:</strong> {Consignee?.Name} ({Consignee?.City} - {Consignee?.PinCode})</div>
        </div>

        <hr className="my-4" />

        <h3 className="text-lg font-semibold mb-2">Tracking Timeline</h3>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {Scans?.map((scanObj, index) => {
            const scan = scanObj?.ScanDetail;
            return (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-700 font-medium">{scan.Scan}</p>
                <p className="text-sm">{scan.Instructions}</p>
                <p className="text-xs text-gray-500">{format(new Date(scan.ScanDateTime), 'PPpp')} — {scan.ScannedLocation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;
