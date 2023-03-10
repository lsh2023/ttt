<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item,index) in items" :key="index">
				<template v-slot:body>
					<view class="house-body flex">
						<view class="house-left">
							<image class="house-img"
							:src="item.imgUrl" 
							mode="aspectFit" @error="errorImg($event,index)">
							</image>
						</view>
						<view class="house-right">
							<view class="flex">
								<text class="house-grade">{{ item.houseGrade == 2 ? 'A' : 'B' }}</text>
								<text class="clamp inline-block">{{ '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈' }}</text>
							</view>
							<text class="house-subtitle clamp block">{{ '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈' }}</text>
							<view class="house-tags">
								<view class="inline house-tag" v-for="(tag,tagIndex) in item.houseTags" :key="tagIndex">
									<uni-tag :text="'xxxx'" class="inline-block" custom-style="background-color: #55aaff; border-color: #55aaff; color: #fff;"></uni-tag>
								</view>
							</view>
							<view class="house-foot flex">
								<view class="house-price">
									<text class="price">{{1111}}</text>
									<text class="unit">万元</text>
								</view>
								<text class="unit-price">{{1111 + '元/m'}}<sup>2</sup></text>
							</view>
						</view>
						
					</view>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		name:"houselist",
		props:{
			lists: {
				type : Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				items:null,
				house_title:0,
			};
		},
		watch: {
			lists: function(val) {
				this.items = val;
			}
		},
		// onLoad() {
		// 	console.log('uni-app 组件支持的生命周期，与vue标准组件的生命周期相同。这里没有页面级的onLoad等生命周期,也就是说这个不会调用');
		// },
		created() {
			
		},
		mounted() {
			 
		},
		methods: {
			errorImg(event,index) {
				this.items[index].imgUrl = '/static/logo.png';
			},
		},
	}
</script>

<style lang="scss">
.house-body {
	width: 100%;
	.house-img {
		width: 244rpx;
		height: 188rpx;
	}
	.house-grade {
		color: white;
		background: red;
		padding: 0 9.38rpx;
		margin: 0 18.76rpx;
	}
	.house-tags,.house-subtitle,.house-foot {
		margin: 18.76rpx 0 0 18.76rpx;
	}
	.house-subtitle {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
	}
	.house-tags {
		overflow: hidden;
		height: 48rpx;
	}
	.house-tag {
		margin-right: 18.75rpx;
	}
	.price {
		color: red;
		font-weight: bold;
	}
	.unit {
		color: red;
		font-size: $uni-font-size-sm;
	}
	.unit-price {
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;
		margin: auto 0 0 auto;
	}
	 
}
</style>
