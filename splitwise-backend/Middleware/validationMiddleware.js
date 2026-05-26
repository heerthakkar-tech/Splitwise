function validate(schema) {
  return (req, res, next) => {
    try {
      // Validate the request body in compare to the schema
      const { error, value } = schema.validate(req.body, {
        abortEarly: false, // return all errors  not just the first one means it does not stop at first error it gives you all errors then stop
        stripUnknown: true, // remove fields not defined in the schema
      });

      if (error) {
        const errorMessage = error.details
          .map((detail) => detail.message)
          .join(", ");
        return res.status(400).json({ error: errorMessage });
      }

      req.body = value;

      return next();
    } catch (error) {
      console.log(error);
      return next();
    }
  };
}

module.exports = validate;
