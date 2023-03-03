<template>
	<view>
		<view v-for="(item,index) in items" :key="index" class="left center relative" :style="viewStyle" @click="gridAction(item,index)">
			<video v-if="item.mediaType == 1" :id="'sh-video-' + index" :src="item.videoUrl" :style="istyle" :controls="isPlay" :show-center-play-btn="false"></video>
			<image v-else :src="item.imgUrl" mode="aspectFit" @error="errorImg($event,index)" class="block" :style="istyle">
			<text :style="tstyle">{{item.text}}</text>
			<image v-if="gridType == 1" src="/static/delete.png" mode="aspectFit" class="delete" @click.stop="delectAction(item,index)"></image>
		</view>
		<view class="left center" :style="viewStyle" v-if="gridType == 1" @click="addAction">
			<image src="/static/add.png" mode="aspectFit" class="block" :style="istyle">
		</view>
	</view>
</template>

<script>
	export default {
		name:"sh-grid",
		props:{
			gridType: {
				type : Number,
				default : 0 // 0 默认宫格 1 新增按钮
			},
			lists: {
				type : Array,
				default() { return [] }
			},
			vstyle: {
				type : Object,
				default() { return {} }
			},
			istyle: {
				type : Object,
				default() { return {} }
			},
			tstyle: {
				type : Object,
				default() { return {} }
			},
		},
		data() {
			return {
				items: null,
				viewStyle: {},
				imgStyle: {},
				textStyle: {},
				videoContext:null,
				isPlay:false,
			};
		},
		mounted() {
			this.items = this.lists;
			this.viewStyle = this.vstyle;
			this.imgStyle = this.istyle;
			this.textStyle = this.tstyle;
		},
		methods: {
			errorImg(event,index) {
				this.items[index].imgUrl = '/static/logo.png';
			},
			gridAction(item,index) {
				if (this.gridType == 1) {
					if (item.mediaType == 1) {
						this.isPlay = !this.isPlay;
						this.videoContext = uni.createVideoContext('sh-video-' + index ,this)
						if (this.isPlay) {
							this.videoContext.play();
							this.videoContext.requestFullScreen();
						}else {
							this.videoContext.exitFullScreen();
							this.videoContext.pause();
						}
					}else {
						let imgList = this.items.map((obj)=>{
							return obj.imgUrl
						})
						uni.previewImage({
							current : index,
							urls : imgList,
						});
					}
				}
				this.$emit('gridAction',{
					detail:item,
					index:index
				});
			},
			addAction() {
				this.$emit('addGridAction');
			},
			delectAction(item,index) {
				this.$emit('deleteGridAction',{
					detail:item,
					index:index
				});
			}
		},
	}
</script>

<style lang="scss">
.delete {
	width: 48rpx;
	height: 48rpx;
	position: absolute;
	top: 0;
	right: 0;
}
</style>