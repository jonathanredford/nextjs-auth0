import Link from 'next/link'
import { urlFor } from '../utils/sanity'
import { formatDistanceToNowStrict, addDays } from 'date-fns'

function ContentCard({ _id, title, landscapeImage, slug, access, showExpired }) {
    return (
        <Link href={`/${slug.current}`}>
            <a className="w-full max-w-sm mx-auto overflow-hidden relative">
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
                {
                    access && (access.expired === false || showExpired === true) && (
                        <div className="absolute bottom-0 right-0 px-3 py-1 rounded-bl-md rounded-tr-md inline-block bg-gray-700 bg-opacity-50 text-white text-sm">
                            {
                                access.expired && showExpired && 'Expired'
                            }
                            {
                                access.expired === false && (
                                    `Expires in ${
                                        access.expires
                                        ? formatDistanceToNowStrict( new Date(access.expires) )
                                        : formatDistanceToNowStrict( addDays(new Date(access.rentWindowStartDate), access.rentStartWindow) )
                                    }`
                                )
                            }
                        </div>
                    )
                }
            </a>
        </Link>
    );
}

export default ContentCard;
