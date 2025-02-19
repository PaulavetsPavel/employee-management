import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../../index'
import LogService from '../../services/LogService.js'
import LogItem from './LogItem.jsx'
const LogsPage = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const getEmployees = async () => {
		try {
			const response = await LogService.fetchLogs()
			return response.data
		} catch (err) {
			console.log(err)
		}
	}

	const { data, isLoading } = useQuery({
		queryKey: ['employees'],
		queryFn: getEmployees,
	})

	if (!store.user.role === 'admin') navigate('/login')

	return (
		<>
			<h2>Логи</h2>

			<table className='table'>
				<thead>
					<tr>
						<th>Id пользователя</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.length ? (
						data.map(log => (
							<tr key={log.id}>
								<LogItem log={log} />
							</tr>
						))
					) : (
						<>Нет данный о работниках</>
					)}
				</tbody>
			</table>

			<button
				onClick={() => {
					navigate('/employees')
				}}
			>
				Назад
			</button>
		</>
	)
}

export default LogsPage
