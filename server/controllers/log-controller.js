import logService from "../service/log-service.js";

class LogController {
  async getAllLogs(req, res) {
    try {
      const logsData = await logService.getAllLogsFromDB();

      return res.json(logsData);
    } catch (e) {
      return res.status(500).json(e.messagee)
    }
  }
}
export default new LogController();
