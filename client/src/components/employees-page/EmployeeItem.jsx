import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../../index'

const EmployeeItem = ({ employee, mutate }) => {
	const { store } = useContext(Context)

	const navigate = useNavigate()

	function deleteEmployee(id) {
		mutate(employee.id)
	}

	return (
		<>
			<td>{employee.name}</td>
			<td>{employee.position}</td>
			<td>{employee.salary}</td>
			<td>{employee.hire_date}</td>
			<td>
				<img
					src={!employee.photo_url ? '/notPhoto.png' : employee.photo_url}
					alt=''
				/>
			</td>
			{store.user.role === 'user' ? (
				<td colSpan={2}>Только для администраторов</td>
			) : (
				<>
					<td>
						<button
							onClick={() => {
								navigate(`/employee/edit/${employee.id}`)
							}}
						>
							Редактировать
						</button>
					</td>
					<td>
						<button onClick={deleteEmployee}>Удалить</button>
					</td>
				</>
			)}
		</>
	)
}

export default EmployeeItem
