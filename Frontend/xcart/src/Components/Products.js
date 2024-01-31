import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { config } from "../App";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const backendURL = `${config.endpoint}/products`;

  const addToCart = async (productId) => {
    const addToCartURL = `${config.endpoint}/cart/add/${productId}`;
    try {
      const response = await axios.post(
        addToCartURL,
        {}, // Request body (empty in this case)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      console.log(productId);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(backendURL, {
        headers: { Authorization: `Bearer ${localStorage["token"]}` },
      });
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className=" h-full w-full">
      <div className="flex flex-wrap justify-center align-center">
        {products.map((product) => (
          <div className="m-3" key={product._id}>
            <ProductCard
              product={product}
              addToCart={() => addToCart(product._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
