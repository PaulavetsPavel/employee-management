import userService from "../service/user-service.js";
import { validationResult } from "express-validator";
import ApiErrors from "../exeptions/api-error.js";

class UserController {
  async registration(req, res, next) {
    try {
      // валидация данных
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiErrors.BadRequest("Validation error", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
  async getUsers(req, res, next) {
    try {
      const userData = await userService.getAllUsers();
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
