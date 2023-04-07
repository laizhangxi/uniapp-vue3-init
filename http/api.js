import request from './http.js'

// 登录
export function login(params) {
	return request({
		url: '/Login/CheckLogin',
		method: 'POST',
		params,
	})
}
