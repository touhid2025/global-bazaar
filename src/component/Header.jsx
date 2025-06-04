import { use, useState } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Header = () => {
  const {user,logOut} = use(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "All Products", href: "/all-products" },
    { name: "Add Product", href: "/add-product" },
    { name: "My Products", href: "/my-products" },
    { name: "Cart", href: "/cart", icon: <FaShoppingCart /> },
  ];

  const handleLogout =()=>{
        logOut()
        .then(() => {
          // Sign-out successful.
          Swal.fire({
  title: "Log Out Successful!",
  icon: "success",
  draggable: true
  });
        }).catch((error) => {
          // An error happened.
          Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${error}`,
  footer: '<a href="#">Why do I have this issue?</a>'
});
 });
    }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600">B2Bulk</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className="text-gray-700 hover:text-green-600 transition"
            >
              {link.icon ? (
                <span className="flex items-center gap-1">
                  {link.icon}
                  {link.name}
                </span>
              ) : (
                link.name
              )}
            </NavLink>
          ))}
          {
            user? (<div className="ml-4"><button className="px-4 py-1 border rounded text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition" onClick={handleLogout}>Log out</button></div>):
            (<div className="ml-4 flex gap-2">
            <Link to={'/log/login'} className="px-4 py-1 border rounded text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition">
              Log in
            </Link>
            <Link to={'/log/signup'} className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Register
            </Link>
          </div>)
          }
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className="block text-gray-700 hover:text-green-600"
            >
              {link.icon ? (
                <span className="flex items-center gap-1">
                  {link.icon}
                  {link.name}
                </span>
              ) : (
                link.name
              )}
            </NavLink>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <button className="px-4 py-1 border rounded text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition">
              Log in
            </button>
            <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;