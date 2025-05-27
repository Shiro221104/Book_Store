import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user, token } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customAddress, setCustomAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(user?.address || "");
  const [loading, setLoading] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);


 const createOrderPayload = () => ({
  date: new Date().toISOString(),
  status: "PENDING",
  totalPrice: total,
  shippingAddress: addressInput, 
  user: { id: user?.id },
  paymentMethod: paymentMethod.toUpperCase(), 
  bookOrders: cartItems.map(item => ({
    bookId: item.id,
    quantity: item.quantity,
  })),
});

 
  const handleCheckout = () => {
    console.log("Checkout started at:", new Date().toLocaleString());
    console.log("Payload:", JSON.stringify(createOrderPayload(), null, 2));
    console.log("Token:", token);

    if (!token) {
        console.log("No token found, please login again");
        alert("No authentication token. Please log in.");
        return;
    }

    if (!addressInput.trim()) {
        alert("Please enter a shipping address.");
        return;
    }

    if (paymentMethod === "credit_card" && (!cardNumber || !expiryDate || !cvv)) {
        alert("Please fill in all credit card details.");
        return;
    }

    setLoading(true);

    fetch("http://localhost:8082/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(createOrderPayload()),
    })
        .then(res => {
            console.log("Response status:", res.status);
            if (!res.ok) {
                return res.text().then(text => {
                    throw new Error(`Server error: ${res.status} - ${text || 'No response body'}`);
                });
            }
            return res.json();
        })
        .then(data => {
            console.log("Order saved to backend:", data);
            clearCart();
            alert("Payment processed successfully!");
        })
        .catch(err => {
            console.error("Error saving order:", err.message);
            alert("Failed to save order. Please try again. Error: " + err.message);
        })
        .finally(() => setLoading(false));
};
  const displayAddress = customAddress ? addressInput : user?.address || "No address available";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {/* Recipient Info */}
      <div className="bg-white rounded-2xl shadow p-4 mb-6">
        <h3 className="text-xl font-semibold mb-4">Recipient Information</h3>
        <div className="text-gray-800 space-y-1 text-sm">
          <p><strong>Full Name:</strong> {user?.fullName || "N/A"}</p>
          <p><strong>Phone Number:</strong> {user?.phoneNumber || "N/A"}</p>
          <p><strong>Email:</strong> {user?.email || "N/A"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between text-gray-700">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
          <h3 className="text-xl font-semibold">Payment Information</h3>

          {/* Shipping Address */}
          <div>
            <label className="block font-medium">Shipping Address</label>
            {customAddress ? (
              <textarea
                value={addressInput}
                onChange={e => setAddressInput(e.target.value)}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter new address"
              />
            ) : (
              <p className="p-3 bg-gray-100 rounded-lg">{displayAddress}</p>
            )}
            <label className="inline-flex items-center mt-2 space-x-2">
              <input
                type="checkbox"
                checked={customAddress}
                onChange={() => setCustomAddress(!customAddress)}
              />
              <span>Use a different address</span>
            </label>
          </div>

          {/* Payment Method */}
          <label className="block font-medium">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="cash">Cash</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="mobile_payment">Mobile Payment</option>
          </select>

          {/* Credit Card Fields */}
          {paymentMethod === "credit_card" && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={e => setCardNumber(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={e => setExpiryDate(e.target.value)}
                  className="w-1/2 p-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                  className="w-1/2 p-2 border rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Summary Info */}
          <div className="text-sm text-gray-600">
            <p><strong>Amount:</strong> ${total.toFixed(2)}</p>
            <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
          </div>

          {/* Confirm Button */}
          <button
            onClick={handleCheckout}
            disabled={total === 0 || loading}
            className={`w-full py-3 rounded-lg text-white transition ${
              total === 0 || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600"
            }`}
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}
