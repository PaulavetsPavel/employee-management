import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import '../../assets/style/form.css';

const EmployeeForm = ({ handleSubmitFunc, dataEmployee = {} }) => {
	const { register, handleSubmit, setValue } = useForm({ mode: 'onChange' });
	const navigate = useNavigate();

	if (dataEmployee.length) {
		setValue('name', dataEmployee[0].name);
		setValue('position', dataEmployee[0].position);
		setValue('salary', dataEmployee[0].salary);
		setValue('hire_date', dataEmployee[0].hire_date);
		setValue('photo_url', dataEmployee[0].photo_url);
	}

	return (
		<>
			<form onSubmit={handleSubmit(handleSubmitFunc)}>
				<label className='label'>
					ФИО:
					<input
						className='input'
						type='text'
						{...register('name', { required: true })}
						placeholder='ФИО'
					/>
				</label>
				<label className='label'>
					Должность:
					<input
						className='input'
						type='text'
						{...register('position', { required: true })}
						placeholder='Должность'
					/>
				</label>
				<label className='label'>
					Зарплата:
					<input
						className='input'
						type='number'
						min={1000}
						{...register('salary', { required: true })}
						placeholder='Зарплата'
					/>
				</label>
				<label className='label'>
					Дата приема:
					<input
						className='input'
						type='date'
						{...register('hire_date', { required: true })}
						placeholder='Дата приема'
					/>
				</label>
				<label className='label'>
					Фото:
					<input
						className='input'
						type='text'
						{...register('photo_url')}
						placeholder='Фото'
					/>
				</label>
				<div className='buttons__block'>
					<button
						onClick={() => {
							navigate('/employees');
						}}
					>
						Назад
					</button>
					<button>Добавить</button>
				</div>
			</form>
		</>
	);
};

export default EmployeeForm;
