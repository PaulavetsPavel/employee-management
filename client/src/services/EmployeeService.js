import $api from '../http'

export default class EmployeeService {
	static fetchEmployees() {
		return $api.get('/employees')
	}
	static fetchEmployee(id) {
		return $api.get(`/employees/${id}`)
	}

	static createEmployee(data) {
		return $api.post('/employees', data)
	}
	static updateEmployee(data) {
		return $api.put(`/employees/${data.id}`, data)
	}
	static deleteEmployee(id) {
		return $api.delete(`/employees/${id}`)
	}
}
