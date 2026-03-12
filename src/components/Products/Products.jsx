import React from "react";
import products from "@/data/toys.json";

const Products = () => {
  return (
    <div>
      {products.map((product) => (
        <li key={product.title}>{product.title}</li>
      ))}
    </div>
  );
};

export default Products;
