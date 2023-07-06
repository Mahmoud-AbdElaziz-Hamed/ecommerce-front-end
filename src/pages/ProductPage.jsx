import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";

import CartContext from "../context/CartContext";

import ProductImageCarousel from "../components/Product/ProductImageCarousel";
import ProductDetails from "../components/Product/ProductDetails";
import ProductPanels from "../components/Product/ProductPanels";
import ProductRoute from "../components/Product/ProductRoute";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [count, setCount] = useState(0);
  const myCart = useContext(CartContext);
  const { id } = useParams();

  const handleAddItemToCart = (product) => {
    myCart.addItem({
      key: product._id,
      id: product._id,
      name: product.name,
      image: product.images[0].url,
      amount: count,
      price: product.new_price ?? product.price
    });
  };

  // handleCounterDecrement
  const handleCounterDecrement = () => {
    if (count > 0) {
      setCount((prevState) => prevState - 1);
    }
  };
  // handleCounterIncrement
  const handleCounterIncrement = () => {
    setCount((prevState) => prevState + 1);
  };

  useEffect(() => {
    async function getProduct() {
      const { data } = await axios.get(`http://localhost:8000/products/${id}`);
      // console.log(data);
      setProduct(data);
    }

    getProduct();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col gap-5 bg-gray-300 p-5">
          {product && (
            <>
              <div className="bg-white flex px-5">
                <ProductRoute product={product} />
              </div>
              <div className="flex flex-col md:flex-row justify-center items-center gap-5 bg-white p-10">
                <ProductImageCarousel productImages={product.images} />
                <ProductDetails
                  product={product}
                  count={count}
                  handleCounterDecrement={handleCounterDecrement}
                  handleCounterIncrement={handleCounterIncrement}
                  handleAddItemToCart={handleAddItemToCart}
                />
              </div>
              <div className="bg-white  px-5">
                <ProductPanels product={product} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
