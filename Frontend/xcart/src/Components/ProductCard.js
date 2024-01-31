import React from 'react';
import Button from '@mui/material/Button';
import AddShoppingCartOutlined from '@mui/icons-material/AddShoppingCartOutlined';
import { styled } from '@mui/system'; // Import styled from @mui/system
import './ProductCard.css';

const StyledButton = styled(Button)({
  display: 'flex',
  width: '100%',
  alignSelf: 'center',
});

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className=" cursor-pointer hover:bg-hoverColor rounded transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-md card p-3 h-full w-[330px] flex flex-col justify-between mt-9">
      <div className="h-[200px]">
        <img
          className="image sm:h-64 md:h-72 lg:h-96"
          src={product.image}
          alt="product_img"
        />
      </div>
      <div>
        <div className="p-3">
          <div className="text-xl font-bold text-staleGray">
            {product.title}
          </div>
          <div className="font-bold">${product.price}</div>
        </div>

        {/* using css styled component for this button */}
        <StyledButton
          className="text-customGrayForText"
          name="add to cart"
          variant="contained"
          startIcon={<AddShoppingCartOutlined />}
          onClick={addToCart}
        >
          Add to cart
        </StyledButton>
      </div>
    </div>
  );
};

export default ProductCard;
