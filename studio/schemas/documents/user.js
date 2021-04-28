import { Result } from 'postcss';
import React from 'react'
import { MdPerson, MdVideoLibrary } from "react-icons/md";

export default {
    name: "user",
    type: "document",
    title: "User",
    liveEdit: true,
    icon: MdPerson,
    preview: {
        select: {
            title: 'name',
            subtitle: 'email'
        }
    },
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
                        try {
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
                        } catch(err) {
                            console.log(err)
                            return true
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
                                    description: "Only valid for rentals. The number of days a customer has to start watching a rental.",
                                    validation: Rule => Rule.custom((days, context) => {
                                        if(context.parent.type === 'rent') {
                                            if(parseInt(days) < 1 || parseInt(days) > 365) {
                                                return 'Value must be between 1 and 365 (inclusive)'
                                            }
                                            if(!days) {
                                                return 'A duration must be set for rentals'
                                            }
                                        }
                                        return true
                                    })
                                },
                                {
                                    name: "rentWindowStartDate",
                                    title: "Rental window start date",
                                    type: "datetime",
                                    description: "Choose the date the rental window starts from. In most cases, the current date and time should be used. Only applicable for rentals.",
                                    validation: Rule => Rule.custom((rentalStartDate, context) => {
                                        if(context.parent.type === 'rent') {
                                            if(!rentalStartDate) {
                                                return 'A rental start date must be selected'
                                            }
                                        }
                                        return true
                                    }),
                                    options: {
                                        dateFormat: 'dddd, MMMM Do YYYY -',
                                        timeFormat: 'HH:mmA',
                                        timeStep: 15,
                                        calendarTodayLabel: 'Now'
                                    }
                                    // readOnly: true,
                                },
                                {
                                    name: "rentWatchWindow",
                                    title: "Rental watch duration",
                                    type: "number",
                                    description: "Only valid for rentals. The number of days a customer has to finish a rental once started.",
                                    validation: Rule => Rule.custom((days, context) => {
                                        if(context.parent.type === 'rent') {
                                            if(parseInt(days) < 1 || parseInt(days) > 365) {
                                                return 'Value must be between 1 and 365 (inclusive)'
                                            }
                                            if(!days) {
                                                return 'A duration must be set for rentals'
                                            }
                                        }
                                        return true
                                    })
                                },
                                {
                                    name: "expires",
                                    title: "Expires",
                                    type: "datetime",
                                    description: "Only applicable for Rentals. If no expiry is set, the content will be available in the users library forever. However, the rental window will begin once they play the content for the first time.",
                                    validation: Rule => Rule.custom((expires, context) => {
                                        if(context.parent.started === true && context.parent.type === 'rent' && !expires) {
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
                                },
                            ]
                        }
                    ]
                }
            ]
        }
    ],
}
