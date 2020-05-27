<template>
	<view class="home">
		<image class="home-logo" src="/static/images/home_logo.png"></image>
		<view class="home-button">
			<button @click="goHome()">创建梦想</button>
		</view>
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
			goHome(){
				uni.navigateTo({
					url: '/pages/home/index'
				});
			},
		}
	}
</script>

<style lang="less">
	.home{
		width: 750upx;
		height: 1334upx;
		overflow: hidden;
		position: relative;
		&-logo{
			position: absolute;
			width: 100%;
			height: 100%;
		}
		&-button{
			position: absolute;
			bottom: 40upx;
			left: 50%;
			transform: translate(-50%);
			width: 700upx;
			border-radius: 20px;
			overflow: hidden;
			button{
				color: #FFFCFD;
				background: linear-gradient(to top right, #FF6896, #FF5053);
			}
		}
	}
</style>
