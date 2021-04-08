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
      name: "description",
      title: "Description",
      type: "localeBlockContent",
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
      name: "genres",
      title: "genres",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "genre" },
        },
      ],
    },
    {
      name: "geoRules",
      title: "Geo Restrictions",
      type: "geoRules",
      // description: "Only applies if countries are added in the countries field",
    },
    {
      name: "pricing",
      title: "Pricing",
      type: "pricing",
    },
    {
      title: "Vertical Image",
      name: "verticalImage",
      description: "Recommended size: 2000 x 3000 (2:3)",
      type: "image",
    },
    {
      title: "Landscape Image",
      name: "landscapeImage",
      description: "Recommended minimum size: 1920 x 1080 (16:9). Optimum size: 3840 x 2160 (16:9)",
      type: "image",
    },
    {
      title: "Background image",
      name: "backgroundImage",
      description: "Recommended minimum size: 1920 x 1080 (16:9). Optimum size: 3840 x 2160 (16:9)",
      type: "image",
    },
    {
      name: "videoThumbnail",
      title: "Video Thumbnail",
      description: "Recommended minimum size: 1920 x 1080 (16:9). Optimum size: 3840 x 2160 (16:9)",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "status",
      title: "Status",
      type: "string",
      // readOnly: true,
    },
    {
      name: "sourceJson",
      title: "Source (JSON)",
      type: "string",
      readOnly: true,
    },
    // {
    //   name: "source",
    //   title: "Source",
    //   type: "s3Object",
    //   readOnly: true,
    // },
    {
      name: "transcodeTaskId",
      title: "Transcode Task ID",
      type: "string",
      readOnly: true
    },
    {
      name: "transcodedJson",
      title: "Transcoded (JSON)",
      type: "string",
      readOnly: true,
    },
    // {
    //   name: "playlistUrl",
    //   title: "Playlist URL",
    //   type: "string",
    //   readOnly: true
    // },
    // {
    //   name: "videos",
    //   title: "Videos",
    //   type: "array",
    //   readOnly: true,
    //   of: [
    //     {
    //       type: "video"
    //     }
    //   ]
    // },
    // {
    //   name: "images",
    //   title: "Images",
    //   type: "array",
    //   readOnly: true,
    //   of: [
    //     {
    //       type: "videoImage"
    //     }
    //   ]
    // }
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "landscapeImage",
    },
  },
};
