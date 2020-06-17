<template>
	<view class="login">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="登录"></nav-bar>
		<view class="login-bg"><!-- <image src="../../static/images/login.jpg" mode=""></image> --></view>
		<view class="login-txt">授权登录使用王二狗</view>
		<view class="login-but"><button class="wx_login dominant-hue-button-bg-yell" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">微信一键登录</button></view>
	</view>
</template>

<script>
import { getToken } from '@/utils/auth';
import { upUserInfo } from '@/api/user.js';
export default {
	data() {
		return {
			from: ''
		};
	},
	methods: {
		appLoginWx() {
			let _that = this;
			uni.getProvider({
				service: 'oauth',
				success: function(res) {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: res => {
								uni.getUserInfo({
									provider: 'weixin',
									success: info => {
										//这里请求接口
										console.log( info )
										let code = res.code;
										_that.$store
											.dispatch('codeToToken', {
												url: '/app/login',
												code: code
											})
											.then(() => {
												upUserInfo( info.userInfo )
													.then(() => {
														uni.showToast({
															title: '登录成功，返回中...',
															icon: 'none',
															duration: 1000,
															success: function() {
																setTimeout(function() {
																	uni.navigateTo({
																		url: `/pages/${_that.from}/index`
																	});
																}, 1000);
															}
														});
													})
													.catch(() => {
														uni.showToast({ title: '获取数据失败，请稍后再试', icon: 'none' });
													});
											});
									},
									fail: () => {
										uni.showToast({ title: '微信登录授权失败', icon: 'none' });
									}
								});
							},
							fail: () => {
								uni.showToast({ title: '微信登录授权失败', icon: 'none' });
							}
						});
					} else {
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon: 'none'
						});
					}
				}
			});
		}
	},
	onLoad: function(option) {
		this.from = option.from;
	}
};
</script>

<style lang="less">
html,
body,
uni-page-body {
	width: 100%;
	height: 100%;
}
.login {
	width: 100%;
	height: 100%;
	overflow: hidden;
	.login-bg {
		width: 250upx;
		height:250upx;
		overflow: hidden;
		position: absolute;
		top: 30%;
		left: 50%;
		z-index: 99;
		transform: translate(-50%, -50%);
		border-radius: 20upx;
		background-color: #FEDD12;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.login-txt {
		width: 100%;
		height: 80upx;
		position: absolute;
		top: 50%;
		left: 50%;
		color: #3e3938b3;
		text-align: center;
		z-index: 99;
		transform: translate(-50%, -50%);
	}
	.login-but {
		position: absolute;
		width: 80%;
		top:60%;
		left: 50%;
		transform: translate(-50%);
		.wx_login {
			background-color: #FFF;
			color: #333;
		}
		.button-hover {
			color: #000 !important;
		}
	}
}
</style>
