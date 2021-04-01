import React from 'react'

export default {
  name: "video",
  title: "Video",
  type: "object",
  preview: {
    select: {
      "height": "meta.height",
      "output_format": "output_format",
      "storage": "storage"
    },
    prepare: (selection) => {
      const { height, output_format, storage } = selection
      return {
        title: `${height}p - ${output_format}`,
        subtitle: `${storage.bucket}/${storage.key}/${storage.playlist}`,
        media: <span>▶️</span>
      }
    }
  },
  fields: [
    {
      name: "profile",
      title: "Profile",
      type: "string",
      readOnly: true,
    },
    {
      name: "url",
      title: "URL",
      type: "string",
      readOnly: true,
    },
    {
      name: "cdn_url",
      title: "CDN URL",
      type: "string",
      readOnly: true,
    },
    {
      name: "bitrate",
      title: "Bitrate",
      type: "number",
      readOnly: true,
    },
    {
      name: "output_format",
      title: "Output format",
      type: "string",
      readOnly: true,
    },
    {
      name: "storage",
      title: "Storage",
      type: "object",
      readOnly: true,
      fields: [
        {
          name: "bucket",
          title: "Bucket",
          type: "string"
        },
        {
          name: "playlist",
          title: "Playlist",
          type: "string",
        },
        {
          name: "type",
          title: "Type",
          type: "string",
        },
        {
          name: "key",
          title: "Key",
          type: "string",
        },
        {
          name: "format",
          title: "Format",
          type: "string",
        },
      ]
    },
    {
      name: "tag",
      title: "Tag",
      type: "string",
      readOnly: true,
    },
    {
      name: "meta",
      title: "Meta",
      type: "object",
      readOnly: true,
      fields: [
        {
          name: "resolution_width",
          title: "Resolution width",
          type: "number",
          readOnly: true,
        },
        {
          name: "resolution_height",
          title: "Resolution height",
          type: "number",
          readOnly: true,
        },
        {
          name: "framerate",
          title: "Framerate",
          type: "string",
          readOnly: true,
        },
        {
          name: "height",
          title: "Height",
          type: "number",
          readOnly: true,
        },
        {
          name: "width",
          title: "Width",
          type: "number",
          readOnly: true,
        },
        {
          name: "codec",
          title: "Codec",
          type: "string",
          readOnly: true,
        },
        {
          name: "dar",
          title: "DAR",
          type: "string",
          readOnly: true,
        },
        {
          name: "aspect_ratio",
          title: "Aspect ratio",
          type: "string",
          readOnly: true,
        },
        {
          name: "sar",
          title: "SAR",
          type: "string",
          readOnly: true,
        },
        {
          name: "bitrate",
          title: "Bitrate",
          type: "string",
          readOnly: true,
        },
      ]
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      readOnly: true,
    },
    {
      name: "user_tag",
      title: "User tag",
      type: "string",
      readOnly: true,
    },
    {
      name: "size",
      title: "Size",
      type: "string",
      readOnly: true,
    },
  ],
};
