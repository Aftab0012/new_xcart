import axios from 'axios';
import { config } from '../src/App';

export const addToCart = async (productId) => {
  const addToCartURL = `${config.endpoint}/cart/add/${productId}`;
  try {
    const response = await axios.post(
      addToCartURL,
      {}, // Request body (empty in this case)
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    console.log(response.data);
    console.log(productId);
  } catch (error) {
    console.log(error);
  }
};
