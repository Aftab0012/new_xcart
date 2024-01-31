import React, { useState } from "react";

function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Payment Options:</h2>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <input
            type="radio"
            id="creditCard"
            name="paymentMethod"
            value="creditCard"
            checked={selectedOption === "creditCard"}
            onChange={() => handleOptionChange("creditCard")}
            className="mr-2 appearance-none h-4 w-4 border border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="creditCard" className="cursor-pointer">
            Credit Card
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="paypal"
            checked={selectedOption === "paypal"}
            onChange={() => handleOptionChange("paypal")}
            className="mr-2 appearance-none h-4 w-4 border border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="paypal" className="cursor-pointer">
            PayPal
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="other"
            name="paymentMethod"
            value="other"
            checked={selectedOption === "other"}
            onChange={() => handleOptionChange("other")}
            className="mr-2 appearance-none h-4 w-4 border border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="other" className="cursor-pointer">
            Other
          </label>
        </div>
      </div>
      {selectedOption && (
        <div className="mt-4">
          You have selected: <strong>{selectedOption}</strong> as your payment
          method.
        </div>
      )}
    </div>
  );
}

export default PaymentOptions;
