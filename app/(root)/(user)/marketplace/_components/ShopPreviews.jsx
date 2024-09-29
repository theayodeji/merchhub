import ShopPreview from "./ShopPreview"

const ShopPreviews = () => {
    const creators = [
      {
        name: "Adele's Creations",
        description: "Unique handmade jewelry",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkOhSoYRu7Yg8f8zO8Ah8oTFJ4o5MYAT-nQWrR8D5WviWt4PV9",
        shopLink: "/shop/adele-creations",
        products: [
          { name: "Gold Necklace", price: 120, image: "https://images.unsplash.com/photo-1642373174965-ef3793eabcb2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { name: "Ruby Earrings", price: 85, image: "https://images.unsplash.com/photo-1676496220343-1585b0cdcc3f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { name: "Diamond Ring", price: 250, image: "https://images.unsplash.com/photo-1518370265276-f22b706aeac8?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
        ],
      },
      {
        name: "Urban Streetwear",
        description: "Trendy street fashion",
        image: "https://images.unsplash.com/photo-1578052329422-c049555c1557?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        shopLink: "/shop/urban-streetwear",
        products: [
          { name: "Hoodie", price: 60, image: "https://images.unsplash.com/photo-1525199078165-69ce4f553361?q=80&w=1432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { name: "Cap", price: 25, image: "https://images.unsplash.com/photo-1635650804263-1a1941e14df5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
          { name: "Sneakers", price: 150, image: "https://images.unsplash.com/photo-1705096953495-8ea06879b986?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
        ],
      },
    ];
  
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Featured Shops</h1>
        <div className="shop-preview-list">
          {creators.map((creator, index) => (
            <ShopPreview key={index} creator={creator} />
          ))}
        </div>
      </div>
    );
  };
  
  export default ShopPreviews;