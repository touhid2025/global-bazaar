import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import ReactStars from 'react-stars';
import { Link, useLoaderData } from 'react-router';

const AllProducts = () => {
  useEffect(()=>{
          document.title="GlobalBazaar | All Product"
          },[]);
  const [products, setProducts] = useState([]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [viewMode, setViewMode] = useState('card');
  const [searchTerm, setSearchTerm] = useState('');
  const data = useLoaderData();

  useEffect(() => {
    setProducts(data);
  }, [data]);

  // Filter by quantity if checked
  let filteredProducts = availableOnly
    ? products.filter(p => p.minQuantity > 100)
    : products;

  // Filter by search
  if (searchTerm.trim()) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
 
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={() => setAvailableOnly(!availableOnly)}
          className="bg-amber-600 text-white px-4 py-2 rounded shadow-md hover:bg-amber-700"
        >
          {availableOnly ? 'Show All Products' : 'Show Available Products'}
        </button>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border border-amber-400 px-4 py-2 rounded-md w-64 outline-none focus:ring-2 focus:ring-amber-500"
        />

        <select
          className="border text-amber-600 outline-0 hover:bg-amber-600 hover:text-white border-amber-500 px-3 py-2 rounded"
          value={viewMode}
          onChange={e => setViewMode(e.target.value)}
        >
          <option value="card">Card View</option>
          <option value="table">Table View</option>
        </select>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-md shadow-lg">
          <table className="table w-full text-center">
            <thead className="bg-amber-700 text-white">
              <tr>
                <th className="py-3">Image</th>
                <th className="py-3">Name</th>
                <th className="py-3 hidden md:table-cell">Brand</th>
                <th className="py-3 hidden md:table-cell">Category</th>
                <th className="py-3 hidden md:table-cell">Quantity</th>
                <th className="py-3">Min Qty</th>
                <th className="py-3 hidden md:table-cell">Rating</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-amber-100 text-gray-800">
              {filteredProducts.map(product => (
                <tr key={product._id} className="hover:bg-amber-200">
                  <td className="py-2 px-4">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-16 h-10 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4 hidden md:table-cell">{product.brand}</td>
                  <td className="py-2 px-4 hidden md:table-cell">{product.category}</td>
                  <td className="py-2 px-4 hidden md:table-cell">{product.quantity}</td>
                  <td className="py-2 px-4">{product.minQuantity}</td>
                  <td className="py-2 px-4 hidden md:table-cell">
                    <ReactStars
                      count={5}
                      value={product.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      />
                  </td>
                  <td className="py-2 px-4">
                    <Link
                      to={`/update/${product._id}`}
                      className="text-xl text-indigo-600 hover:text-indigo-800"
                    >
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
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className="rounded-lg p-4 shadow-2xl hover:shadow bg-amber-100 transition"
            >
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-40 object-cover mb-4 rounded border-4 hover:shadow-lg border-amber-200"
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
              <div className="flex justify-end">
                <Link
                  to={`/update/${product._id}`}
                  className="mt-3 text-3xl text-indigo-600 hover:text-indigo-800"
                >
                  <FaEdit className="inline-flex" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;