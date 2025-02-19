import ApiErrors from "../exeptions/api-error.js";

import TokenService from "../service/token-service.js";
export default function (req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return next(ApiErrors.NoAccessError());
    } else {
      next();
    }
  } catch (err) {
    return next(ApiErrors.NoAccessError());
  }
}
