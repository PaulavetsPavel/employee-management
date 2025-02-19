import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Context } from '../../index'
import EmployeeService from '../../services/EmployeeService.js'
import EmployeeForm from './EmployeeForm.jsx'

const EmployeeFormAdd = () => {
	const { register, reset, handleSubmit } = useForm({ mode: 'onChange' })
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const createNewEmployee = async data => {
		const response = await EmployeeService.createEmployee(data)

		navigate('/employees')
		reset()
	}
	if (!store.user.role === 'admin') navigate('/login')
	return (
		<>
			<h2> Новый работник</h2>
			<EmployeeForm handleSubmitFunc={createNewEmployee} />
		</>
	)
}

export default EmployeeFormAdd
