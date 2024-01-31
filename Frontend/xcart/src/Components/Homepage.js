import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Products from "./Products";
import LoadingAnimation from "./Animations/LoadingAnimation";
import Cart from "./Cart/Cart";

function Homepage() {
  //use this technique to useLocation to get data sent through Navigate
  // const location = useLocation();
  // let data = location.state;
  // console.log(data);
  console.log("homepage");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingAnimation />
        </div>
      ) : (
        <div className="flex flex-wrap">
          <div className="w-full md:w-3/8 lg:w-8/12 xl:w-9/12">
            <Products />
          </div>
          <div className="w-full lg:w-4/12 xl:w-3/12 mt-4 md:mt-0">
            <Cart />
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
