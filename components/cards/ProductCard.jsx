import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="relative bg-white rounded-lg shadow-lg overflow-hidden group isolate">
      <div
        className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300 relative"
        style={{ backgroundImage: `url(${product.image})` }}
      >
      <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
       {product.creatorm && <h6 className="text-sm font-semibold text-gray-800">{product.creator}</h6>}
        <p className="text-gray-600">${product.price}</p>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < product.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.478 4.554h4.797c.967 0 1.37 1.24.588 1.81l-3.884 2.827 1.478 4.554c.3.921-.755 1.688-1.54 1.124L10 14.768l-3.87 2.728c-.785.565-1.84-.203-1.54-1.124l1.478-4.554-3.884-2.827c-.782-.57-.38-1.81.588-1.81h4.797l1.478-4.554z" />
            </svg>
          ))}
        </div>
        <p
          className={`text-sm ${
            product.stock > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
