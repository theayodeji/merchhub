const ShopBanner = () => {
    return (
      <div className="relative w-full h-64 md:h-72">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center rounded-md"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1664308703345-1ed3d37eacd7?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')", // Replace with your image URL
          }}
        ></div>
  
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
  
        {/* Banner Text */}
        <div className="relative flex flex-col items-center justify-center h-full">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-5" style={{ fontFamily: " " }}>
            Shop till you drop
          </h1>
          <p className="text-white font-semibold">From the best of the best in the industry!</p>
        </div>
      </div>
    );
  };
  
  export default ShopBanner;
  