import { FaStore } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#f0f7f4]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
    <div className="">
      <div className="animate-bounce text-green-500">
        <FaStore className="text-6xl" />
      </div>
      <p className="mt-4 text-gray-600 font-medium animate-pulse">
        Loading B2Bulk Platform...
      </p>
    </div>
    </div>
  );
};

export default Loader;