"use client"

import { useState } from "react";
import ShopTab from "./ShopTab";
import HistoryTab from "./HistoryTab";
import AboutTab from "./AboutTab";
import FeaturedTab from "./FeaturedTab";

const CreatorShopTabs = () => {
  const [activeTab, setActiveTab] = useState("featured");

  const renderTabContent = () => {
    switch (activeTab) {
      case "shop":
        return <ShopTab />;
      case "history":
        return <HistoryTab />;
      case "about":
        return <AboutTab />;
      case "featured":
        return <FeaturedTab />;
      default:
        return null;
    }
  };

  return (
    <div className=" mt-14 md:w-[65%] w-full ms-auto me-[5%]">
      {/* Tab Buttons */}
      <div className="flex justify-start space-x-4 mb-14">
        <button
          onClick={() => setActiveTab("featured")}
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === "featured"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Featured
        </button>
        <button
          onClick={() => setActiveTab("shop")}
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === "shop"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Catalogue
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === "history"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          History
        </button>
        <button
          onClick={() => setActiveTab("about")}
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === "about"
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          About
        </button>
      </div>

      {/* Tab Content */}
      <div className="">{renderTabContent()}</div>
    </div>
  );
};

export default CreatorShopTabs;
