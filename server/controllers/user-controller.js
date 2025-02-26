import userService from "../service/user-service.js";
import { validationResult } from "express-validator";

class UserController {
  async registration(req, res) {
    try {
      // валидация данных
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(500).json(errors.errors);
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      return res.status(500).json(e.messagee);
    }
  }
  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }
  async getUsers(req, res) {
    try {
      const userData = await userService.getAllUsers();
      return res.json(userData);
    } catch (err) {
      res.status(400).json(e.message);
    }
  }
}

export default new UserController();
