import { useState } from 'react';
import ReactStars from 'react-stars'
import { useLoaderData, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

const UpdateProduct = () => {
    const products = useLoaderData();
    const {id} = useParams();
    const navigate = useNavigate();
    
    const product = products.find(plan => plan._id == id);
  const [formData, setFormData] = useState({
    imageURL: product?.imageURL || '',
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || '',
    rating: product?.rating || 0,
    description: product?.description || '',
    quantity: product?.quantity || 0,
    minQuantity: product?.minQuantity || 0,
  });

  const categories = [
    'Electronics & Gadgets',
    'Home & Kitchen Appliances',
    'Fashion & Apparel',
    'Industrial Machinery & Tools',
    'Health & Beauty',
    'Automotive Parts & Accessories',
    'Office Supplies & Stationery',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRatingChange = (newRating) => {
    setFormData({ ...formData, rating: newRating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    fetch(`http://localhost:3000/products/${product._id}`,{
        method: 'PUT',
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.modifiedCount){
            Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Plant updated successfully",
  showConfirmButton: false,
  timer: 1500
});
    navigate('/all-products')
        }
    })
    
    
     // Function passed to handle updating logic
  };


  

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-amber-100 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="mb-1 font-semibold">Image URL</label>
        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          defaultValue={formData.imageURL}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <label className="mb-1 font-semibold">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          defaultValue={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <label className="mb-1 font-semibold">Brand Name</label>
        <input
          type="text"
          name="brand"
          placeholder="Brand Name"
          defaultValue={formData.brand}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <label className="mb-1 font-semibold">Category</label>
        <select
          name="category"
          defaultValue={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <label className="mb-1 font-semibold">Rating</label>
        <ReactStars
          count={5}
          value={formData.rating}
          onChange={handleRatingChange}
          size={24}
          activeColor="#ffd700"
        />
        <label className="mb-1 font-semibold">Description</label>
        <textarea
          name="description"
          placeholder="Product Description"
          defaultValue={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        ></textarea>
        <label className="mb-1 font-semibold">Quantity</label>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          defaultValue={formData.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <label className="mb-1 font-semibold">Minimum Selling Quantity</label>
        <input
          type="number"
          name="minQuantity"
          placeholder="Minimum Selling Quantity"
          defaultValue={formData.minQuantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-800"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;