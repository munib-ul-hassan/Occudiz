const registerSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        password: {
            type: "string",
            // minLength: 8,
            // pattern: PASSWORD_REGEX,
        },
        roleId: { type: "number" },
        type: { type: "string" }
    },
    required: ["email", "password"],
};

module.exports = { registerSchema };