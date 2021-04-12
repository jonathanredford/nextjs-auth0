import Link from "next/link";
import { urlFor } from "../utils/sanity";

function ContentCard({ _id, title, landscapeImage, slug }) {
  return (
    <Link href={`/${slug.current}`}>
      <a className="w-full max-w-sm mx-auto overflow-hidden">
        <div
          className="rounded-md aspect-w-16 aspect-h-9 bg-cover"
          style={{
            backgroundImage: `url('${urlFor(landscapeImage)
              .auto("format")
              .fit("crop")
              .width(768)
              .quality(80)}`,
          }}
        />
        <div className="px-3 py-3">
          <h3 className="text-gray-300">{title}</h3>
          <span className="text-gray-500 mt-2">
            {/* ${defaultProductVariant?.price} */}
          </span>
        </div>
      </a>
    </Link>
  );
}

export default ContentCard;
