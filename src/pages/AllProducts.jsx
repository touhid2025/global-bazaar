import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import ReactStars from 'react-rating-stars-component';
import { Link, useLoaderData } from 'react-router';


    // Dummy fetch, replace with real API
    
  

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState('card');
  const data = useLoaderData();

  
    useEffect(() => {
    setProducts(data);
  }, []);
  
  const filteredProducts = availableOnly
    ? products.filter((p) => p.minQuantity > 100)
    : products;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={() => setAvailableOnly(!availableOnly)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {availableOnly ? 'Show All Products' : 'Show Available Products'}
        </button>

        <select
          className="border px-3 py-2 rounded"
          value={viewMode}
          onChange={(e) => setViewMode(e.target.value)}
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Min Qty</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody >
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.imageURL} alt={product.name} className="w-16" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.quantity}</td>
                  <td>{product.minQuantity}</td>
                  <td> 
                  
                    <ReactStars
                      count={5}
                      value={product.rating}
                      size={24}
                      edit={false}
                      activeColor="#ffd700"
                      
                    />
                  </td>
                  <td>
                    <Link to={`/update/${product._id}`} className="mt-3 p-1 text-2xl rounded-lg text-indigo-600 hover:text-indigo-800">
                <FaEdit className="inline" />
              </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-1">Brand: {product.brand}</p>
              <p className="text-sm text-gray-500 mb-1">Category: {product.category}</p>
              <p className="text-sm text-gray-500 mb-1">Qty: {product.quantity}</p>
              <p className="text-sm text-gray-500 mb-1">Min Qty: {product.minQuantity}</p>
              <ReactStars
                count={5}
                value={product.rating}
                size={20}
                edit={false}
                activeColor="#ffd700"
              />
              <Link to={`/update/${product._id}`} className="mt-3 p-1 bg-indigo-600 text-2xl hover:bg-indigo-700 rounded-lg  text-white ">
                <FaEdit className="inline-flex mr-2 " />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;