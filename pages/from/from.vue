<template>
	<view>
		<view class=""></view>
		<uni-forms :modelValue="formData"  label-position="top" ref="form" :rules="rules">
			<uni-forms-item required label="姓名" name="name">
				<uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
			</uni-forms-item>
			<uni-forms-item label="年龄" name="age">
				<input type="text" v-model="formData.age" placeholder="请输入年龄" />
			</uni-forms-item>
			<uni-forms-item required label="兴趣爱好" name="hobby">
				<uni-data-checkbox multiple v-model="formData.hobby" :localdata="hobby"/>
			</uni-forms-item>
			<uni-forms-item label="性别" required>
				<uni-data-checkbox v-model="formData.sex" :localdata="sexs" />
			</uni-forms-item>
			<uni-forms-item required label="图片" name="gridImgList">
				<view class="grid">
					<sh-grid :gridType="1" :lists="formData.gridImgList" :vstyle="vstyle" :istyle="istyle" 
					@addGridAction="addImgGridAction" 
					@deleteGridAction="deleteImgGridAction"></sh-grid> 
				</view>
			</uni-forms-item>
			<uni-forms-item required label="视频" name="gridVideoList">
				<view class="grid">
					<sh-grid :gridType="1" :lists="formData.gridVideoList" :vstyle="vstyle" :istyle="istyle" 
					@addGridAction="addVideoGridAction" 
					@deleteGridAction="deleteVideoGridAction"></sh-grid> 
				</view>
			</uni-forms-item>
			<uni-forms-item required label="文件" name="fileList">
				<sh-upload @fileList="fileListAction" :maxfile="maxFile" @preview="previewAction"></sh-upload>
			</uni-forms-item>
		</uni-forms>
		<button @click="submitForm">Submit</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{
					name:'',
					age:'',
					hobby:'',
					sex:'',
					gridImgList:[],
					gridVideoList:[],
					fileList:[],
				},
				hobby:[{'value':'0','text':'唱歌'},{'value':'1','text':'跳舞'}],
				sexs:[{'value':'0','text':'女'},{'value':'1','text':'男'}],
				rules: {
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								minLength: 3,
								maxLength: 5,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
							}
						]
					},
					hobby: {
						rules: [{
							required: true,
							errorMessage: '请选择兴趣',
						},{
							validateFunction:function(rule,value,data,callback){
								if (value.length < 2) {
									callback('请至少勾选两个兴趣爱好')
								}
								return true
							}
						}]
					},
					gridImgList: {
						rules: [{
							required: true,
							errorMessage: '请添加图片',
						},{
							validateFunction:function(rule,value,data,callback){
								if (value.length < 2) {
									callback('请上传至少2张图片')
								}
								return true
							}
						}]
					},
					gridVideoList: {
						rules: [{
							required: true,
							errorMessage: '请添加视频',
						},{
							validateFunction:function(rule,value,data,callback){
								if (value.length < 2) {
									callback('请上传至少2个视频')
								}
								return true
							}
						}]
					},
					fileList: {
						rules: [{
							required: true,
							errorMessage: '请添加文件',
						},{
							validateFunction:function(rule,value,data,callback){
								if (value.length < 2) {
									callback('请上传至少2个文件')
								}
								return true
							}
						}]
					}
				},
				vstyle: {margin:'20rpx'},
				istyle: {width:'144rpx',height:'144rpx','margin-bottom':'10rpx'},
				maxImg: 6,
				maxVideo: 6,
				maxFile: 6,
			};
		},
		methods: {
			submitForm() {
				this.$refs.form.validate().then(res=>{
					console.log('表单数据信息：', res);
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			},
			imgAction() {
				let that = this;
				let count = that.formData.gridImgList.length == 0 ? that.maxImg : that.maxImg - that.formData.gridImgList.length;
			    if (count > 0) {
					uni.chooseImage({
						count: count , //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function (res) {
							 for (var i = 0; i < res.tempFilePaths.length;i++) {
								 let file = res.tempFilePaths[i];
								 that.formData.gridImgList.push({imgUrl:file});
							 }
						}
					}); 
				}else {
					uni.showToast({
						title: '删掉一些图片再新增',
						duration: 2000,
						icon: 'none'
					});  
				}
			},
			videoAction() {
				let that = this;
				let count = that.formData.gridVideoList.length == 0 ? that.maxVideo : that.maxVideo - that.formData.gridVideoList.length;
			    if (count > 0) {
					uni.chooseVideo({
						sourceType: ['camera', 'album'],
						success: function (res) {
							that.formData.gridVideoList.push({videoUrl:res.tempFilePath,mediaType:1})
						}
					}); 
				}else {
					uni.showToast({
						title: '删掉一些视频再新增',
						duration: 2000,
						icon: 'none'
					});  
				}
			},
			fileListAction(value) {
				this.formData.fileList = value;
			},
			previewAction(item) { 
				uni.navigateTo({
					url: '/pages/preview/preview',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('previewObj', item);
					}
				});
			},
			addImgGridAction() {
				this.imgAction();
			},
			deleteImgGridAction(e) {
				let index = e.index;
				this.formData.gridImgList.splice(index,1);
			},
			addVideoGridAction() {
				this.videoAction();
			},
			deleteVideoGridAction(e) {
				let index = e.index;
				this.formData.gridVideoList.splice(index,1);
			},
		
		}
	}
</script>

<style lang="scss">

</style>
