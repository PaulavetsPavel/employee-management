import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { Context } from '../../index'
import EmployeeService from '../../services/EmployeeService.js'
import EmployeeForm from './EmployeeForm.jsx'

const EmployeeFormEdit = () => {
	const { register, reset, handleSubmit, setValue } = useForm({
		mode: 'onChange',
	})
	const { store } = useContext(Context)
	const navigate = useNavigate()
	const id = useParams().id

	const getEmployee = async () => {
		try {
			const response = await EmployeeService.fetchEmployee(id)
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	const { data, isLoading } = useQuery({
		queryKey: ['employee'],
		queryFn: getEmployee,
	})

	const editEmployee = async newData => {
		newData = { id: id, ...newData }

		await EmployeeService.updateEmployee(newData)
		navigate('/employees')
		reset()
	}

	if (!store.user.role === 'admin') navigate('/login')
	if (isLoading) return <div>Loading ...</div>

	return (
		<>
			<h2> Редактирование работника</h2>
			<EmployeeForm handleSubmitFunc={editEmployee} dataEmployee={data} />
		</>
	)
}

export default EmployeeFormEdit
