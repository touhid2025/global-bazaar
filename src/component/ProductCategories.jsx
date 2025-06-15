import { Link } from 'react-router';

const categories = [
  {
    name: 'Electronics & Gadgets',
    image: 'https://i.ibb.co/Xfxb0n9n/samsung.jpg',
    description: 'Discover the latest tech products and gadgets for your wholesale needs.',
  },
  {
    name: 'Home & Kitchen Appliances',
    image: 'https://i.ibb.co/PZpgPbHz/guiter.jpg',
    description: 'Appliances for modern kitchens and homes at unbeatable wholesale prices.',
  },
  {
    name: 'Fashion & Apparel',
    image: 'https://i.ibb.co/7dTHz1KV/macbook.jpg',
    description: 'Trendy clothing and apparel for retailers and bulk buyers.',
  },
  {
    name: 'Industrial Machinery & Tools',
    image: 'https://i.ibb.co/93s9Bwf8/tree4.jpg',
    description: 'Heavy-duty machinery and tools for your industrial business.',
  },
  {
    name: 'Health & Beauty',
    image: 'https://i.ibb.co/vCfpggym/tree1.jpg',
    description: 'Skincare, wellness, and beauty essentials in wholesale bulk.',
  },
];

const ProductCategories = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl text-amber-600 font-bold text-center mb-8">Product Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className=" rounded-lg bg-amber-100 shadow-2xl hover:shadow transition overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{category.description}</p>
              <Link
                to={`/categories/${category.name}`}
                className="text-amber-600 py-2 px-4 rounded-lg border border-amber-600 hover:bg-amber-600 hover:text-white font-medium"
              >
                View Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;