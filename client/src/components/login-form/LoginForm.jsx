import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Context } from '../../index'

const LoginForm = () => {
	const { register, reset, handleSubmit } = useForm({ mode: 'onChange' })
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const handleFormSubmit = async data => {
		const response = await store.login({ data })

		navigate('/employees')
		reset()
	}

	return (
		<>
			<h2> Авторизация</h2>
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
				<button>Войти</button>
			</form>
			<button
				onClick={() => {
					navigate('/registration')
				}}
			>
				Регистрация
			</button>
		</>
	)
}

export default observer(LoginForm)
