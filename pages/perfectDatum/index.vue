<template>
	<view class="per-datum dominant-hue-bg">
		<view class="per-datum-nav">
			<nav-bar
				ref="navBar"
				backState="1000"
				:home="false"
				transparentFixedFontColor="#FFF"
				type="transparentFixed"
				:title="userStatus == 3 ? '修改个人资料' : '完善个人资料'"
			>
				<!-- <view class="icon_setUp" slot="transparentFixedRight">设置</view> -->
			</nav-bar>
		</view>
		<view class="per-datum-logo">
			<view class="per-datum-logo-msg">
				<image :src="userLogo" mode=""></image>
				<text>{{ userName }}</text>
			</view>
		</view>
		<view class="clear"></view>
		<view class="per-datum-msg">
			<input type="text" v-model="username" placeholder="真实姓名" class="text-style" />
			<input type="number" v-model="phone" placeholder="手机号" class="text-style" />
			<view><move-verify @result="verifyResult" ref="verifyElement"></move-verify></view>
			<view class="verify" v-if="isVerify">
				<input type="number" v-model="verify" placeholder="验证码" class="text-style ipt-default-current" maxlength="6" />
				<button type="default" class="sms-cd-btn" id="sms-send-cd-btn" :disabled="!isSend" @click="sendVerify">
					<text v-if="isSend">{{ sendText }}</text>
					<uni-countdown
						v-if="!isSend"
						color="#989595"
						background-color="#ffe300"
						border-color="#00B26A"
						:show-day="false"
						:hour="0"
						:minute="0"
						:second="59"
						:showPer="false"
						:showColon="false"
						@timeup="isOver"
					></uni-countdown>
				</button>
			</view>
			<button type="default" class="affirm-btn dominant-hue-button-bg-yell" @tap="submit">确认</button>
		</view>

		<view class="per-datum-bg"><image src="../../static/images/perfect.jpg" mode=""></image></view>
	</view>
</template>

<script>
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import moveVerify from '@/components/helang-moveVerify/helang-moveVerify.vue';
import { getMobileVerify } from '@/api/perfectDatum.js';
import { upUserInfo } from '@/api/user.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			username: '',
			phone: '',
			verify: '',
			//验证的规则
			rules: {
				username: {
					rule: /\S/,
					msg: '姓名不能为空'
				},
				phone: {
					rule: /^1[3|4|5|6|7|8][0-9]\d{8,8}$/,
					msg: '手机号码不正确'
				},
				verify: {
					rule: /^[A-Za-z0-9]{6}$/,
					msg: '验证码不正确'
				}
			},
			resultData: {},
			isVerify: false,
			isSend: true,
			sendText: '发送验证码'
		};
	},
	computed: {
		...mapState(['userLogo', 'userName', 'userStatus'])
	},
	components: { 'move-verify': moveVerify, uniCountdown },
	methods: {
		/* 校验结果回调函数 */
		verifyResult(res) {
			if (res.flag) {
				this.isVerify = true;
			}
			this.resultData = res;
		},
		/* 校验插件重置 */
		verifyReset() {
			this.$refs.verifyElement.reset();
			/* 删除当前页面的数据 */
			this.resultData = {};
		},
		isOver() {
			this.sendText = '再次发送';
			this.isSend = true;
		},
		sendVerify() {
			getMobileVerify({ mobile: this.phone })
				.then(response => {
					if (response.data.msg == 'SUCCESS') {
						uni.showToast({ title: '发送成功,请查收', icon: 'none' });
					}
				})
				.catch(() => {
					uni.showToast({ title: '发送失败,请稍后再试', icon: 'none' });
				});
			this.isSend = false;
		},
		//
		submit() {
			if (!this.validate('username')) return;
			if (!this.validate('phone')) return;
			if (!this.validate('verify')) return;
			uni.showLoading({
				title: '提交数据中'
			});

			upUserInfo({
				name: this.username,
				mobile: this.phone,
				userCheckCode: this.verify
			})
				.then(res => {
					if (res.statusCode === 200) {
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 1000,
							success: function() {
								setTimeout(function() {
									uni.navigateTo({
										url: `/pages/home/index`
									});
								}, 2000);
							}
						});
					} else {
						uni.showToast({ title: '提交数据失败，请重试', icon: 'none' });
					}
				})
				.catch(() => {
					uni.showToast({ title: '提交数据失败，请重试', icon: 'none' });
				});
		},
		//判断验证是否符合要求
		validate(key) {
			let bool = true;
			if (!this.rules[key].rule.test(this[key])) {
				//提示信息
				uni.showToast({
					title: this.rules[key].msg,
					icon: 'none'
				});
				//取反
				bool = false;
				return false;
			}
			return bool;
		}
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
/deep/.uni-countdown__number {
	width: 100% !important;
	height: 64upx !important;
	font-size: 32upx !important;
}
.per-datum {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
	&-nav {
		height: 90upx;
	}
	&-logo {
		width: 100%;
		height: 400upx;
		&-msg {
			position: absolute;
			z-index: 99;
			top: 10%;
			left: 50%;
			transform: translate(-50%);
			image {
				border-radius: 50%;
				width: 200upx;
				height: 200upx;
			}
			text {
				display: block;
				text-align: center;
				color: #333;
			}
		}
	}
	&-msg {
		width: 80%;
		margin: 0 auto;
		position: relative;
		z-index: 99;
		.text-style {
			height: 84upx;
			padding-left: 40upx;
			padding-right: 40upx;
			color: #666666;
			font-size: 14px;
			border: 1px solid #dddddd;
			background: #f4f4f4;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			border-radius: 4px;
			-webkit-border-radius: 4px;
			-moz-border-radius: 4px;
			margin: 30upx auto;
		}
	}
	&-bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.verify {
		display: flex;
		width: 100%;
		.ipt-default-current {
			flex: 3;
		}
		.sms-cd-btn {
			flex: 2;
			height: 84upx;
			line-height: 84upx;
			padding: 0 24upx;
			margin: 30upx 10upx;

			background: #ffe300;
			border-radius: 4px;
			text-align: center;
			font-size: 14px;
		}
	}
	.affirm-btn {
		margin-top: 40upx;
	}
}
</style>
