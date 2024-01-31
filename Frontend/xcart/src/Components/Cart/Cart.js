/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { config } from '../../App';
import axios from 'axios';
import '../ProductCard.css';
import '../Cart/Cart.css';
import { useNavigate } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Cart() {
  const [cart, setCart] = useState([]);
  const [productData, setProductData] = useState({});
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

  const checkoutPage = () => {
    const totalPrice = cart.reduce((total, item) => {
      const productPrice = productData[item.productId]?.price;
      const productQuantity = item.quantity;
      const itemTotal = productPrice * productQuantity;
      return total + itemTotal;
    }, 0);

    navigate(`/checkout/${totalPrice}`);
  };

  useEffect(() => {
    getCart();
  }, [cart, cart.length]);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(
        `${config.endpoint}/cart/remove/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const updatedCart = response.data;
      console.log('Updated Cart:', updatedCart);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className="cart w-full lg:w-[290px] mt-12 flex flex-col justify-center cart-container p-4">
      {cart.length === 0 ? ( // Check if cart is empty
        <div className="text-center empty-cart">
          <ShoppingCartOutlinedIcon fontSize="large" />
          <p>Your cart is empty</p>
        </div>
      ) : (
        // Render cart items if cart is not empty
        <>
          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center p-3 mb-1 border border-gray-300 rounded-lg lg:w-64"
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
                <div className="flex flex-col gap-4 mt-4">
                  <p className="text-gray-700">Quantity: {item.quantity}</p>
                  <button
                    className="text-white bg-red-500 shadow-md p-3b rounded-xl"
                    onClick={() => handleDelete(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <div className="p-2">
              <button
                onClick={checkoutPage}
                className="p-2 mt-2 font-bold text-white bg-blue-500 rounded shadow-md hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
