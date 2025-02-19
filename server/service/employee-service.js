import { pool } from '../config/db.js'

class EmployeeService {
	async getAllEmployees() {
		const [employees] = await pool.query(`SELECT * FROM employees  `)
		return employees
	}

	async getAllEmployeesOnPage(offset, limit) {
		const [employees] = await pool.query(
			`SELECT * FROM employees LIMIT ${offset}, ${limit} `
		)
		return employees
	}

	async getEmployeeById(id) {
		const [employee] = await pool.query(
			`SELECT * FROM employees WHERE id = ${id}  `
		)
		return employee
	}
	async getEmployeeLikeName(name) {
		const employee = await pool.query(
			`SELECT * FROM employees WHERE name LIKE '${name}'`
		)

		return employee[0]
	}
	async getAllEmployeesSortBy(sort) {
		const [employees] = await pool.query(
			`SELECT * FROM employees ORDER BY ${sort} `
		)
		return employees
	}

	async addEmployeeToDB(name, position, hire_date, salary, photo_url) {
		const lastRow = await pool.query(
			`INSERT INTO employees (name , position , hire_date, salary, photo_url ) VALUES ('${name}', '${position}', '${hire_date}', '${salary}', '${photo_url}') `
		)
		// получение последнего добавленного пользователя из бд
		const [addedEmployee] = await pool.query(
			`SELECT * FROM employees WHERE id = ${lastRow[0].insertId} `
		)

		return addedEmployee
	}

	async editEmployeeToDB(id, name, position, hire_date, salary, photo_url) {
		const lastRow = await pool.query(
			`UPDATE employees SET name='${name}' , position='${position}' , hire_date='${hire_date}', salary=${salary}, photo_url='${photo_url}' WHERE id=${id}`
		)

		const updatedEmployee = await pool.query(
			`SELECT * FROM employees WHERE id = ${id}`
		)

		return updatedEmployee[0]
	}
	async removeEmployeeFromDB(id) {
		const [result] = await pool.query(`DELETE FROM employees WHERE id=${id}`)

		return result
	}
}

export default new EmployeeService()
