const CategoriesList = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
      <div className="flex flex-wrap gap-4 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-lg text-white ${
              selectedCategory === category ? "bg-red-500" : "bg-black"
            } hover:bg-red-600 transition`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default CategoriesList;
  