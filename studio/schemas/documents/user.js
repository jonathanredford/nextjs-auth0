export default {
    name: "user",
    type: "document",
    title: "User",
    fields: [
        {
            name: "name",
            type: "string",
            title: "Name"
        },
        {
            name: "email",
            type: "string",
            title: "Email"
        },
        {
            name: "emailVerified",
            type: "boolean",
            title: "Email verified"
        },
        {
            name: "image",
            type: "string",
            title: "Image"
        },
    ],
}
