import { use, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaLeaf, FaUser, FaEnvelope, FaLock, FaCamera, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Signup = () => {
	const {createUser,setUser,googleSign,updateUser} = use(AuthContext);
  const navigate = useNavigate();
	const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'photoURL') {
      
      setFormData({...formData, photoURL: value});
      
    } else {
      setFormData({...formData, [name]: value});
      
      // Clear error when field is edited
      if (errors[name]) {
        setErrors({...errors, [name]: null});
      }
      
      // Check password strength in real-time
      if (name === 'password') {
        checkPasswordStrength(value);
      }
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    
    if (password.length >= 6) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain both uppercase and lowercase letters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        
        createUser(formData.email, formData.password)
		.then(result=>{
			const user = result.user;
			setUser(user)
      navigate(`${location.state? location.state : '/'}`)
      Swal.fire({
  title: "Sign Successfully!",
  icon: "success",
  draggable: true})

       updateUser({displayName: formData.name, photoURL: formData.photoURL})
		 .then(()=>{
			setUser({...user,displayName: formData.name, photoURL: formData.photoURL});
		 })
		 .catch((error) => {
			// An error occurred
			// ...
			alert(error)
			setUser(user)
		  });
		})
		.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: `${errorCode,errorMessage}`,
  footer: '<a href="#">Why do I have this issue?</a>'})
	
  });








        setIsLoading(false);
        
      }, 1500);
    }
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    // Simulate Google auth
    setTimeout(() => {
      
       googleSign()
    .then((result) => {
      const user = result.user;
      // console.log(user)
      navigate(`${location.state? location.state : '/'}`)
	  
      Swal.fire({
  title: "Log In Successfully!",
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

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-amber-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 1: return 'Very Weak';
      case 2: return 'Weak';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
			
          <h1 className="text-3xl font-bold text-amber-500">Join GlobalBazaar</h1>
          <p className="mt-2 text-amber-500">Create your account to start your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-amber-100 shadow-xl rounded-xl p-6 md:p-8">
          {/* Profile Picture Upload */}
         
          {/* photo url */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Photo url *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCamera className="text-gray-400" />
              </div>
              <input
                type="text" 
                name="photoURL"                       
                id="photo"
                value={formData.photoURL}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-emerald-500 focus:border-emerald-500`}
                placeholder="Your photoURL"
                disabled={isLoading}
              />
            </div>
            {errors?.photoURL && <p className="mt-1 text-sm text-red-600">{errors?.photoURL}</p>}
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-emerald-500 focus:border-emerald-500`}
                placeholder="Your name"
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

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

          {/* Password Field */}
          <div className="mb-4">
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
                placeholder="At least 6 characters"
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
            
            {/* Password Strength Meter */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-500">
                    Strength: <span className={passwordStrength > 2 ? 'text-green-500' : 'text-amber-500'}>
                      {getPasswordStrengthText()}
                    </span>
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`} 
                    style={{ width: `${passwordStrength * 25}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Must contain uppercase, lowercase letters
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-emerald-500 focus:border-emerald-500`}
                placeholder="Re-enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-500" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>
		  {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 px-4 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center mb-4 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              'Creating account...'
            ) : (
              <>
                
                Create Account
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <div className="px-3 text-gray-500">or</div>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Register Button */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            className={`w-full py-3 px-4 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
			<FcGoogle size={25} className='mr-2' />
            Continue with Google
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?
              <Link to="/log/login" className="font-medium text-amber-600 hover:text-amber-500">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;