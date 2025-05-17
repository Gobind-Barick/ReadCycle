// src/pages/UserProfilePage.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const UserProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    phone: "",
    isDefault: false,
  });

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8080/api/addresses", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setAddresses(res.data))
        .catch((err) => console.error("Failed to load addresses", err));

      axios
        .get("http://localhost:8080/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Failed to load orders", err));
    }
  }, [token]);

  const handleAddAddress = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/addresses", newAddress, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAddresses([...addresses, res.data]);
        setNewAddress({
          name: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "India",
          phone: "",
          isDefault: false,
        });
      })
      .catch((err) => console.error("Failed to add address", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/addresses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setAddresses(addresses.filter((addr) => addr.id !== id)))
      .catch((err) => console.error("Failed to delete address", err));
  };

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
          <li
            key={address.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "6px",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <p><strong>{address.name}</strong></p>
            <p>{address.street}, {address.city}, {address.state} - {address.postalCode}</p>
            <p>{address.country}</p>
            <p>Phone: {address.phone}</p>
            {address.isDefault && <p><em>Default Address</em></p>}
            <button
              onClick={() => handleDelete(address.id)}
              style={{
                marginTop: "0.5rem",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Add Address Form */}
      <h3>Add New Address</h3>
      <form
        onSubmit={handleAddAddress}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}
      >
        <input type="text" placeholder="Name" value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} required />
        <input type="text" placeholder="Street" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} required />
        <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} required />
        <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} required />
        <input type="text" placeholder="Postal Code" value={newAddress.postalCode} onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })} required />
        <input type="text" placeholder="Phone" value={newAddress.phone} onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })} required />
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input type="checkbox" checked={newAddress.isDefault} onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })} />
          Make Default
        </label>
        <button
          type="submit"
          style={{
            padding: "0.6rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
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
            <div
              key={order.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            >
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <ul style={{ paddingLeft: "1rem" }}>
                {order.items.map((item, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    <p><strong>Title:</strong> {item.bookTitle}</p>
                    <p>Quantity: {item.quantity} | Price: ₹{item.price}</p>
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
