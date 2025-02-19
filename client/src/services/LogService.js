import $api from '../http'

export default class LogService {
	static fetchLogs() {
		return $api.get('/logs')
	}
}
