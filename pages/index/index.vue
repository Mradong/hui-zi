<template>
	<view class="home">
		<image class="home-logo" src="/static/images/home_logo.png"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	.home{
		width: 100%;
		height: 100%;
		overflow: hidden;
		&-logo{
			width: 100%;
			height: 100%;
		}
	}
</style>
