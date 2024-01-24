const { Validator } = require("jsonschema");
const validator = require("validator");

const defaultOptions = {
    required: true,
};

const jsValidator = new Validator();

const requireSchema = (schema, options = {}) => {
    const validatorOptions = { ...defaultOptions, ...options };

    const validatorFunc = (req, res, next) => {
        const { body } = req;
        if (!body) {
            res.status(400).json({ error: "missing request body" });
            return;
        }

        const v = jsValidator.validate(body, schema, validatorOptions);
        if (!v.valid) {

            res.status(400).json({
                error: "request body validation failed",
                details: v.errors.map((err) => {
                    if (err.property === 'instance.password') {
                        return `${err.property}: password must contain 1 number (0-9)
            password must contain 1 uppercase letter
            password must contain 1 lowercase letter
            password must contain 1 non-alpha numeric number
            password is 8-16 characters with no space`
                    }
                    return `${err.property}: ${err.message}`
                }),
            });
            return;
        }

        req.validatedBody = v.instance;
        next();
    };

    return validatorFunc;
};

const requireValidId = (req, res, next) => {
    const id = req.params?.id || req.params.vehicleId
    if (validator.isInt(id, { min: 1, max: Number.MAX_SAFE_INTEGER })) {
        req.params.id = parseInt(id);
    } else {
        res.status(400).json({ error: "URL does not contain a valid object ID" });
        return;
    }
    next();
};

module.exports = { requireSchema, requireValidId }