import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'

import { API_URL } from '../http'

export default class Store {
	user = {}
	isAuth = false
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	setAuth(bool) {
		this.isAuth = bool
	}

	setUser(user) {
		this.user = user
	}

	setLoading(bool) {
		this.isLoading = bool
	}
	getUser() {
		return this.user
	}

	async login({ data }) {
		try {
			const response = await AuthService.login(data)
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
			return response
		} catch (e) {
			console.log(e.response?.data?.message)
		}
	}

	async registration({ data }) {
		try {
			const response = await AuthService.registration(data)
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)

			return response
		} catch (e) {
			console.log(e.response?.data?.message)
		}
	}

	async logout() {
		try {
			await AuthService.logout()
			localStorage.removeItem('token')
			this.setAuth(false)
			this.setUser({})
		} catch (e) {
			console.log(e.response?.data?.message)
		}
	}

	async checkAuth() {
		this.setLoading(true)
		try {
			const response = await axios.get(`${API_URL}/refresh`, {
				withCredentials: true,
			})
			console.log(response)
			localStorage.setItem('token', response.data.accessToken)
			this.setAuth(true)
			this.setUser(response.data.user)
		} catch (e) {
			console.log(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}
}
