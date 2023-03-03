<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view class="grid">
			<sh-grid :lists="gridList" :vstyle="vstyle" :istyle="istyle" :tstyle="tstyle" @gridAction="gridAction"></sh-grid> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				vstyle: {margin:'20rpx'},
				istyle: {width:'144rpx',height:'144rpx','margin-bottom':'10rpx'},
				tstyle: {color:'#ff0000'},
				gridList:[{
					imgUrl:'/static/house.png',
					text:'房源',
				},{
					imgUrl:'/static/logo.png',
					text:'表单',
				},{
					imgUrl:'/static/logo.png',
					text:'表单',
				},{
					imgUrl:'/static/logo.png',
					text:'表单',
				},{
					imgUrl:'/static/logo.png',
					text:'表单',
				},{
					imgUrl:'/static/logo.png',
					text:'表单',
				},{
					imgUrl:'/static/logo.png',
					text:'表单',
				},{
					imgUrl:'/static/logo.png',
					text:'表单',
				}],
			}
		},
		onLoad() {
			this.tokenLogin();
		},
		onShow() {
			let tokenInvalid = uni.getStorageSync('tokenInvalid');
			if (!this.util.isNullVal(tokenInvalid) && tokenInvalid) {
				uni.removeStorageSync('authorization');
				uni.removeStorageSync('loginInfo');
				uni.removeStorageSync('empInfo');
				this.tokenLogin();
			}
		},
		methods: {
			gridAction(e) {
				let index = e.index; 
				switch (index){
					case 0:
						this.houseNav();
						break;
					case 1:
						this.fromNav();
						break;
					default:
						uni.showToast({
							title: '还没写，别急！',
							duration: 2000,
							icon: 'none'
						});
						break;
				}
			},
			houseNav() {
				uni.navigateTo({
					url: '/pages/house/index'
				});
			},
			fromNav() {
				uni.navigateTo({
					url: '/pages/from/from'
				});
			},
			empInfoReq() {
				let that = this;
				let loginInfo = uni.getStorageSync('loginInfo');
				let empNo = loginInfo.empNO;
				this.httpApi.get({
					url: '/apixm/employee/getEmployeeInfo',
					data: {
						empNO:empNo
					}
				}).then((res) => {
					var data = res.data.data;
					uni.setStorageSync('empInfo',data);
					// that.houseNav();
				})
			},
			tokenLogin() {
				let that = this;
				let empInfo = uni.getStorageSync('empInfo');
				if (this.util.isNullVal(empInfo)) {
					this.httpApi.tokenReq().then(()=>{
						that.httpApi.loginReq().then(()=>{
							that.empInfoReq();
						});
					});
				}else {
					// this.houseNav();
				}
			}
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.text-area {
		display: flex;
		justify-content: center;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
