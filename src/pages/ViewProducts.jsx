import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams, Link } from 'react-router';
import ReactStars from 'react-stars'

const ViewProducts = () => {
  const data = useLoaderData();
  const { id } = useParams(); // id = category name passed from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data && data.length) {
      const filtered = data.filter((item) => item.category == id);
      setProducts(filtered);
    }
  }, [data, id]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl text-amber-600 font-bold text-center mb-8">Products in {id}</h2>

      {products.length === 0 && (
        <p className="text-center text-gray-500">No products found for this category.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-lg bg-amber-100 shadow-xl hover:shadow transition p-4 flex flex-col"
          >
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-1">Brand: {product.brand}</p>
            <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
            <p className="text-sm text-gray-500 mb-1">Min Qty: {product.minQuantity}</p>
            <p className="text-sm text-gray-600 mb-1 line-clamp-2">{product.description}</p>
            <p className="text-base font-semibold text-gray-800 mb-2">Price: ${product.price}</p>
            <ReactStars
              count={5}
              value={product.rating}
              edit={false}
              size={20}
              activeColor="#ffd700"
            />
            <Link
              to={`/product/${product?._id}`}
              className="mt-auto inline-block text-center bg-amber-600 hover:bg-amber-800 text-white py-2 px-3 rounded transition"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProducts;