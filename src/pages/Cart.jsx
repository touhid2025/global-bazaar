import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
    useEffect(()=>{
          document.title="GlobalBazaar | Cart"
          },[]);
  const { user, loading: authLoading } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /* fetch cart items for this user */
  useEffect(() => {
    if (authLoading) return;
    fetch(`https://assignment-eleven-server-side-snowy.vercel.app/cart?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [authLoading, user]);

  /*  remove / cancel purchase */
  const handleRemove = (cartId, productId, qty) => {
    Swal.fire({
      title: 'Remove item?',
      text: `This will cancel your order of ${qty} unit(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it',
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`https://assignment-eleven-server-side-snowy.vercel.app/cart/${cartId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, qty }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            Swal.fire('Removed!', 'Item has been removed.', 'success');
            setItems((prev) => prev.filter((i) => i._id !== cartId));
          } else {
            Swal.fire('Error', data.message || 'Something went wrong', 'error');
          }
        })
        .catch(() => Swal.fire('Server error', '', 'error'));
    });
  };

  if (loading) return <p className="text-center text-amber-500 text-2xl font-bold animate-bounce py-10">Loading cart…</p>;
  if (!items.length)
    return <p className="text-center  text-amber-600 font-bold py-30">Your cart is empty.</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <motion.h2
        className="text-3xl font-bold text-amber-600 text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
         My Cart
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(({ _id, product, qty, date }) => (
          <motion.div
            key={_id}
            className="bg-amber-200 rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 space-y-1">
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className=" text-gray-600">
                Brand: {product.brand} | Cat: {product.category}
              </p>
              <p className=" text-gray-600">
                Bought Qty: {qty} | Min Qty (required): {product.minQuantity}
              </p>
              <p className=" text-gray-600 font-bold">
                Buying Date:{' '}
                {new Date(date).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <p className="text-gray-600 text-sm">{product.description}</p>

              <button
                onClick={() => handleRemove(_id, product._id, qty)}
                className="mt-3 cursor-pointer flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                <FaTrash /> Remove
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Cart;