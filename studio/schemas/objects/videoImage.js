import React from 'react'

export default {
  name: "videoImage",
  title: "Image",
  type: "object",
  preview: {
    select: {
      "meta": "meta",
      "tag": "tag",
      "storage": "storage"
    },
    prepare: (selection) => {
      const { meta, tag, storage } = selection
      return {
        title: `${tag} - ${meta.width}x${meta.height}px - ${meta.format}`,
        subtitle: `${storage.bucket}/${storage.key}`,
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
      name: "meta",
      title: "Meta",
      type: "object",
      readOnly: true,
      fields: [
        {
          name: "format",
          title: "Format",
          type: "string",
          readOnly: true,
        },
        {
          name: "start_time",
          title: "Start time",
          type: "number",
          readOnly: true,
        },
        {
          name: "interval",
          title: "Interval",
          type: "number",
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
          name: "duration",
          title: "Duration",
          type: "number",
          readOnly: true,
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
      name: "user_tag",
      title: "User tag",
      type: "string",
      readOnly: true,
    },
  ],
};
