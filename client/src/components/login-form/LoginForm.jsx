import { observer } from 'mobx-react-lite';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Context } from '../../index';
import styles from './Form.module.css';

const LoginForm = () => {
	const { register, reset, handleSubmit } = useForm({ mode: 'onChange' });
	const { store } = useContext(Context);
	const navigate = useNavigate();
	const [errMessage, setErrMessage] = useState('');

	const handleFormSubmit = async (data) => {
		const response = await store.login({ data });
		if (response.status === 400) {
			if (response.data.includes('password')) {
				setErrMessage('Неверный пароль');
			}
			if (response.data.includes('email')) {
				setErrMessage(
					'Пользователь с таким Email на найден пожалуйста зарегистрируйтесь.'
				);
			}
		}

		if (response.status === 200) {
			navigate('/employees');
			reset();
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.form__header}> Авторизация</h2>
			<div className={styles.error}>{errMessage}</div>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<label className={styles.label}>
					Email:
					<input
						className={styles.input}
						type='email'
						{...register('email', { required: true })}
						placeholder='Email'
					/>
				</label>
				<label className={styles.label}>
					Пароль:
					<input
						className={styles.input}
						type='password'
						maxLength={32}
						minLength={4}
						{...register('password', { required: true })}
						placeholder='Пароль'
					/>
					<p className={styles.notification}>
						(пароль должен содержать от 4 до 32 знаков)
					</p>
				</label>
				<div className={styles.buttons__block}>
					<button
						onClick={() => {
							navigate('/registration');
						}}
					>
						Регистрация
					</button>
					<button>Вход</button>
				</div>
			</form>
		</div>
	);
};

export default observer(LoginForm);
