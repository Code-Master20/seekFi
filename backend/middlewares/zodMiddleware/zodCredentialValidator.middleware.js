/*higher order function
Middleware factory
Middleware wrapper
Parameterized middleware
*/
const ErrorHandler = require("../../utils/errorHandler.util");
const zodyCredentialValidator = (zodSchema) => async (req, res, next) => {
  try {
    const parsedData = await zodSchema.parseAsync(req.body);
    req.body = parsedData;
    next();
  } catch (error) {
    return new ErrorHandler(400, error.message)
      .log("zod error", error)
      .send(res);
  }
};

module.exports = zodyCredentialValidator;
