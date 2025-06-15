import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { Link, useLoaderData } from 'react-router';

const MyProducts = () => {
    const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch user-specific products
  useEffect(() => {
    const filteredData = data.filter((p)=> p.userEmail == user.email);
    setProducts(filteredData)
  }, [data,user]);

  // Delete Handler
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This product will be permanently deleted!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/products/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Product has been deleted.', 'success');
              setProducts(products.filter(p => p._id !== id));
            }
          });
      }
    });
  };

  // Filtered products
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <motion.h2
        className="text-3xl font-bold text-amber-600 text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
         My Products
      </motion.h2>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 border-amber-400 border rounded w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No matching products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <motion.div
              key={product._id}
              className="bg-amber-100 rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 space-y-1">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="text-sm text-gray-500">Category: {product.category}</p>
                <p className="text-amber-700 font-bold">${product.price}</p>
                <div className="flex justify-end gap-2 pt-2">
                  <Link to={`/update/${product._id}`}
                    className="px-3 py-1 text-sm bg-amber-500 text-white rounded hover:bg-amber-600"
                    
                  >
                    Edit
                  </Link>
                  <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyProducts;