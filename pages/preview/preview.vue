<template>
	<view>
		<web-view :webview-styles="webviewStyles" src="https://uniapp.dcloud.io/static/1.doc"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel();
			// 监听previewObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('previewObj', function(data) {
				 
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
