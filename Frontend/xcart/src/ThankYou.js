import React from "react";
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-lg mb-4">Your order has been successfully placed.</p>
        <p className="text-lg mb-4">
          We appreciate your business and hope you enjoy your products.
        </p>
        <p className="text-lg mb-4">
          You can check the order details in your account.
        </p>
        {/* You can add an image or any additional content here */}
        {/* Example: <img src="your-image-url.jpg" alt="Thank You" /> */}
        <Link to="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ThankYou;
