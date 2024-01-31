import React from "react";

function Footer() {
  return (
    <footer className="  bg-gray-900 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col items-center">
        <div className="text-xl font-bold mb-2">Your Website Name</div>
        <div className="flex space-x-4">
          <a
            href="#"
            className="hover:text-blue-500 transition duration-300 ease-in-out"
          >
            Home
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition duration-300 ease-in-out"
          >
            Products
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition duration-300 ease-in-out"
          >
            About
          </a>
          <a
            href="#"
            className="hover:text-blue-500 transition duration-300 ease-in-out"
          >
            Contact
          </a>
        </div>
        <div className="mt-4">
          <p>&copy; 2023 Your Website Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
