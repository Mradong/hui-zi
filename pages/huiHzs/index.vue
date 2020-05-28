<template>
	<view class="">
		<nav-bar ref="navBar" transparentFixedFontColor="#FFF" type="transparentFixed" title="我的简历">
		</nav-bar>
		<image src="../../static/images/fense_bg_02.png" mode=""></image>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
			onPreview(){
				this.$refs.navBar.show();
			}
		}
	}
</script>

<style>
</style>
