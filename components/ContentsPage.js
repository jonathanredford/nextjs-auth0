import { useState } from "react";

import ContentCard from "./ContentCard";

function ContentsPage({ contents }) {
  return (
    <div className="container mx-auto px-6">
      <h3 className="text-gray-700 text-2xl font-medium">Contents</h3>
      <span className="mt-3 text-sm text-gray-500">The Juicy bits.</span>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
        {contents.map((content) => (
          <ContentCard key={content._id} {...content} />
        ))}
      </div>
    </div>
  );
}

export default ContentsPage;
