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
		<lsj-upload ref="lsj-upload" width="100%" height="80rpx" 
		:debug="true" 
		:instantly="false" 
		:formats="formats"
		:count="maxfile"
		@change="uploadChange">
		</lsj-upload>
	</view>
</template>

<script>
	export default {
		name:"sh-upload",
		props:{
			maxfile : { // 最大文件数
				type : Number,
				default : 9
			},
			formats : { // 支持上传的格式 空字符串表示不限制
				type : String,
				default : 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt'
			}
		},
		data() {
			return {
				items: null,
			};
		},
		mounted() {
			// https://ext.dcloud.net.cn/plugin?id=5459
		},
		methods:{
			uploadChange(e) {
				this.items = [];
				let uploadList = [...e.values()];
				if (uploadList.length == 0) {
					this.$emit('fileList',[]);
				}else {
					for (var i = 0;i < uploadList.length;i++) {
						var obj = uploadList[i];
						let fileName = obj.name;
						let filePath = obj.path;
						var iconUrl = '';
						if ((fileName.indexOf('.doc') >= 0) || (fileName.indexOf('.docx') >= 0)) {
							iconUrl = '/static/word.png';
						}else if ((fileName.indexOf('.xls') >= 0) || (fileName.indexOf('.xlsx') >= 0)) {
							iconUrl = '/static/excel.png';
						}else if ((fileName.indexOf('.ppt') >= 0) || (fileName.indexOf('.pptx') >= 0)) {
							iconUrl = '/static/ppt.png';
						}else if (fileName.indexOf('.pdf') >= 0) {
							iconUrl = '/static/pdf.png';
						}else {
							iconUrl = '/static/other.png';
						}
						this.items.push({
							iconUrl:iconUrl,
							fileName:fileName,
							filePath:filePath,
						});
						if (i == uploadList.length - 1) {
							this.$emit('fileList',this.items);
						}
					}
				}
			},
			deleteAction (item,index) {
				this.$refs['lsj-upload'].clear(item.fileName);
			},
			previewAction(item,index) {
				this.$emit('preview',item);
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