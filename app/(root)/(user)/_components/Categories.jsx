import { categories } from "@/constants";
import Link from "next/link";


export default function Categories() {

const CategorySection = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-10">
      {categories.map((category, index) => (
        <Link
          href={"#"} 
          key={index}
          className="relative h-40 bg-cover bg-center group rounded-xl overflow-hidden shadow-md"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-[#ed3636aa] transition duration-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-2xl text-center text-wrap p-10 font-semibold  group-hover:text-3xl transition-all duration-500">
              {category.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};


  return (
    <div className=" my-10 block isolate">
      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="font-semibold text-3xl">Categories</h2>
        <Link href={"#"}>
          <span className="font-semibold">See All</span>
        </Link>
      </div>
        
        {/* <div className="categoryswiper grid grid-cols-2">
            <div className="aspect-square isolate relative rounded-2xl overflow-hidden">
                <img src="/assets/fullpromo1.png" alt="" className="h-full object-cover object-right hover:scale-125 transition-[transform] ease-out duration-300"/>
                <p className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-white z-20 font-semibold text-xl">Female Clothing</p>
                <div className="overlay absolute bg-black h-full w-full opacity-30 top-0 left-0"></div>
            </div>
        </div> */}
        <CategorySection categories={categories}/>
    </div>
  )
}
