let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
	baseUrl = 'api'
}
if (process.env.NODE_ENV === 'production') {
	baseUrl = 'online'
}

// 获取请求头
function getHeaders() {
	let header = {
		"token": uni.getStorageSync('finance_token'),
		// "Content-Type": "application/json", //根据自己的数据类型
		"Content-Type": "application/x-www-form-urlencoded",
		"X-Requested-With": "XMLHttpRequest"
	}
	return header
}

let request = function(data) {
	data.method = data.method.toUpperCase()
	if (!['GET', 'POST'].includes(data.method)) {
		uni.showToast({
			title: `暂不支持的请求方式: ${data.method}`,
			icon: 'none'
		});
		return
	}
	return new Promise((resolve, reject) => {
		if(data.loading) {
			uni.showLoading({
				title: '加载中...'
			});
		}
	
		uni.request({
			url: baseUrl + data.url,
			method: data.method,
			data: data.params,
			// dataType: data.dataType || 'json',
			header: getHeaders(),
		}).then(res => {
			uni.hideLoading();
			console.log(res, 'res=======')
			if (res.statusCode === 200) {
			// 	if (res[1].data.code === 200) {
			// 		if (res[1].data.info !== '响应成功') {
			// 			uni.showToast({
			// 				title: res[1].data.info || '操作成功',
			// 				icon: 'none'
			// 			});
			// 		}
			// 		resolve(res[1].data)
			// 	} else {
			// 		uni.showToast({
			// 			title: res[1].data.info || '未知错误',
			// 			icon: 'none'
			// 		});
			// 		// 需要跳转到登录页的状态码
			// 		if (res[1].data.code === 410) {
			// 			uni.navigateTo({
			// 				url: '../Login/index'
			// 			});
			// 		}
			// 	}
			} else {
				reject(res)
			}
		}).catch(
			(response) => {
				reject(response)
			}
		)
	})
}

export default request;
