import { API } from '~/shared/axios'
export const authLogin = async data => await API.post('login', { data })
export const authRegister = async data => await API.post('register', { data })
export const authLogout = async data => await API.delete('logout')
export const userProfile = async () => await API.get('users/profile')
