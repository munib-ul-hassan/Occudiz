const registerSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    hashedPassword: {
      type: "string", // minLength: 8, pattern: PASSWORD_REGEX
    },
    phoneNumber: { type: "number" },
    role: { type: "number" },
    token: { type: "string" },
    type: { type: "string" },
    idCard: { type: "string" },
    businessRegisterNum: { type: "string" },
    active: { type: "boolean" },
    fcmToken: { type: "string" },
  },
  required: [
    "name",
    "email",
    "hashedPassword",
    "phoneNumber",
    "role",
    "type",
    "active",
  ],
};

module.exports = { registerSchema };
