import React from 'react'

// ProductTile.js
const ProductTile = ({ product }) => {
  return (
    <div key={product.id} className="border p-4 rounded overflow-hidden shadow-lg m-4">
      {/* Product Image */}
      <img
          src={product.images[0].src}
          alt={product.title}
          className="w-full h-32 object-cover mb-2"
      />

      {/* Product Title */}
      <h3 className="text-lg font-semibold">{product.title}</h3>

      {/* Product Price */}
      <p className="text-gray-600">{`$${product.variants[0].price}`}</p>

      {/* Product Description */}
      <p className="mt-2 text-sm text-gray-500" 
      dangerouslySetInnerHTML={{__html: product.body_html}}></p>

      {/* Add more product details as needed */}
    </div>
  );
};

export default ProductTile;
