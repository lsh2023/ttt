<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.flex {display: flex;}
	.block {display: block;}
	.inline-block {display: inline-block;}
	.inline {display: inline;}
	.fixed {position: fixed;}
	.relative {position: relative;}
	.left {float: left;}
	.right {float: right;}
	.center {text-align: center;}
	.sticky { // 沾性定位,需要配合top/bottom/left/right使用
		position: sticky;
		position: -webkit-sticky;
	}
	.ellipsis { // 文字超出省略,需要配合width使用
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.clamp { // 文字超出省略
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 1;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
</style>
