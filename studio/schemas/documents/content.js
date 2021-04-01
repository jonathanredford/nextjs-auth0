import { MdVideoLibrary } from "react-icons/md";

export default {
  name: "content",
  title: "Content",
  type: "document",
  icon: MdVideoLibrary,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "encodeJobId",
      title: "Encode Job ID",
      type: "string",
      readOnly: true
    },
    {
      name: "url",
      title: "URL",
      type: "string",
      readOnly: true
    },
    {
      name: "mediaType",
      title: "Media type",
      type: "string",
      options: {
        list: [
          {
            value: "movie",
            title: "Movie"
          },
          {
            value: "episode",
            title: "Episode"
          },
          {
            value: "trailer",
            title: "Trailer"
          },
          {
            value: "bonus",
            title: "Bonus"
          },
          {
            value: "other",
            title: "Other"
          },
        ]
      }
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      description: "Recommended size: 1920x1080 (16:9)",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "videos",
      title: "Videos",
      type: "array",
      readOnly: true,
      of: [
        {
          type: "video"
        }
      ]
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      readOnly: true,
      of: [
        {
          type: "videoImage"
        }
      ]
    }
  ],

  preview: {
    select: {
      title: "title",
      media: "thumbnail",
    },
  },
};
