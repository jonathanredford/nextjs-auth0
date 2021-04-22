import { Result } from 'postcss';
import React from 'react'
import { MdPerson, MdVideoLibrary } from "react-icons/md";

export default {
    name: "user",
    type: "document",
    title: "User",
    liveEdit: true,
    icon: MdPerson,
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name"
        },
        {
            name: "email",
            type: "string",
            title: "Email",
            readOnly: true,
        },
        {
            name: "emailVerified",
            type: "boolean",
            title: "Email verified"
        },
        {
            name: "image",
            type: "string",
            title: "Image",
            readOnly: true,
        },
        {
            name: "access",
            type: "object",
            title: "Access",
            fields: [
                {
                    name: "subscription",
                    type: "array",
                    title: "Subscription",
                    of: [
                        {
                            type: "reference",
                            to: { type: "subscription" },
                        },
                    ]
                },
                {
                    name: "library",
                    type: "array",
                    title: "Library",
                    validation: Rule => Rule.custom(array => {
                        let hasDuplicate = false
                        const contentIds = []
                        const duplicates = []
                        for(var i = 0; i < array.length; i++) {
                            const id = array[i].content._ref
                            if(contentIds.indexOf(id) === -1) {
                                contentIds.push(id)
                            } else {
                                duplicates.push(array[i])
                                hasDuplicate = true
                                i = array.length
                            }
                        }
                        if(hasDuplicate) {
                            const duplicatePaths = duplicates.map((obj, index) => [{_key: obj._key}] || [index])
                            return {
                                message: 'Cannot contain duplicates',
                                paths: duplicatePaths
                            }
                        }
                        return true
                    }),
                    of: [
                        // {
                        //     title: "Content",
                        //     type: 'content'
                        // },
                        {
                            title: "Content access",
                            name: "contentAccess",
                            type: "object",
                            preview: {
                                select: {
                                    title: "content.title",
                                    expires: "expires",
                                    started: "started"
                                },
                                prepare: (selection) => {
                                    const { title, expires, started } = selection
                                    return {
                                        title: title,
                                        subtitle: started
                                        ? (
                                            expires
                                            ? (new Date(expires) - new Date()) < 0 ? `Expired ${expires}` : `Expires ${expires}`
                                            : 'Expiry not set'
                                        )
                                        : 'Not started',
                                        media: <MdVideoLibrary />
                                    }
                                }
                            },
                            fields: [
                                {
                                    name: "content",
                                    title: "Content",
                                    type: "reference",
                                    validation: Rule => Rule.required(),
                                    to: { type: "content" },
                                },
                                {
                                    name: "type",
                                    title: "Type",
                                    type: "string",
                                    validation: Rule => Rule.required(),
                                    options: {
                                        list: [
                                            {
                                                value: "rent",
                                                title: "Rent"
                                            },
                                            {
                                                value: "buy",
                                                title: "Buy"
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: "rentStartWindow",
                                    title: "Rental start duration",
                                    type: "number",
                                    description: "Only valid for rentals. The number of days a customer has to start watching a rental. If not set, the default values will be used.",
                                    validation: Rule => Rule.min(1).max(90)
                                },
                                {
                                    name: "rentWatchWindow",
                                    title: "Rental watch duration",
                                    type: "number",
                                    description: "Only valid for rentals. The number of days a customer has to finish a rental once started. If not set, the default values will be used.",
                                    validation: Rule => Rule.min(1).max(90)
                                },
                                {
                                    name: "expires",
                                    title: "Expires",
                                    type: "datetime",
                                    description: "Only applicable for Rentals. If no expiry is set, the content will be available in the users library forever. However, the rental window will begin once they play the content for the first time.",
                                    validation: Rule => Rule.custom((expires, context) => {
                                        if(context.parent.started === true && !expires) {
                                            return "An expiry date must be set if started is true"
                                        }
                                        return true
                                    })
                                },
                                {
                                    name: "started",
                                    title: "Started",
                                    type: "boolean",
                                    // readOnly: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
}
