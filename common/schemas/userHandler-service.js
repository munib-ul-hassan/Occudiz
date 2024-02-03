const registerSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: {
      type: "string", // minLength: 8, pattern: PASSWORD_REGEX
    },
    phoneNumber: { type: "string" },
    role: { type: "number" },
    token: { type: "string" },
    type: { type: "string" },
    idCard: { type: "string" },
    businessRegisterNum: { type: "string" },
    active: { type: "boolean" },
    fcmToken: { type: "string" },
  },
  required: ["email", "password", "name", "phoneNumber", "type"],
};

const loginSchema = {
  type: "Object",
  properties: {
    email: { type: "string", format: "email" },
    password: {
      type: "string", // minLength: 8, pattern: PASSWORD_REGEX
    },
  },
  required: ["email", "password"],
};

const updateSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: {
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
  required: [],
};

module.exports = { registerSchema, loginSchema, updateSchema };
