import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import OrderTrackingModal from "../components/OrderTrackingModal";

const UserProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "", street: "", city: "", state: "", postalCode: "",
    country: "India", phone: "", isDefault: false
  });
  const [loading, setLoading] = useState(true);
  const [deletingAddressId, setDeletingAddressId] = useState(null);
  const [trackingId, setTrackingId] = useState(null);
  const [trackingData, setTrackingData] = useState(null);

  const retryTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !user) {
        retryTimeoutRef.current = setTimeout(fetchData, 10);
        return;
      }

      setLoading(true);
      try {
        const addressRes = await axios.get("https://readcycle-backend-gyud.onrender.com/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(addressRes.data);

        const ordersRes = await axios.get("https://readcycle-backend-gyud.onrender.com/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Failed to load addresses or orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [token, user]);

  useEffect(() => {
    const fetchTrackingData = async () => {
      if (!trackingId) return;

      try {
        const res = await axios.get(`https://readcycle-backend-gyud.onrender.com/api/addresses/${trackingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrackingData(res.data);
      } catch (error) {
        console.error("Failed to fetch tracking data", error);
        alert("Failed to load tracking data.");
        setTrackingId(null);
      }
    };

    fetchTrackingData();
  }, [trackingId, token]);

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://readcycle-backend-gyud.onrender.com/api/addresses", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses([...addresses, res.data]);
      setNewAddress({
        name: "", street: "", city: "", state: "", postalCode: "",
        country: "India", phone: "", isDefault: false
      });
    } catch (err) {
      console.error("Failed to add address", err);
      alert("Failed to add address.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this address?");
    if (!confirmDelete) return;

    setDeletingAddressId(id);
    try {
      await axios.delete(`https://readcycle-backend-gyud.onrender.com/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete address.");
    } finally {
      setDeletingAddressId(null);
    }
  };

  if (loading) {
    return <div className="p-8 text-center dark:bg-[#0f0f0f] bg-white text-black dark:text-white">Loading profile data...</div>;
  }

  return (
    <div className="p-8 w-full min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">

      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>

      {user && (
        <div className="mb-8">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <img
            src={user.avatarUrl || "https://www.gravatar.com/avatar/?d=mp"}
            alt="avatar"
            className="mt-4 w-20 h-20 rounded-full"
          />
        </div>
      )}

      {/* Addresses */}
      <h3 className="text-xl font-semibold mb-4">Saved Addresses</h3>
      <ul className="space-y-4">
        {addresses.map((address) => (
          <li key={address.id} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
            <p><strong>{address.name}</strong></p>
            <p>{address.street}, {address.city}, {address.state} - {address.postalCode}</p>
            <p>{address.country}</p>
            <p>Phone: {address.phone}</p>
            {address.isDefault && <p className="italic text-green-600">Default Address</p>}
            <button
              onClick={() => handleDelete(address.id)}
              disabled={deletingAddressId === address.id}
              className={`mt-2 px-4 py-2 rounded bg-red-600 text-white ${
                deletingAddressId === address.id ? "opacity-50 cursor-not-allowed" : "hover:bg-red-700"
              }`}
            >
              {deletingAddressId === address.id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>

      {/* Add Address */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Add New Address</h3>
      <form onSubmit={handleAddAddress} className="space-y-3 max-w-md">
        <input type="text" placeholder="Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="Street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="Postal Code" value={newAddress.postalCode} onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })} required className="w-full p-2 border border-gray-300 rounded" />
        <input type="text" placeholder="Phone" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} required className="w-full p-2 border border-gray-300 rounded" />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} />
          Make Default
        </label>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Address</button>
      </form>

      {/* Order History */}
      <h3 className="text-xl font-semibold mt-10 mb-4">Past Orders</h3>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-gray-100 dark:bg-gray-800">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {order.status || "Pending"}</p>
              <ul className="ml-4 list-disc">
                {order.items && order.items.map((item, index) => (
                  <li key={index}>
                    <p><strong>Title:</strong> {item.title}<br /><strong>Author:</strong> {item.author}<br />Quantity: {item.quantity} | Price: ₹{item.price}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-2"><strong>Total:</strong> ₹{order.totalAmount}</p>
              {order.awb && (
                <button
                  onClick={() => {
                    setTrackingId(order.awb);
                    setTrackingData(null);
                  }}
                  className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Track
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tracking Modal */}
      {trackingId && trackingData && (
        <OrderTrackingModal
          trackingData={trackingData}
          onClose={() => {
            setTrackingId(null);
            setTrackingData(null);
          }}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
