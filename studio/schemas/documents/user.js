import { MdPerson } from "react-icons/md";

export default {
    name: "user",
    type: "document",
    title: "User",
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
                    name: "content",
                    type: "array",
                    title: "Content",
                    of: [
                        {
                            type: "reference",
                            to: { type: "content" },
                        },
                    ]
                }
            ]
        }
    ],
}
