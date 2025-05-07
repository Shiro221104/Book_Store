import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const total = cartItems.reduce((sum, item) => sum + item.Price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-gray-700">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.Price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold border-t pt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-3">
          <h3 className="text-xl font-semibold">Shipping Address</h3>
          <input type="text" placeholder="House number" className="w-full p-2 border rounded-lg" />
          <input type="text" placeholder="Street" className="w-full p-2 border rounded-lg" />
          <input type="text" placeholder="District" className="w-full p-2 border rounded-lg" />
          <input type="text" placeholder="City" className="w-full p-2 border rounded-lg" />
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-2xl shadow p-4 mt-6 space-y-4">
        <h3 className="text-xl font-semibold">Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cod">Cash on Delivery</option>
        </select>

        {paymentMethod === "credit_card" && (
          <div className="space-y-3">
            <input type="text" placeholder="Card Number" className="w-full p-2 border rounded-lg" />
            <div className="flex space-x-2">
              <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded-lg" />
              <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded-lg" />
            </div>
          </div>
        )}

<button className={`w-full py-3 rounded-lg transition text-white ${total === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700" }`}
  disabled={total === 0}
  onClick={() => {
    if (total === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }
    alert("Order placed!");
    clearCart();
  }}
>
  Confirm & Pay
</button>
      </div>
    </div>
  );
}
