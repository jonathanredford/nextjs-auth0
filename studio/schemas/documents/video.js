import { MdPlayCircleOutline } from 'react-icons/md'

export default {
  name: "video",
  title: "Video",
  type: "document",
  icon: MdPlayCircleOutline,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      validation: Rule => Rule.required(),
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
      name: "status",
      title: "Status",
      type: "string",
    },
    {
      name: "transcodeId",
      title: "Transcode ID",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "image",
      title: "Thumbnail",
      description: "Recommended minimum size: 1920 x 1080 (16:9). Optimum size: 3840 x 2160 (16:9)",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "source",
      title: "Source",
      type: "contentSource",
      // readOnly: true,
    },
    {
      name: "output",
      title: "Output",
      type: "object",
      fields: [
        {
          title: "Bucket",
          name: "bucket",
          type: "string",
        },
        {
          title: "Key",
          name: "key",
          type: "string",
        },
        {
          title: "Playlist",
          name: "playlist",
          type: "string",
        },
        {
          title: "JSON",
          name: "json",
          type: "string",
        },
      ],
    }
  ],
};
