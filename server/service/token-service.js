import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    // получение пользователя из базы данных токенов
    const [user] = await pool.query(
      "SELECT user_id, refresh_token FROM tokens WHERE user_id = ?",
      [userId]
    );
    // если пользователя не существует, добавление пользователя и refresh токена в бд
    if (!user || !user.length) {
      const [lastRow] = await pool.query(
        "INSERT INTO tokens (user_id , refresh_token ) VALUES (?, ?) ",
        [userId, refreshToken]
      );

      const [lastAddedToken] = await pool.query(
        "SELECT * FROM tokens WHERE id = ?",
        [lastRow.insertId]
      );

      return lastAddedToken[0];
    } else if (user[0]) {
      // если пользователь существуе, то обновление refresh токена в бд
      user[0].refresh_token = refreshToken;
      await pool.query(
        "UPDATE tokens SET refresh_token = ?  WHERE user_id = ? ",
        [user[0].refresh_token, user[0].user_id]
      );
    }
    const [curentToken] = await pool.query(
      "SELECT * FROM tokens WHERE user_id = ?",
      [user[0].user_id]
    );

    return curentToken[0];
  }

  async removeToken(refreshToken) {
    const [result] = await pool.query(
      "DELETE FROM tokens WHERE refresh_token=?",
      [refreshToken]
    );

    return result;
  }

  async findToken(refreshToken) {
    const [token] = await pool.query(
      "SELECT * FROM tokens WHERE refresh_token = ?",
      [refreshToken]
    );

    return token[0];
  }
}

export default new TokenService();
