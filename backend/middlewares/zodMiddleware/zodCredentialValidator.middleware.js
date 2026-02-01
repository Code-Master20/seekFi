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
    //way to extract first key and value from an object if key and value is unknown
    const [firstKey, firstValue] = Object.entries(error)[1];
    const zodErrorObj = JSON.parse(firstValue);
    // firstKey === message
    // zodErrorObj[0] === {}
    //zodErrorObj[0].code == too_big
    //zodErrorObj[0].message === defined string message
    //zodErrorObj[0].path === ["xyz"]
    const zodError = {
      msg: zodErrorObj[0].message,
      path: zodErrorObj[0].path,
      code:
        zodErrorObj[0].code === "custom"
          ? "special char missing"
          : zodErrorObj[0].code,
    };
    return new ErrorHandler(400, zodError).send(res);
  }
};

module.exports = zodyCredentialValidator;
