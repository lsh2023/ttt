<template>
	<view>
		<view class="sticky house-header">
			<uni-nav-bar left-icon="left" height="88rpx" title="预览" :fullscreen="false" @clickLeft="backAction" :border="false">
			</uni-nav-bar>
		</view>
		<web-view :src="webUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl:'',
				prefix:'https://view.officeapps.live.com/op/view.aspx?src=',
			}
		},
		onLoad() {
			var that = this;
			const eventChannel = this.getOpenerEventChannel();
			// 监听previewObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('previewObj', function(data) {
				var obj = data;
				var fileName = obj.fileName.toLowerCase();
				fileName = '好的.txt'.toLowerCase();
				obj.url = 'http://sysimg.danxia.com/xm/uploads/OA/202303/07/20230307155425967753634515kfcs2590.txt';
				if (fileName.indexOf('.doc') >= 0 || fileName.indexOf('.docx') >= 0 ||
					fileName.indexOf('.ppt') >= 0 || fileName.indexOf('.pptx') >= 0 ||
					fileName.indexOf('.xls') >= 0 || fileName.indexOf('.xlsx') >= 0 ){
					that.webUrl = that.prefix + obj.url;
				}else {
					that.webUrl = obj.url;
				}
				//http://sysimg.danxia.com/xm/uploads/OA/202303/07/202303071542559495972586291kfcs2590.pdf
				//http://sysimg.danxia.com/xm/uploads/OA/202303/07/202303071554259989413393934kfcs2590.xlsx
				// http://sysimg.danxia.com/xm/uploads/OA/202303/07/202303071554263114385234922kfcs2590.docx
				//http://sysimg.danxia.com/xm/uploads/OA/202303/07/2023030715542634271266729605kfcs2590.ppt
				// http://sysimg.danxia.com/xm/uploads/OA/202303/07/20230307155425967753634515kfcs2590.txt
				//https://zh.usdoc.cn/view/三好学生申请书.docx
				
				 // https://view.officeapps.live.com/op/view.aspx?src=
				 // http://vw.usdoc.cn/?src=
				 
				 // http://sysimg.danxia.com/
				 //[NSString stringWithFormat:@"%@api/files/uploadmulti?empid=%@&folder=%@&city=%@",kImageHostUrl,[DXAccountModel currentAccount].empNO,@"OA",'XM'];
			})
		},
		methods: {
			backAction() {
				uni.navigateBack();
			},
		}
	}
</script>

<style>
.house-header {
	top: 0;
	z-index: 10000;
	background-color: $uni-bg-color;
}
.uni-webview--fullscreen {
	top: 88rpx;
}
</style>
