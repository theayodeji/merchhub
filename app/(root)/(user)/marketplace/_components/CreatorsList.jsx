import Link from "next/link";
import SeeMoreButton from "./SeeMoreButton"

const CreatorsList = ({ creators, category }) => {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">{category} Creators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {creators.slice(0, 5).map((creator, index) => (
            <Link href={`/creators/${index}`}
              key={index}
              className="relative bg-cover bg-center h-64 rounded-lg shadow-lg group hover:scale-105 transition-[all] duration-300 ease-in-out"
              style={{ backgroundImage: `url(${creator.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4">
                <div className="text-white">
                  <h3 className="text-lg font-semibold">{creator.name}</h3>
                  <p className="text-sm">{creator.details}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <SeeMoreButton category={category} />
      </div>
    );
  };
  
  export default CreatorsList;
  