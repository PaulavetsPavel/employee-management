import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './EmployeeForm.module.css'

const EmployeeForm = ({ handleSubmitFunc, dataEmployee = {} }) => {
	const { register, handleSubmit, setValue } = useForm({ mode: 'onChange' })

	if (dataEmployee.length) {
		setValue('name', dataEmployee[0].name)
		setValue('position', dataEmployee[0].position)
		setValue('salary', dataEmployee[0].salary)
		setValue('hire_date', dataEmployee[0].hire_date)
		setValue('photo_url', dataEmployee[0].photo_url)
	}

	return (
		<>
			<form onSubmit={handleSubmit(handleSubmitFunc)} className={styles.form}>
				<label>
					ФИО
					<input
						type='text'
						{...register('name', { required: true })}
						placeholder='ФИО'
					/>
				</label>
				<label>
					Должность
					<input
						type='text'
						{...register('position', { required: true })}
						placeholder='Должность'
					/>
				</label>
				<label>
					Зарплата
					<input
						type='text'
						{...register('salary', { required: true })}
						placeholder='Зарплата'
					/>
				</label>
				<label>
					Дата приема
					<input
						type='date'
						{...register('hire_date', { required: true })}
						placeholder='Дата приема'
					/>
				</label>
				<label>
					Фото
					<input type='text' {...register('photo_url')} placeholder='Фото' />
				</label>
				<button>Добавить</button>
			</form>
		</>
	)
}

export default EmployeeForm
