import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '../../index';
import styles from './Employees.module.css';

const EmployeeItem = ({ employee, mutate }) => {
	const { store } = useContext(Context);

	const navigate = useNavigate();

	function deleteEmployee(id) {
		mutate(employee.id);
	}

	return (
		<>
			<td>{employee.name}</td>
			<td>{employee.position}</td>
			<td>{employee.salary}</td>
			<td>{employee.hire_date.slice(0, 10)}</td>
			<td>
				<img
					src={!employee.photo_url ? '/notPhoto.png' : employee.photo_url}
					alt='User photo'
				/>
			</td>
			{store.user.role === 'user' ? (
				<td colSpan={2}>Только для администраторов</td>
			) : (
				<>
					<td className={styles.edit__buttons}>
						<button
							onClick={() => {
								navigate(`/employee/edit/${employee.id}`);
							}}
						>
							Редактировать
						</button>

						<button onClick={deleteEmployee} className={styles.button__del}>
							X
						</button>
					</td>
				</>
			)}
		</>
	);
};

export default EmployeeItem;
