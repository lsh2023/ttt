<template>
	<view>
		<lsj-upload width="100%" height="80rpx" :debug="true" :instantly="false" :formats="formats" @change="uploadChange">
		</lsj-upload>
	    <view v-for="(item,index) in items" :key="index">
	    	<image src="item.iconUrl" mode="aspectFit"></image>
			<text>{{item.fileName}}</text>
			<image src="static/delete.png" mode="aspectFit"></image>
	    </view>
	</view>
</template>

<script>
	export default {
		name:"sh-upload",
		props:{
			lists: {
				type : Array,
				default() { return [] }
			},
		},
		data() {
			return {
				items: null,
				formats:'doc,docx,xls,xlsx,ppt,pptx,pdf,txt',
			};
		},
		mounted() {
			this.items = this.lists;
		},
		methods:{
			uploadChange(e) {
				// let uploadList = [...e.values()];
				// for (var i = 0;i < uploadList.length;i++) {
				// 	var obj = uploadList[i];
				// 	let fileName = obj.name;
				// 	let filePath = obj.path;
				// 	var iconUrl = '';
				// 	if ((fileName.indexOf('.doc') >= 0) || (fileName.indexOf('.docx') >= 0)) {
				// 		iconUrl = '/static/word.png';
				// 	}else if ((fileName.indexOf('.xls') >= 0) || (fileName.indexOf('.xlsx') >= 0)) {
				// 		iconUrl = '/static/excel.png';
				// 	}else if ((fileName.indexOf('.ppt') >= 0) || (fileName.indexOf('.pptx') >= 0)) {
				// 		iconUrl = '/static/ppt.png';
				// 	}else if (fileName.indexOf('.pdf') >= 0) {
				// 		iconUrl = '/static/pdf.png';
				// 	}else {
				// 		iconUrl = '/static/other.png';
				// 	}
				// 	this.items.push({
				// 		iconUrl:iconUrl,
				// 		fileName:fileName,
				// 		filePath:filePath,
				// 	});
				// }
			}
		}
	}
</script>

<style lang="scss">

</style>