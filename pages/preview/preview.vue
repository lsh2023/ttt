<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="webUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#00ff00'
					}
				},
				webUrl:'',
				prefix:'https://view.officeapps.live.com/op/view.aspx?src=',
			}
		},
		onLoad() {
			const eventChannel = this.getOpenerEventChannel();
			// 监听previewObj事件，获取上一页面通过eventChannel传送到当前页面的数据
			eventChannel.on('previewObj', function(data) {
				var obj = data;
				obj.url = 'http://sysimg.danxia.com/xm/uploads/OA/202303/07/202303071542559495972586291kfcs2590.pdf';
				if (obj.fileName.indexOf('.pdf') >= 0) {
					this.webUrl = this.prefix + obj.url;
				}else {
					this.webUrl = obj.url;
				}
				debugger
				
				
				//http://sysimg.danxia.com/xm/uploads/OA/202303/07/202303071542559495972586291kfcs2590.pdf
				//http://sysimg.danxia.com/xm/uploads/OA/202303/07/202303071554259989413393934kfcs2590.xlsx
				// http://sysimg.danxia.com/xm/uploads/OA/202303/07/202303071554263114385234922kfcs2590.docx
				//http://sysimg.danxia.com/xm/uploads/OA/202303/07/2023030715542634271266729605kfcs2590.ppt
				// http://sysimg.danxia.com/xm/uploads/OA/202303/07/20230307155425967753634515kfcs2590.txt
				
				//https://zh.usdoc.cn/view/%E4%B8%89%E5%A5%BD%E5%AD%A6%E7%94%9F%E7%94%B3%E8%AF%B7%E4%B9%A6.docx
				 // https://view.officeapps.live.com/op/view.aspx?src=
				 // http://vw.usdoc.cn/?src=
				 // http://sysimg.danxia.com/
				 //[NSString stringWithFormat:@"%@api/files/uploadmulti?empid=%@&folder=%@&city=%@",kImageHostUrl,[DXAccountModel currentAccount].empNO,@"OA",'XM'];
			})
			debugger
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
