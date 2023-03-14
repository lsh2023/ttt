<template>
	<view>
		<view v-for="(item,index) in items" :key="index" class="upload">
			<uni-row>
				<uni-col :span="2">
					<image :src="item.iconUrl" mode="aspectFit" class="upload-icon"></image>
				</uni-col>
				<uni-col :span="20">
					<text class="upload-name clamp" @click="previewAction(item,index)">{{item.fileName}}</text>
				</uni-col>
				<uni-col :span="2">
					<image src="/static/delete.png" mode="aspectFit" class="upload-delete" @click="deleteAction(item,index)"></image>
				</uni-col>
			</uni-row>
		</view>
		<lsj-upload ref="upload" width="100%" height="80rpx" 
		childId="upload-cid"
		:instantly="true"
		:debug="true" 
		:formats="formats"
		:count="maxfile"
		:option="option"
		@change="uploadChange"
		@progress="uploadProgress"
		@uploadEnd="uploadEnd"
		>
		</lsj-upload>
	</view>
</template>

<script>
import { isNullVal } from '../../common/util';
	export default {
		name:"sh-upload",
		props:{
			maxfile : { // 最大文件数
				type : Number,
				default : 9
			},
			formats : { // 支持上传的格式 空字符串表示不限制
				type : String,
				default : 'doc,docx,xls,xlsx,ppt,pptx,pdf'
			}
		},
		data() {
			return {
				items: [],
				option:{
					url:'',//上传接口地址
					name:'photos',//上传接口文件key，默认为file
					header:{},//上传接口请求头
					formData:{},//上传接口额外参数
				}
			};
		},
		mounted() {
			let loginInfo = uni.getStorageSync('loginInfo');
			let imgAuth = uni.getStorageSync('imgAuth');
			let empNo = loginInfo.empNO;
			this.$refs.upload.setData('url','https://sysimg.danxia.com/api/files/uploadmulti');
			this.$refs.upload.setData('header.Authorization',imgAuth);
			this.$refs.upload.setData('formData.empid',empNo);
			this.$refs.upload.setData('formData.folder','OA');
			this.$refs.upload.setData('formData.city','XM');
		},
		methods:{
			uploadShow() {
				let that = this;
				this.$forceUpdate();
				this.$nextTick(()=>{
					that.$refs.upload.show(); // 重新定位覆盖层控件
				});
				
			},
			uploadChange(e) {
				// let that = this;
				// this.items = [];
				// let uploadList = [...e.values()];
				// if (uploadList.length == 0) {
				// 	this.$emit('fileList',[]);
				// }else {
				// 	for (var i = 0;i < uploadList.length;i++) {
				// 		var obj = uploadList[i];
				// 		let fileName = obj.name;
				// 		let filePath = obj.path;
				// 		var iconUrl = '';
				// 		if ((fileName.indexOf('.doc') >= 0) || (fileName.indexOf('.docx') >= 0)) {
				// 			iconUrl = '/static/word.png';
				// 		}else if ((fileName.indexOf('.xls') >= 0) || (fileName.indexOf('.xlsx') >= 0)) {
				// 			iconUrl = '/static/excel.png';
				// 		}else if ((fileName.indexOf('.ppt') >= 0) || (fileName.indexOf('.pptx') >= 0)) {
				// 			iconUrl = '/static/ppt.png';
				// 		}else if (fileName.indexOf('.pdf') >= 0) {
				// 			iconUrl = '/static/pdf.png';
				// 		}else {
				// 			iconUrl = '/static/other.png';
				// 		}
				// 		 this.httpApi.upload({
				// 			 url:this.option.url,
				// 			 name:this.option.name,
				// 			 header:this.option.header,
				// 			 formData:this.option.formData,
				// 			 filePath:filePath
				// 		 }).then((res)=>{
							 
				// 		 });
				// 		// this.items.push({
				// 		// 	iconUrl:iconUrl,
				// 		// 	fileName:fileName,
				// 		// 	filePath:filePath,
				// 		// });
				// 		if (i == uploadList.length - 1) {
				// 			 this.$nextTick(()=>{
				// 				that.$emit('fileList',that.items);
				// 				that.$refs.upload.show(); // 重新定位覆盖层控件
				// 			 });
				// 		}
				// 	}
				// }
			},
			deleteAction (item,index) {
				debugger
				// this.items.splice(index,1);
				// this.$emit('fileList',this.items);
			},
			previewAction(item,index) {
				console.log('预览按钮点击了');
				this.$emit('preview',item);
			},
			uploadProgress(item) {
				debugger
				// if (item.type == 'success') {
				// 	if (!this.util.isNullVal(item.responseText)) {
				// 		let obj = JSON.parse(item.responseText);
				// 		let filePath = item.path;
				// 		let fileName = obj.Names[0];
				// 		let fileUrl = ' http://sysimg.danxia.com/xm/' + obj.FileNames[0];
				// 		console.log(fileUrl);
				// 		// http://sysimg.danxia.com/xm/uploads/OA/202303/14/202303141119239748411819133kfcs2590.ppt
				// 		var iconUrl = '';
				// 		if ((fileName.indexOf('.doc') >= 0) || (fileName.indexOf('.docx') >= 0)) {
				// 			iconUrl = '/static/word.png';
				// 		}else if ((fileName.indexOf('.xls') >= 0) || (fileName.indexOf('.xlsx') >= 0)) {
				// 			iconUrl = '/static/excel.png';
				// 		}else if ((fileName.indexOf('.ppt') >= 0) || (fileName.indexOf('.pptx') >= 0)) {
				// 			iconUrl = '/static/ppt.png';
				// 		}else if (fileName.indexOf('.pdf') >= 0) {
				// 			iconUrl = '/static/pdf.png';
				// 		}else {
				// 			iconUrl = '/static/other.png';
				// 		}
				// 		this.items.push({
				// 			iconUrl:iconUrl,
				// 			fileName:fileName,
				// 			filePath:filePath,
				// 			fileUrl:fileUrl
				// 		});
				// 	}
				// } 
			},
			uploadEnd(item) {
				debugger
				// this.$emit('fileList',this.items);
				// this.uploadShow();
			}
		}
	}
</script>

<style lang="scss">
.upload {
	margin-bottom: $uni-spacing-col-lg;
	.upload-icon {
		width: 60rpx;
		height: 60rpx;
	}
	.upload-name {
		font-size: $uni-font-size-lg;
		word-break: break-all;
		line-height: 60rpx;
		height: 60rpx;
		margin-left: $uni-spacing-row-sm;
		margin-right: $uni-spacing-row-sm;
	}
	.upload-delete {
		width: 52rpx;
		height: 52rpx;
		padding: 4rpx 0;
	}
}
</style>