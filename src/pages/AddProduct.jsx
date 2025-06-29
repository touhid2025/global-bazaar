import { useState, useContext, useEffect } from "react";
import { FaUpload, FaTag, FaListUl } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import ReactStars from 'react-stars'

const categories = [
  "Electronics & Gadgets",
  "Home & Kitchen Appliances",
  "Fashion & Apparel",
  "Industrial Machinery & Tools",
  "Health & Beauty",
  "Automotive Parts & Accessories",
  "Office Supplies & Stationery",
];

const AddProduct = () => {

  useEffect(()=>{
          document.title="GlobalBazaar | Add Product"
          },[]);

  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState({});

  

  const handleChange = (e) => {
  const { name, value, files, type } = e.target;
  const parsedValue = type === "number" ? Number(value) : value;

  setProduct((prev) => ({
    ...prev,
    [name]: files ? files[0] : parsedValue,
  }));
};

  const handleSubmit = (e) => {
    const token = localStorage.getItem('access-token');
    e.preventDefault();

    fetch("https://assignment-eleven-server-side-snowy.vercel.app/products", {
      method: "POST",
      headers: { "content-type": "application/json",'Authorization': `Bearer ${token}`, },
      body: JSON.stringify({userName: user.displayName, userEmail: user.email, ...product}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true,
          });
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-amber-600 mb-8">
        <FaTag className="inline mr-2" />
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-100 p-6 rounded-lg shadow-md"
      >
        {/* Seller Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Your Name</label>
          <input
            type="text"
            name="sellerName"
            value={user?.displayName}
            placeholder="Enter your name"
            onChange={handleChange}
            className="input border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Your Email</label>
          <input
            type="email"
            name="email"
            value={user?.email}
            placeholder="Enter your email"
            onChange={handleChange}
            className="input border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Image URL (optional) */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Image URL</label>
          <input
            type="url"
            name="imageURL"
            placeholder="https://example.com/product.jpg"
            onChange={handleChange}
            className="input border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Product Image File (hidden for now) */}
        <div className="flex flex-col hidden">
          <label className="mb-1 font-semibold">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered border border-gray-300"
          />
        </div>

        {/* Product Name */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            onChange={handleChange}
            className="input border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Main Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="e.g., 100"
            onChange={handleChange}
            className="input border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Minimum Selling Quantity */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Minimum Selling Quantity</label>
          <input
            type="number"
            name="minQuantity"
            placeholder="e.g., 10"
            onChange={handleChange}
            className="input border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Brand */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Brand Name</label>
          <input
            type="text"
            name="brand"
            placeholder="e.g., Samsung"
            onChange={handleChange}
            className="input border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Category</label>
          <select
            name="category"
            onChange={handleChange}
            className="select border border-gray-300 px-3 py-2 rounded-md"
            required
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="mb-1 font-semibold">Short Description</label>
          <textarea
            name="description"
            placeholder="Write a short description of the product"
            rows="3"
            onChange={handleChange}
            className="textarea border border-gray-300 px-3 py-2 rounded-md"
            required
          ></textarea>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Price (per unit)</label>
          <input
            type="number"
            name="price"
            placeholder="e.g., 150"
            onChange={handleChange}
            className="input border border-gray-300 px-3 py-2 rounded-md"
            required
          />
        </div>

        {/*  Rating */}
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Rating</label>
          <ReactStars
            count={5}
            size={30}
            isHalf={true}
            value={product.rating || 0}
            activeColor="#ffd700"
            onChange={(newRating) =>
              setProduct((prev) => ({ ...prev, rating: newRating }))
            }
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full cursor-pointer bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded transition"
          >
            <FaUpload className="inline mr-2" />
            Add Product
          </button>
        </div>
      </form>

      {/* Guidelines */}
      <div className="mt-10 p-6 bg-amber-100 border border-amber-200 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2 text-amber-600 flex items-center">
          <FaListUl className="mr-2" /> Product Submission Guidelines
        </h3>
        <p className="text-gray-700 text-sm">
          Make sure to upload a clear product image or give an image URL.
          Product name and brand should be accurate. Email is used for seller
          verification. Minimum selling quantity must be respected.
        </p>
      </div>
    </div>
  );
};

export default AddProduct;