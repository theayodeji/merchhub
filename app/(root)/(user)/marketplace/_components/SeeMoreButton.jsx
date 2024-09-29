const SeeMoreButton = ({ category }) => {
    return (
      <div className="mt-4 text-center">
        <a
          href={`/creators/${category.toLowerCase()}`}
          className="text-red-500 font-semibold hover:text-red-600 transition"
        >
          See More in {category} →
        </a>
      </div>
    );
  };
  
  export default SeeMoreButton;
  