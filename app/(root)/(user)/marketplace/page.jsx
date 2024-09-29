import React from 'react'
import Banner from "./_components/Banner"
import TopCreatorsCarousel from "./_components/TopCreators"
import ShopCategoriesAndFilters from "./_components/ShopCategoriesAndFilters"
import ShopPreviews from "./_components/ShopPreviews"
import SuggestedSection from "./_components/SuggestedSection"

const page = () => {

    const creators = [
        {
          name: "Chandra Oh",
          details: "Fashion Designer",
          image: "https://images.unsplash.com/photo-1562293803-4a30b3b0614a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Default image
          hoverImage: "https://images.unsplash.com/photo-1562293851-62219d81a0a1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3De", // Hover image
        },
        {
          name: "KSI",
          details: "Youtube Creator",
          image: "https://phantom-marca.unidadeditorial.es/f4527ef761e9f4f024e5408ed53e08c6/resize/828/f/jpg/assets/multimedia/imagenes/2024/04/05/17122682792067.png", 
          hoverImage: "https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2022-08/KSI%2008172022.jpg?itok=GNi8bnu4",
        },
        {
          name: "Jane Smith",
          details: "Graphic Designer",
          image: "https://via.placeholder.com/300x400", 
          hoverImage: "https://via.placeholder.com/300x400?text=Jane+Hover",
        },
        {
          name: "Jane Smith",
          details: "Graphic Designer",
          image: "https://via.placeholder.com/300x400", 
          hoverImage: "https://via.placeholder.com/300x400?text=Jane+Hover",
        },
        {
          name: "Jane Smith",
          details: "Graphic Designer",
          image: "https://via.place2holder.com/300x400", 
          hoverImage: "https://via.placeholder.com/300x400?text=Jane+Hover",
        }
        // Add more creators here...
      ];
      

  return (
    <div>
        <Banner />
        <div>
            <h1 className='text-4xl font-semibold pt-14 mt-10'>Top Creators <span className='text-xs lg:text-sm text-gray-500'> <img className='inline mb-5' src={"/assets/fire-joypixels.gif"} alt="" width={32} height={32}/> </span></h1>
            <TopCreatorsCarousel creators={creators}/>
        </div>

        <ShopCategoriesAndFilters />
        <ShopPreviews />
        <SuggestedSection />
    </div>
  )
}

export default page