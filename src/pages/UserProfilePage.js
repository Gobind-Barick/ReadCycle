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
        const addressRes = await axios.get("http://localhost:8080/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(addressRes.data);

        const ordersRes = await axios.get("http://localhost:8080/api/orders", {
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
        const res = await axios.get(`http://localhost:8080/api/orders/track/${trackingId}`, {
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
      const res = await axios.post("http://localhost:8080/api/addresses", newAddress, {
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
      await axios.delete(`http://localhost:8080/api/addresses/${id}`, {
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
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading profile data...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h2>User Profile</h2>
      {user && (
        <div style={{ marginBottom: "2rem" }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <img
            src={user.avatarUrl || "https://www.gravatar.com/avatar/?d=mp"}
            alt="avatar"
            width={80}
            height={80}
            style={{ borderRadius: "50%", marginTop: "1rem" }}
          />
        </div>
      )}

      {/* Addresses */}
      <h3>Saved Addresses</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {addresses.map((address) => (
          <li key={address.id} style={{ border: "1px solid #ccc", borderRadius: "6px", padding: "1rem", marginBottom: "1rem" }}>
            <p><strong>{address.name}</strong></p>
            <p>{address.street}, {address.city}, {address.state} - {address.postalCode}</p>
            <p>{address.country}</p>
            <p>Phone: {address.phone}</p>
            {address.isDefault && <p><em>Default Address</em></p>}
            <button
              onClick={() => handleDelete(address.id)}
              disabled={deletingAddressId === address.id}
              style={{
                marginTop: "0.5rem", backgroundColor: "red", color: "white",
                border: "none", padding: "0.4rem 0.8rem", borderRadius: "4px",
                cursor: "pointer", opacity: deletingAddressId === address.id ? 0.6 : 1
              }}
            >
              {deletingAddressId === address.id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>

      {/* Add Address */}
      <h3>Add New Address</h3>
      <form onSubmit={handleAddAddress} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}>
        <input type="text" placeholder="Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} required />
        <input type="text" placeholder="Street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} required />
        <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} required />
        <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} required />
        <input type="text" placeholder="Postal Code" value={newAddress.postalCode} onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })} required />
        <input type="text" placeholder="Phone" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} required />
        <label>
          <input type="checkbox" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} /> Make Default
        </label>
        <button type="submit" style={{ padding: "0.6rem", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Save Address
        </button>
      </form>

      {/* Order History */}
      <h3 style={{ marginTop: "3rem" }}>Past Orders</h3>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {orders.map((order) => (
            <div key={order.id} style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "1rem", backgroundColor: "#f9f9f9" }}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {order.status || "Pending"}</p>
              <ul style={{ paddingLeft: "1rem" }}>
                {order.items && order.items.map((item, index) => (
                  <li key={index}>
                    <p><strong>Title:</strong> {item.title}<br /><strong>Author:</strong> {item.author}<br />Quantity: {item.quantity} | Price: ₹{item.price}</p>
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              {order.awb && (
                <button
                  onClick={() => {
                    setTrackingId(order.awb);
                    setTrackingData(null); // Reset before new fetch
                  }}
                  style={{
                    marginTop: "0.8rem", backgroundColor: "#22c55e", color: "white",
                    border: "none", padding: "0.5rem 1rem", borderRadius: "5px"
                  }}
                >
                  Track
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
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
