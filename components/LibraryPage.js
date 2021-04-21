import { useState } from "react";

import ContentCard from "./ContentCard";

function LibraryPage({ library }) {
  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-200 text-2xl font-medium">My Library</h3>
      <span className="mt-3 text-sm text-gray-500">Access your purchases.</span>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {library.map((item) => {
          console.log(item)
          return <ContentCard key={item.content._id} {...item.content} />
        })}
      </div>
    </div>
  );
}

export default LibraryPage;
