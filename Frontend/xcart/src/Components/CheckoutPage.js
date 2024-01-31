import React, { useEffect, useState } from 'react';
import Navbar from './Navbar/Navbar';
import { config } from '../App';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Orbit } from '@uiball/loaders';
import { useSnackbar } from 'notistack';
import './CheckOutPage.css';

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [productData, setProductData] = useState({});
  const { totalPrice } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const cartUrl = `${config.endpoint}/cart/${localStorage.getItem('id')}`;

  async function getProductData(productId) {
    try {
      const productUrl = `${config.endpoint}/products/${productId}`;
      const response = await axios.get(productUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const getCart = async () => {
    try {
      const response = await axios.get(cartUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const cartItems = response.data.cart;
      setCart(cartItems);

      // Fetch product data for each item in the cart
      const productDataMap = {};
      for (const cartItem of cartItems) {
        const productId = cartItem.productId;
        const productDetails = await getProductData(productId);

        if (productDetails) {
          productDataMap[productId] = productDetails;
        }
      }

      // Set the productData state with the fetched data
      setProductData(productDataMap);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBalance = async (newBalance) => {
    try {
      const userId = localStorage.getItem('id');
      const url = `${config.endpoint}/auth/users/${userId}`;

      // Send a PATCH request to update the user's balance on the server
      const response = await axios.patch(
        url,
        { balance: newBalance },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('response', response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async () => {
    const url = `${config.endpoint}/order/placeorder`;
    const userId = localStorage.getItem('id');
    try {
      const response = await axios.post(
        url,
        { userId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const data = response.data;
      console.log(data);
      // Calculate the new balance after deducting totalPrice
      const currentBalance = parseFloat(localStorage.getItem('balance') || 0);
      const orderAmount = parseFloat(totalPrice);
      if (orderAmount > currentBalance) {
        enqueueSnackbar('Insufficient Balance', { variant: 'error' });
      } else {
        const newBalance = currentBalance - orderAmount;

        // Update localStorage with the new balance
        localStorage.setItem('balance', newBalance.toString());

        // Now call the updateBalance function to update the user's balance on the server
        await updateBalance(newBalance);
        enqueueSnackbar('Order Placed successfully', { variant: 'success' });
        navigate('/thankyou');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, [cart]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Orbit size={25} speed={1.5} color="black" />
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-screen px-4 py-8 cart sm:px-6 lg:px-8">
          <div className="w-full max-w-screen-lg">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex flex-row p-4 border border-gray-300 rounded-lg"
                >
                  <img
                    className="w-32 h-32 mr-4 cartImage"
                    src={productData[item.productId]?.image}
                    alt={productData[item.productId]?.title}
                  />
                  <div>
                    <h2 className="font-semibold text-md">
                      {productData[item.productId]?.title}
                    </h2>
                    <p className="text-gray-700">
                      Price: ${productData[item.productId]?.price}
                    </p>
                    <p className="text-gray-700">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-screen-lg mt-8 sm:flex sm:justify-between sm:items-center">
            <div className="p-4 text-xl font-bold">
              Total Amount: ${totalPrice}
            </div>
            <div className="p-4">
              <button
                onClick={placeOrder}
                className="p-2 font-bold text-white bg-blue-500 rounded shadow-md hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckoutPage;
