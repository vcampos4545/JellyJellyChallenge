import React from 'react'

// ProductTile.js
const ProductTile = ({ product }) => {
  return (
    <div className="max-w-sm mx-auto bg-gray-800 text-white rounded overflow-hidden shadow-lg m-4">
      <img className="w-full h-48 object-cover" src={product.images[0].src} alt={product.title} />
      <div className="p-4">
        <div className="font-bold text-xl mb-2">{product.title}</div>
        <p className="text-gray-400 text-base" dangerouslySetInnerHTML={{__html: product.body_html}}></p>
      </div>
      <div className="p-4 flex justify-between items-center">
        <p className="text-gray-300 font-bold">${product.variants[0].price}</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductTile;
