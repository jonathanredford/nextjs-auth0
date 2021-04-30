import { Fragment } from 'react'
import { urlFor } from '../utils/sanity'
import { formatDistanceToNowStrict, addDays } from 'date-fns'

function ContentCardVertical({ verticalImage, access }) {
  return (
    <Fragment>
      <div
          className="rounded-md aspect-w-2 aspect-h-3 bg-cover"
          style={{
            backgroundImage: `url('${urlFor(verticalImage)
                .auto("format")
                .fit("crop")
                .width(768)
                .quality(80)}`,
          }}
      />
      {
          access && access.expired === false
          ? (
              <div className="absolute bottom-0 right-0 px-3 py-1 rounded-bl-md rounded-tr-md inline-block bg-gray-700 bg-opacity-50 text-white text-sm">
                  {
                      access.expires
                      ? (
                          `Expires in ${formatDistanceToNowStrict(
                              new Date(access.expires)
                          )}`
                      )
                      : (
                          `Expires in ${formatDistanceToNowStrict(
                              addDays(new Date(access.rentWindowStartDate), access.rentStartWindow)
                          )}`
                      )
                  }
              </div>
          ) : null
      }
    </Fragment>
  );
}

export default ContentCardVertical;
