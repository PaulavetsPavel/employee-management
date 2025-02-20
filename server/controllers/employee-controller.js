import employeeService from '../service/employee-service.js'
import logAction from '../utils/logger.js'

class EmployeeController {
	async getEmployees(req, res, next) {
		try {
			const { page = 2, limit = 10, search, sortBy } = req.query
			const offset = (page - 1) * limit
			let userData

			if (search) {
				userData = await employeeService.getEmployeeLikeName(search)
			} else if (sortBy) {
				userData = await employeeService.getAllEmployeesSortBy(sortBy)
			} else {
				userData = await employeeService.getAllEmployeesOnPage(offset, limit)
			}
			userData = await employeeService.getAllEmployees()

			return res.json(userData)
		} catch (err) {
			next(err)
		}
	}
	async getEmployee(req, res, next) {
		try {
			const id = req.params.id

			const userData = await employeeService.getEmployeeById(id)

			return res.json(userData)
		} catch (err) {
			next(err)
		}
	}

	async createEmployee(req, res, next) {
		try {
			const { name, position, hire_date, salary, photo_url } = req.body
			const created_by = req.user.id
			const employeeData = await employeeService.addEmployeeToDB(
				name,
				position,
				hire_date,
				salary,
				photo_url,
				created_by
			)

			// Логирование
			await logAction(
				req.user.id,
				`Added new employee with ID ${employeeData[0].id}`
			)
			return res.json(employeeData)
		} catch (err) {
			next(err)
		}
	}
	async updateEmployee(req, res, next) {
		try {
			const { name, position, hire_date, salary, photo_url } = req.body
			console.log(req.body)

			const id = req.params.id
			const employeeData = await employeeService.editEmployeeToDB(
				id,
				name,
				position,
				hire_date,
				salary,
				photo_url
			)
			//Логирование
			await logAction(req.user.id, `Updated employee with ID ${id}`)
			return res.json(employeeData)
		} catch (err) {
			next(err)
		}
	}
	async deleteEmployee(req, res, next) {
		try {
			const id = req.params.id

			const employeeData = await employeeService.removeEmployeeFromDB(id)
			// Логирование
			await logAction(req.user.id, `Deleted employee with ID ${id}`)
			return res.json(employeeData)
		} catch (err) {
			next(err)
		}
	}
}

export default new EmployeeController()
