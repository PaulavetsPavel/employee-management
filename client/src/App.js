import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'

import { Context } from './index'
import EmployeeService from './services/EmployeeService'

const App = () => {
	const { store } = useContext(Context)
	const [employees, setemployees] = useState([])
	// проверка наличия авторизованного пользователя при первой загрузке
	useEffect(() => {
		if (localStorage.getItem('token')) {
			store.checkAuth()
		}
	}, [store])

	async function getEmployees() {
		try {
			const response = await EmployeeService.fetchEmployees()
			setemployees(response.data)
		} catch (err) {
			console.log(err)
		}
	}

	async function addEmployee(newEmployee) {
		try {
			const response = await EmployeeService.createEmployee(newEmployee)
		} catch (err) {
			console.log(err)
		}
	}
	console.log(store.isRegistration)
	if (store.isLoading) return <div>Загрузка ...</div>

	return (
		<div className='App'>
			<h1>
				{store.isAuth
					? `Пользователь: ${store.user.email} ${store.user.role}`
					: `АВТОРИЗУЙТЕСЬ`}
			</h1>
			<button
				onClick={() => {
					store.logout()
				}}
			>
				Выйти
			</button>
			{/* <div>
				<button onClick={getEmployees}>Get employees</button>
			</div> */}

			{/* {employees.map(employee => (
				<div key={employee.id}>
					<EmployeeItem employee={employee} />
				</div>
			))} */}
			{/* <div>
				<button onClick={addEmployee}>Add</button>
			</div> */}
		</div>
	)
}

export default observer(App)
