import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Global<span className="text-amber-500">Bazaar</span></h2>
          <p className="text-sm text-gray-300">
            GlobalBazaar is a global B2B wholesale marketplace connecting suppliers
            and buyers for secure and seamless bulk trading experience.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-amber-600">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-amber-600">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-amber-600">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-amber-600">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <NavLink to={'/'} className="hover:text-amber-600">Home</NavLink>
            </li>
            <li>
              <NavLink to={'/all-products'} className="hover:text-amber-600">All Products</NavLink>
            </li>
            <li>
              <NavLink to={'/add-product'} className="hover:text-amber-600">Add Product</NavLink>
            </li>
            <li>
              <NavLink to={'/my-products'} className="hover:text-amber-600">My Product</NavLink>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Electronics</li>
            <li>Fashion & Apparel</li>
            <li>Home Appliances</li>
            <li>Machinery</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>Email: support@globalbazaar.com</li>
            <li>Phone: +1 (234) 567-8901</li>
            <li>Address: 123 Industrial Rd, Dhaka, Bangladesh</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amber-800 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} GlobalBazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;