import { pool } from "../config/db.js";
import bcrypt from "bcrypt";
import tokenService from "./token-service.js";
import UserDto from "../dtos/user-dto.js";


class UserService {
  async registration(email, password) {
    const [candidate] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // проверка существует ли пользователь в бд
    if (candidate[0]) {
      throw new Error("User already exists.");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    // добавление пользователя в бд
    const lastRow = await pool.query(
      "INSERT INTO `users` (`email` , `password_hash` , `role` ) VALUES (?, ?, ?) ",
      [email, hashPassword, "user"]
    );
    // получение последнего добавленного пользователя из бд
    const [addedUser] = await pool.query("SELECT * FROM users WHERE id = ? ", [
      lastRow[0].insertId,
    ]);

    const userDto = new UserDto(
      addedUser[0].id,
      addedUser[0].email,
      addedUser[0].role
    );
    const tokens = tokenService.generateTokens({ ...userDto });
    // добавление токена в бд
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: { ...userDto } };
  }

  async login(email, password) {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!user[0]) {
      throw new Error("User with this email is not found");
      
    }
    const isPassEqual = await bcrypt.compare(password, user[0].password_hash);

    if (!isPassEqual) {
      throw new Error("Invalid password");
    }

    const userDto = new UserDto(user[0].id, user[0].email, user[0].role);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: { ...userDto } };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }
  
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("User is't authirized");
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDB) {
      throw new Error("User is't authirized");
    }

    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
      tokenFromDB.user_id,
    ]);
    const userDto = new UserDto(user[0].id, user[0].email, user[0].role);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: { ...userDto } };
  }

  async getAllUsers() {
    const [users] = await pool.query("SELECT * FROM users ");
    return users;
  }
}

export default new UserService();
