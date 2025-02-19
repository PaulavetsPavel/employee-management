import { pool } from "../config/db.js";

class LogService {
  async getAllLogsFromDB() {
    const [logs] = await pool.query("SELECT * FROM logs ");
    return logs;
  }
}
export default new LogService();
