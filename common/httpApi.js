import { isNullVal } from './util.js'

var request = function(obj) {
	if (process.env.NODE_ENV === 'development') {
		// #ifndef H5
			var url = obj.url;
			if (url.indexOf('/api/') >= 0) {
				obj.url = url.replace('/api/','https://dingdang.danxia.com/');
			}else if (url.indexOf('/apixm/') >=0) {
				obj.url = url.replace('/apixm/','https://dingdang.danxia.com/xm/')
			}else if (url.indexOf('/simg/') >= 0) {
				obj.url = url.replace('/simg/','https://sysimg.danxia.com/');
			}
		// #endif
	}
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '加载中...',
			mask: true
		});
		var requestTask = uni.request({
			url: obj.url,
			data: obj.data,
			header: obj.header,
			method:	obj.method,
			success: (res) => {
				uni.hideLoading();
				let code = res.data.code;
				if (code != 0) {
					if (code == 40000 || code == 40001 || code == 5) { // token 无效过期
						uni.setStorageSync('tokenInvalid',true);
						uni.navigateBack({ // 返回首页
							delta:999,
						})
					} 
					uni.showToast({
						title: res.data.msg,
						duration: 2000,
						icon: 'none'
					});
				}
				resolve(res);
			},
			fail: (err) => {
				uni.hideLoading();
				reject(err);
			}
		});
	})
}

var upload = function(obj) {
	console.log(obj);
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '上传中...',
			mask: true
		});
		uni.uploadFile({
			url: obj.url,
			filePath: obj.filePath,
			name: obj.name,
			formData:obj.formData,
			header:obj.header,
			files:obj.files,
			success: (res) => {
				console.log(res);
				uni.hideLoading();
				resolve(res);
			},
			fail: (err) => {
				console.log(err);
				uni.hideLoading();
				reject(err);
			}
		});
	})
	
}

var post = function(obj) {
	obj.method = 'POST';
	if (isNullVal(obj.header)) {
		obj.header = {};
	}
	var contentType = obj.header['content-type'];
	if (isNullVal(contentType)) {
		obj.header['content-type'] = 'application/json';
	}
    return this.tokenRequest(obj);
}

var formPost = function(obj) {
	if (isNullVal(obj.header)) {
		obj.header = {};
	}
	obj.header['content-type'] = 'application/x-www-form-urlencoded';
	return this.post(obj);
}

var get = function(obj) {
	obj.method = "GET";
	if (isNullVal(obj.header)) {
		obj.header = {};
	}
	var contentType = obj.header['content-type'];
	if (isNullVal(contentType)) {
		obj.header['content-type'] = 'application/json;charset=UTF-8';
	}
    return this.tokenRequest(obj);
}

var tokenRequest = function(obj) {
	let auth = uni.getStorageSync('auth');
	let loginInfo = uni.getStorageSync('loginInfo');
	if (!isNullVal(auth)) {
		obj.header['Authorization'] = auth;
	}
	if (!isNullVal(loginInfo)) {
		var accessToken = loginInfo.accessToken;
		if (!isNullVal(accessToken)) {
			obj.header['accessToken'] = accessToken;
		}
	}
	return this.request(obj);
}

var imgTokenReq = function() {
	let that = this;
	return new Promise((resolve, reject) => {
		that.request({
			url: '/simg/token',
			header: {
				Authorization: 'Basic ZGluZ2RhbmdzeXNpbWcuZGFueGlhLmNvbTpCNzYyNjEwRjQ0RUQ0QUE3OEY3QUUxM0M1NzI1NEI1Rg==',
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {
				grant_type:'client_credentials'
			},
			method:'POST',
		}).then((res) => {
			 let data = res.data;
			 if (!isNullVal(data.access_token)) {
			 	uni.setStorageSync('imgAuth','Bearer ' + data.access_token);
			 	resolve(res);
			 }else {
			 	resolve(res);
			 }
		}).catch((err) => {
			reject(err);
		});
	})
}

var tokenReq = function() {
	let that = this;
	return new Promise((resolve, reject) => {
		that.request({
			url: '/api/oauth/token?grant_type=client_credentials',
			header: {
				Authorization: 'Basic ZGluZ2RhbmcuZGFuZ3hpYS5jb206MDhmZDNiNzE5MzFjNDk3NWE4NGY4ZTQ5ODQ2NmVjMjE=',
				scope: 'all',
			},
			method:'POST',
		}).then((res) => {
			let data = res.data;
			if (!isNullVal(data.access_token)) {
				uni.setStorageSync('auth','Bearer ' + data.access_token);
				resolve(res);
			}else {
				resolve(res);
			}
		}).catch((err) => {
			reject(err);
		});
	})
}

var loginReq =  function() {
	let that = this;
	return new Promise((resolve, reject) => {
		that.request({
			url: '/api/uc/user/login',
			data: {
				"brandModels": "iPhone12,3",
				"deviceIds": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
				"deviceVendor": "iOS",
				"imei": "AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA",
				"latitude": "24.400000",
				"loginId": "kfcs2590",
				"longitude": "118.100000",
				"operator": "中国移动",
				"passWord": "1234",
				"systemType": "2"
			},
			method:'POST',
		}).then((res) => {
			let data = res.data.data;
			uni.setStorageSync('loginInfo',data);
			uni.setStorageSync('tokenInvalid',false);
			resolve(res);
		}).catch((err) => {
			reject(err);
		});
	})
}

module.exports = {
	request,
	tokenRequest,
	get,
	post,
	formPost,
	tokenReq,
	loginReq,
	upload,
	imgTokenReq
}