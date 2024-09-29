"use client"

import SuggestedProduct from "./SuggestedProduct";

const SuggestedSection = () => {
    const products = [
      {
        name: "Trendy Sneakers",
        price: 150,
        image: "https://images.unsplash.com/photo-1705096953495-8ea06879b986?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        creator: {
          name: "Urban Streetwear",
          profileImage: "https://images.unsplash.com/photo-1578052329422-c049555c1557?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
      {
        name: "Elegant Earrings",
        price: 85,
        image: "https://images.unsplash.com/photo-1676496220343-1585b0cdcc3f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        creator: {
          name: "Adele's Creations",
          profileImage: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkOhSoYRu7Yg8f8zO8Ah8oTFJ4o5MYAT-nQWrR8D5WviWt4PV9",
        },
      },
      {
        name: "Trendy Sneakers",
        price: 150,
        image: "https://images.unsplash.com/photo-1705096953495-8ea06879b986?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        creator: {
          name: "Urban Streetwear",
          profileImage: "https://images.unsplash.com/photo-1578052329422-c049555c1557?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      },
      {
        name: "Elegant Earrings",
        price: 85,
        image: "https://images.unsplash.com/photo-1676496220343-1585b0cdcc3f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        creator: {
          name: "Adele's Creations",
          profileImage: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkOhSoYRu7Yg8f8zO8Ah8oTFJ4o5MYAT-nQWrR8D5WviWt4PV9",
        },
      },
    ];
  
    return (
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6">Suggested For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <SuggestedProduct key={index} product={product} />
          ))}
        </div>
        {/* Link to User's Feed */}
        <div className="text-center mt-8">
          <a
            href="/feed"
            className="text-red-500 font-semibold hover:underline"
          >
            See More in Your Feed
          </a>
        </div>
      </div>
    );
  };
  
  export default SuggestedSection;