import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../../index'
import EmployeeService from '../../services/EmployeeService.js'
import EmployeeItem from './EmployeeItem.jsx'

const EmployeePage = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const getEmployees = async () => {
		try {
			const response = await EmployeeService.fetchEmployees()
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: getEmployees,
	})

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		// mutationKey: 'employees',
		mutationFn: id => {
			EmployeeService.deleteEmployee(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['employees'] })
		},
	})

	if (!store.isAuth) navigate('/login')
	if (isLoading) return <div>Loading ...</div>
	return (
		<>
			<h1>
				Пользователь: {store.user.email} {store.user.role}
			</h1>
			<button
				onClick={() => {
					store.logout()
					navigate('/login')
				}}
			>
				Выйти
			</button>
			<div>
				<h2>Список работников</h2>
				<table className='table'>
					<thead>
						<tr>
							<th>Имя</th>
							<th>Позиция</th>
							<th>Зарплата</th>
							<th>Дата приема</th>
							<th>Фото</th>
							<th colSpan={2}>Редактирование</th>
						</tr>
					</thead>
					<tbody>
						{data.length ? (
							data.map(employee => (
								<tr key={employee.id}>
									<EmployeeItem employee={employee} mutate={mutate} />
								</tr>
							))
						) : (
							<>Нет данный о работниках</>
						)}
					</tbody>
				</table>
				{store.user.role === 'admin' && (
					<button
						onClick={() => {
							navigate('/employees/add')
						}}
					>
						Создать
					</button>
				)}
				{store.user.role === 'admin' && (
					<button
						onClick={() => {
							navigate('/logs')
						}}
					>
						Логи
					</button>
				)}
			</div>
		</>
	)
}

export default EmployeePage
