import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import ReactStars from "react-stars";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";


const ProductDetails = () => {
  useEffect(()=>{
          document.title="GlobalBazaar | Product Details"
          },[]);
  const { user } = useContext(AuthContext);           
  const { id } = useParams(); 
  const data = useLoaderData();
                  
  
  const [buyQty, setBuyQty] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const [product,setProduct] = useState(null);

 

  
  useEffect(() => {
    
      const found = data?.find((p) => p._id == id);  
    setProduct(found);
    
  }, [data,id]);

 

   useEffect(()=>{
    if(product){
      setBuyQty(product.minQuantity)
    }
  },[product])

  
  const inc = () => setBuyQty((q) => q + 1);
  const dec = () => setBuyQty((q) => (q > 1 ? q - 1 : 1));

  
  const handleConfirmBuy = () => {
    
    
    if (buyQty < product.minQuantity) {
      Swal.fire({
        title: "Minimum Quantity Required",
        text: `You must buy at least ${product.minQuantity} units to place an order.`,
        icon: "warning",
      });
      return;
    }

    /* server-side request */
    fetch("https://assignment-eleven-server-side-snowy.vercel.app/purchase", {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product._id,
        quantity: buyQty,
        buyerName: user?.displayName,
        buyerEmail: user?.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const newQuantity = product.quantity - buyQty
          setProduct({...product,quantity: newQuantity})
          Swal.fire("Success", "Product purchased successfully!", "success");
          setShowModal(false);
           
          
        } else {
          Swal.fire("Error", data.message || "Something went wrong", "error");
        }
      })
      .catch(() =>
        Swal.fire("Server Error", "Please try again later", "error")
      );
  };

  /* ------------ loading fallback ------------- */
  

  
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* product hero */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product?.imageURL}
          alt={product?.name}
          className="w-full md:w-1/2 rounded shadow"
        />
        <div className="flex-1">
          <h2 className="text-3xl text-amber-600 font-bold mb-2">
            {product?.name}
          </h2>
          <p className="text-gray-600 mb-1">Brand: {product?.brand}</p>
          <p className="text-gray-600 mb-1">Category: {product?.category}</p>
          <p className="text-gray-600 mb-1">Price: ${product?.price}</p>
          <p className="text-gray-600 mb-1">Min Order: {product?.minQuantity}</p>
          <p className="text-amber-600 font-bold mb-1">Available: {product?.quantity}</p>
          
          <ReactStars
            count={5}
            value={product?.rating}
            edit={false}
            size={24}
            activeColor="#ffd700"
          />
          <p className="mt-4 text-gray-700 whitespace-pre-line">
            {product?.description}
          </p>

          {/* Buy button */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 cursor-pointer bg-amber-600 text-white px-6 py-2 rounded shadow-md hover:bg-amber-700"
          >
            Buy
          </button>
        </div>
      </div>

      {/* === BUY MODAL === */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-amber-100 w-full max-w-md rounded-lg p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl text-amber-600 font-semibold mb-4 text-center">
              Checkout
            </h3>

            <div className="space-y-3">
              {/* auto-filled name & email */}
              <input
                type="text"
                readOnly
                value={user?.displayName || ""}
                className="w-full border p-2 rounded bg-gray-100"
              />
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                className="w-full border p-2 rounded bg-gray-100"
              />

              {/* quantity selector */}
              <label className="block font-medium">Quantity</label>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={dec}
                  className="p-2 rounded cursor-pointer text-white bg-amber-500 hover:bg-amber-600 shadow-md"
                >
                  –
                </button>
                <input
                  type="number"
                  readOnly
                  value={buyQty}
                  className="w-20 text-center border p-2 rounded"
                />
                <button
                  onClick={inc}
                  className="p-2 cursor-pointer rounded text-white bg-amber-500 hover:bg-amber-600 shadow-md"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleConfirmBuy}
                className="w-full bg-amber-600 cursor-pointer text-white py-2 rounded hover:bg-amber-800"
              >
                Confirm Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;