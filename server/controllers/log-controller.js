import logService from "../service/log-service.js";

class LogController {
  async getAllLogs(req, res, next) {
    try {
      const logsData = await logService.getAllLogsFromDB();

      return res.json(logsData);
    } catch (err) {
      next(err);
    }
  }
}
export default new LogController();
