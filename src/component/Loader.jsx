import { FaStore } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#f0f7f4]/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
    <div className="flex items-center justify-center h-40">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-amber-300 border-t-transparent animate-spin"></div>
      </div>
    </div>
    <div className="text-2xl animate-bounce font-bold text-gray-900">Global<span className="text-amber-600">Bazaar</span></div>
    </div>
  );
};

export default Loader;