import React from "react";
import PropTypes from "prop-types";

function Product({ data }) {
  return (
    <>
      <div>product</div>
      <p>{data.name}</p>
      <p>{data.price}</p>
    </>
  );
}

Product.propTypes = {
  data: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    //image: PropTypes.string.isRequired,
    //category: PropTypes.string.isRequired,
  }),
};

export default Product;
