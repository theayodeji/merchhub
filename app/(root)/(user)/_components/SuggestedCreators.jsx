import React from "react";
import CreatorCard from "@/components/cards/CreatorCard";
import Link from "next/link";

const SuggestedCreators = ({ creators }) => {
  return (
    <div className="suggested-creators-section flex-1 py-12 md:py-0 flex flex-col">
      <h2 className="text-3xl font-bold text-center mb-8">Suggested Creators</h2>
      <div className="creators-list space-y-4">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
      <Link href={'#'} className="mt-7 ml-auto">
        <span className="font-semibold">View More</span>
        <img src="assets/arrowhead-right.svg" width={20} height={20} alt="" className="inline"/>
      </Link>
    </div>
  );
};

export default SuggestedCreators;
