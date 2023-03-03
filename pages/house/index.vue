<template>
	<view>
		<view class="sticky house-header">
			<uni-nav-bar left-icon="left" height="88rpx" @clickLeft="backAction" @clickRight="mapAction" :border="false">
				<view class="input-view" slot="default">
					<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词"
						@confirm="searchConfirm" />
				</view>
				<view class="map-view flex" slot="right">
					<uni-icons type="location" size="22" class="map-img"></uni-icons>
					<text class="map-text">地图</text>
				</view> 
			</uni-nav-bar>
			<view class="house-seg">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
				activeColor="#ff0000">
				</uni-segmented-control>
			</view>
		</view>
		 <view class="house-content">
			 <view v-show="current === 0">
				<houselist :lists="lists"></houselist>
			 </view>
			 <view v-show="current === 1">
				<houselist :lists="lists2"></houselist>
			 </view>
		 </view>
		 
		<uni-fab
			:pattern="pattern"
			:content="content"
			:horizontal="horizontal"
			:vertical="vertical"
			:direction="direction"
			@trigger="trigger"
		></uni-fab>
		 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 选项卡
				items: ['选项1', '选项2'],
				current: 0,
				// 列表 1
				pageIndex: 1,
				pageSize: 20,
				lists: [],
				// 列表 2
				pageIndex2: 1,
				pageSize2: 20,
				lists2: [],
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#fff',
					iconColor: '#7A7E83'
				},
				content: [{
					iconPath: '/static/logo.png',
					selectedIconPath: '/static/logo.png',
					text: '按钮1',
				},{
					iconPath: '/static/logo.png',
					selectedIconPath: '/static/logo.png',
					text: '按钮2',
				}],
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			if (this.current == 0) {
				this.pageIndex = 1;
				this.saleListReq();
			}else {
				this.pageIndex2 = 1;
				this.rentListReq();
			}
		},
		// 上拉加载
		onReachBottom() {
			if (this.current == 0) {
				this.pageIndex++ ;
				this.saleListReq();
			}else {
				this.pageIndex2++ ;
				this.rentListReq();
			}
		},
		onLoad() {
			this.saleListReq();
			this.rentListReq();
		},
		methods: {
			trigger(e) {
			    let index = e.index + 1;
				uni.showToast({
					title: '点击了第' + index + '个按钮',
					duration: 2000,
					icon: 'none'
				});  
			},
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			backAction() {
				uni.navigateBack();
			},
			mapAction() {
				uni.showToast({
					title: '还没写，别急！',
					duration: 2000,
					icon: 'none'
				});
			},
			searchConfirm() {
				uni.showToast({
					title: '还没写，别急！',
					duration: 2000,
					icon: 'none'
				});
			},
			saleListReq() {
				var that = this;
				let authorization = uni.getStorageSync('authorization');
				var loginInfo = uni.getStorageSync('loginInfo');
				let accessToken = loginInfo.accessToken;
				let empNo = loginInfo.empNO;
				this.httpApi.post({
					url: '/apixm/saleHouse/getSaleHouseList',
					header: {
						accessToken: accessToken,
						Authorization: authorization,
					},
					data: {
						houseType : '1',
						pageNum : that.pageIndex,
						pageSize : that.pageSize,
						empID : empNo,
						deptNo : '',
					}
				}).then((res) => {
					var list = res.data.data || [];
					for (var i = 0;i<list.length;i++) {
						var obj = list[i];
						obj.imgUrl = loginInfo.serviceImgURL + '/' + obj.defaultPath + '/204_153/' + '/' + obj.defaultPic;
						if (!that.util.isNullVal(obj.houseFeature)) {
							obj.houseTags = obj.houseFeature.split(',');
						}
					}
					if (that.pageIndex == 1) {
						that.lists = list;
						uni.stopPullDownRefresh();
					}else {
						that.lists = that.lists.concat(list);
					}
				})
			},
			rentListReq() {
				var that = this;
				let authorization = uni.getStorageSync('authorization');
				var loginInfo = uni.getStorageSync('loginInfo');
				let accessToken = loginInfo.accessToken;
				let empNo = loginInfo.empNO;
				this.httpApi.post({
					url: '/apixm/rentHouse/getRentHouseList',
					header: {
						accessToken: accessToken,
						Authorization: authorization,
					},
					data: {
						houseType : '1',
						pageNum : that.pageIndex2,
						pageSize : that.pageSize2,
						empID : empNo,
						deptNo : '',
					}
				}).then((res) => {
					var list = res.data.data || [];
					for (var i = 0;i<list.length;i++) {
						var obj = list[i];
						obj.imgUrl = loginInfo.serviceImgURL + '/' + obj.defaultPath + '/204_153/' + '/' + obj.defaultPic;
						if (!that.util.isNullVal(obj.houseFeature)) {
							obj.houseTags = obj.houseFeature.split(',');
						}
					}
					if (that.pageIndex2 == 1) {
						that.lists2 = list;
						uni.stopPullDownRefresh();
					}else {
						that.lists2 = that.lists2.concat(list);
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
$nav-height: 60rpx;
.house-header {
	top: 0;
	z-index: 10000;
	background-color: $uni-bg-color;
}
.input-view {
	height: $nav-height;
	line-height: $nav-height;
	background-color: $uni-bg-color-grey;
	margin: 14rpx 0;
	width: 100%;
}
.nav-bar-input {
	height: $nav-height;
	line-height: $nav-height;
	width: 100%;
}
.map-view {
	.map-img {
		margin: auto 0;
	}
	.map-text {
		margin: auto 0;
	}
}
</style>
