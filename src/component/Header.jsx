import { use, useState } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const {user,logOut} = use(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "All Products", href: "/all-products" },
    { name: "Add Product", href: "/add-product" },
    { name: "My Products", href: "/my-products" },
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
  localStorage.removeItem("access-token");
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
    <nav className="bg-amber-700/85 backdrop-blur-2xl mx-2 md:mx-5 rounded-lg sticky top-2 z-50">
      <div to={'/'} className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link className="text-2xl cursor-pointer font-bold text-white">Global<span className="text-amber-400">Bazaar</span></Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className="text-white py-1.5 px-3 rounded-2xl hover:text-amber-400 transition"
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
          <NavLink to={'/cart'} className="relative  text-white hover:text-amber-400 cursor-pointer flex gap-1 items-center">
            <FaShoppingCart/>
            <span>Cart</span>
            <span className="absolute -top-3 left-3"></span>
          </NavLink>
          {/* image */}
          
            {
              user&&<img src={user.photoURL}
              data-tooltip-id="profile-tooltip"
        data-tooltip-html={
          `<strong>${user?.displayName}</strong><br/>
          ${user?.email}
          `
        }
              className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" alt="profile" />
            }
          
          {
            user? (<div className=""><button className="px-4 py-1 border rounded text-amber-600 bg-amber-50 border-amber-600 hover:bg-amber-600 hover:text-white transition" onClick={handleLogout}>Log out</button></div>):
            (<div className="ml-4 flex gap-2">
            <Link to={'/log/login'} className="px-4 bg-amber-50 py-1 border rounded text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white transition">
              Log in
            </Link>
            <Link to={'/log/signup'} className="px-4 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition">
              Register
            </Link>
          </div>)
          }
        </div>

        <Tooltip
        id="profile-tooltip"
        place="bottom"
        effect="solid"
        className=" text-xl"
      />

        {/* Mobile Menu Button */}
        <div className="md:hidden flex">
          {
              user&&<img src={user.photoURL}
              data-tooltip-id="profile-tooltip"
        data-tooltip-html={
          `<strong>${user?.displayName}</strong><br/>
          ${user?.email}
          `
        }
              className="w-10 h-10 rounded-full mr-4" referrerPolicy="no-referrer" alt="profile" />
            }
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
              className="block text-white hover:text-amber-400"
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
          <NavLink to={'/cart'} className="relative text-white hover:text-amber-400 cursor-pointer flex gap-1 items-center">
            <FaShoppingCart/>
            <span>Cart</span>
            <span className="absolute -top-3 left-2.5"></span>
          </NavLink>
          
          {
            user? (<div className=""><button className="px-4 py-1 w-full border bg-amber-50 rounded text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white transition" onClick={handleLogout}>Log out</button></div>):
            (<div className="flex flex-col">
            <Link to={'/log/login'} className="px-4 bg-amber-50 py-1 mb-2.5 border rounded text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white transition">
              Log in
            </Link>
            <Link to={'/log/signup'} className="px-4 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition">
              Register
            </Link>
          </div>)
          }
        </div>
      )}
    </nav>
  );
};

export default Header;