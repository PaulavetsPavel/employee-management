import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Context } from '../../index'

const RegisterForm = () => {
	const { register, reset, handleSubmit } = useForm({ mode: 'onChange' })
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const handleFormSubmit = async data => {
		const response = await store.registration({ data })

		reset()
		if (response.status === 200) alert('Регистрация прошла успешно')

		navigate('/login')
	}

	return (
		<>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<input
					type='text'
					{...register('email', { required: true })}
					placeholder='Email'
				/>
				<input
					type='password'
					{...register('password', { required: true })}
					placeholder='Пароль'
				/>
				<button>Зарегистрироваться</button>
			</form>
		</>
	)
}

export default RegisterForm
