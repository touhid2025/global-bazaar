import { use, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  useEffect(()=>{
            document.title="GlobalBazaar | Login"
            },[]);
  const {signIn,googleSign} = use(AuthContext);
  const location = useLocation();
	const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    
    
    if (errors[name]) {
      setErrors({...errors, [name]: null});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
     
      setTimeout(() => {
       
        signIn(formData.email,formData.password)
        .then((result)=>{
		const user = result.user;
    // console.log(user)
     navigate(`${location.state? location.state : '/'}`)

     Swal.fire({
  title: "Successfully Log In!",
  icon: "success",
  draggable: true
});
		
    
	  
	  })
	  .catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
		
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${errorMessage,errorCode}`,
  footer: '<a href="#">Why do I have this issue?</a>'
});
    
	  });


        setIsLoading(false);
        
      }, 1500);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      
       googleSign()
    .then((result) => {
      const user = result.user;
      // console.log(user)
       navigate(`${location.state? location.state : '/'}`)
       Swal.fire({
  title: "Successfully Log In!",
  icon: "success",
  draggable: true
});
    }).catch((error) => {
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${error}`,
  footer: '<a href="#">Why do I have this issue?</a>'
});
      
      
      
    });


      setIsLoading(false);
      
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-amber-50  flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          
          <h1 className="text-3xl font-bold text-amber-600">Welcome Back</h1>
          <p className="mt-2 text-amber-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-amber-100 shadow-xl rounded-xl p-6 md:p-8">
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-emerald-500 focus:border-emerald-500`}
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password Field with Toggle */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-emerald-500 focus:border-emerald-500`}
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-500" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            <div className="mt-2 text-right">
              <Link className="text-sm text-amber-600 hover:text-amber-500">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              'Signing in...'
            ) : (
              <>
                
                Sign In
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-gray-500">or</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className={`w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            <FcGoogle size={25} className='mr-2' />
            
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/log/signup" className="font-medium text-amber-600 hover:text-amber-500">
                Create one
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;