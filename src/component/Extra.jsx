import React from 'react';
import { motion } from 'framer-motion';

const Extra = ({ products }) => {
  const featured = products?.slice(0, 4);

  return (
    <section className="my-10 px-4 max-w-6xl mx-auto">
      <motion.h2
  className="text-3xl font-bold mb-6 text-center"
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  animate={{
    color: ['#b45309', '#78350f', '#d97706', '#b45309'], // amber shades
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    repeatType: 'loop',
  }}
>
   Featured Products
</motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((product, index) => (
          <motion.div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
          >
            <motion.img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-40 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.brand}</p>
              <p className="text-amber-600 font-bold">${product.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Extra;