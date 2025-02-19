import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import EmployeeFormAdd from '../components/employee-form/EmployeeFormAdd.jsx'
import EmployeeFormEdit from '../components/employee-form/EmployeeFormEdit.jsx'
import EmployeePage from '../components/employees-page/EmployeePage.jsx'
import LoginForm from '../components/login-form/LoginForm.jsx'
import LogsPage from '../components/logs-page/LogsPage.jsx'
import RegisterForm from '../components/register-form/RegisterForm.jsx'

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/login' element={<LoginForm />} />
				<Route path='/registration' element={<RegisterForm />} />
				<Route path='/employees' element={<EmployeePage />} />
				<Route path='/employees/add' element={<EmployeeFormAdd />} />
				<Route path='/employee/edit/:id' element={<EmployeeFormEdit />} />
				<Route path='/logs' element={<LogsPage />} />
				<Route path='*' element={<Navigate replace to='/login' />} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
