import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Context } from '../../index';
import LogService from '../../services/LogService.js';
import LogItem from './LogItem.jsx';
import '../../assets/style/table.css';
import '../../assets/style/global.css';

const LogsPage = () => {
	const { store } = useContext(Context);
	const navigate = useNavigate();

	const getLogs = async () => {
		try {
			const response = await LogService.fetchLogs();
			return response.data;
		} catch (err) {
			console.log(err);
		}
	};

	const { data, isLoading } = useQuery({
		queryKey: ['logs'],
		queryFn: getLogs,
	});

	if (!store.user.role === 'admin') navigate('/login');
	if (isLoading) return <div>Loading ...</div>;
	return (
		<div className='container'>
			<h2 className='table__title'>Логи</h2>

			<table className='table'>
				<thead>
					<tr>
						<th>ID пользователя</th>
						<th>Action</th>
						<th>Time</th>
					</tr>
				</thead>
				<tbody>
					{data.length ? (
						data.map((log) => (
							<tr key={log.id}>
								<LogItem log={log} />
							</tr>
						))
					) : (
						<>Нет данный о логах</>
					)}
				</tbody>
			</table>

			<div className='main__buttons'>
				<button
					onClick={() => {
						navigate('/employees');
					}}
				>
					Назад
				</button>
			</div>
		</div>
	);
};

export default LogsPage;
