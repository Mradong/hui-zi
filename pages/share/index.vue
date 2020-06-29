<template>
	<view class="share dominant-hue-bg">
		<image class="fx_bg" src="../../static/images/fx_bg.jpg" mode=""></image>
		<view class="share-nav">
			<nav-bar ref="navBar" backState="2000" :home="false" transparentFixedFontColor="#FFF" type="transparentFixed" title="分享">
				<!-- <view class="icon_setUp" slot="transparentFixedRight">设置</view> -->
			</nav-bar>
		</view>
		<view class="clear"></view>
		<view class="share-box">
			<view class="share-box-top">
				<view class="share-box-top-cat">
					<image src="../../static/images/share_cat.svg" mode=""></image>
				</view>
				<view class="share-box-top-text">
					您的好朋友，<text style="color: #DD524D;">{{inviteName}} </text> 邀请您加入~
				</view>
			</view>
			<view class="share-box-detail">
				<view class="share-box-detail-card">
					<view class="">
						<text class="name">项目名称:</text>
						<text>{{ projectData.name }}</text>
					</view>
					<view class="">
						<text class="name">总期数:</text>
						<text>{{ projectData.totalNum }}</text>
					</view>
					<view class="">
						<text class="name">固定金额(元):</text>
						<text>{{ projectData.returnValue }}</text>
					</view>
					<view class="">
						<text class="name">预计开始时间:</text>
						<text>{{ projectData.startTime | formatDate }}</text>
					</view>
					<button type="default" class="share-button " v-if="showStatus === 0 || showStatus === 3" @click="join">我要加入</button>
					<button type="default" class="share-button " @click="toLogin" v-if="showStatus === 4">去登录</button>
					<button type="warn" class="share-button dominant-hue-button-bg-red" open-type="share">分享给好友</button>
				</view>
			</view>

			<uni-popup ref="popup" type="dialog">
				<uni-popup-dialog type="warn" title="未登录" content="小主,是否前往登录~" :duration="2000" :before-close="true" @close="close"
				 @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	import {
		getToken
	} from '@/utils/auth';
	import {
		mapState
	} from 'vuex';
	import {
		getUserInfo
	} from '@/api/huizis.js';
	import {
		getJoinStatus,
		getProjectDetail,
		joinProject
	} from '@/api/share.js';

	export default {
		data() {
			return {
				showStatus: 0,
				projectData: {},
				inviteName: "陈一发儿",
				projectId: 0,
				cid: 0,
				myName: "陈一发儿",
				mycid: 0,
			};
		},
		onLoad(options) {
			/* 初始化页面数据 */
			console.log(options)
			this.inviteName = options.inviteName;
			this.projectId = options.projectId;
			this.cid = options.cid;
			getProjectDetail({
				projectId: options.projectId
			}).then(response => {
				let resData = response.data.data;
				let initData = {
					currentNum: resData.currentNum,
					endTime: resData.endTime,
					monthCount: resData.monthCount,
					monthDays: resData.monthDays,
					name: resData.name,
					pid: resData.pid,
					returnValue: resData.returnValue,
					startTime: resData.startTime,
					totalNum: resData.totalNum
				};
				this.projectData = initData;
			});
			/* 判断用户是否登录 */
			if (getToken()) {
				/* 获取用户与分享项目之间的状态 */
				getJoinStatus({
					projectId: options.projectId
				}).then(response => {
					let statusCode = response.data.data;
					switch (statusCode) {
						case 0:
							this.showStatus = 0;
							break;
						case 1:
							this.showStatus = 1;
							break;
						case 2:
							this.showStatus = 2;
							break;
						case 3:
							this.showStatus = 3;
							break;
						default:
							break;
					}
				});
			} else {
				this.showStatus = 4;
				this.$refs.popup.open();
			}
		},
		onShareAppMessage: function(optiom) {
			/* 分享功能、未登录则引导登录*/
			if (getToken()) {
				if (optiom.from === 'button') {
					/* 获取用户本身的信息，作为分享者的数据，传递至被分享者页面 */
					getUserInfo().then(response => {
							let resData = response.data.data;
							this.myName = resData.nickName;
							this.mycid = resData.cid;
							return {
								title: '会子簿',
								desc: '专门记录会子的小程序',
								imageUrl: '../../static/images/cyf.jpg',
								path: '/pages/home/index?inviteName=' + this.myName + '&cid=' + this.mycid + '&projectId=' + this.projectId,
								success: function(res) {
									// 转发成功
									uni.showToast({
										title: '分享成功',
										icon: 'none'
									});
								},
								fail: function(res) {
									// 转发失败
									uni.showToast({
										title: '分享失败,请重试',
										icon: 'none'
									});
								}
							};
						})
						.catch(() => {
							uni.showToast({
								title: '分享失败,请重试',
								icon: 'none'
							});
						});
				}
			} else {
				this.$refs.popup.open();
			}
		},
		components: {
			uniPopup,
			uniPopupDialog
		},
		methods: {
			close(done) {
				done();
			},
			confirm(done) {
				uni.navigateTo({
					url: '/pages/login/index?from=share'
				});
				done();
			},
			toLogin() {
				this.$refs.popup.open();
			},
			/*  加入项目，传统分享者的数据 */
			join() {
				joinProject({
					projectId: this.projectId,
					inviter: this.cid
				}).then(response => {
					console.log(response)
				});
			}
		},
		filters: {
			formatDate: function(value) {
				var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = date.getDate() + ' ';
				var h = date.getHours() + ':';
				var m = date.getMinutes() + ':';
				var s = date.getSeconds();
				return Y + M + D;
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

	.share {
		width: 100%;
		height: 100%;
		overflow: hidden;

		.fx_bg {
			width: 100%;
			height: 100%;
			position: absolute;
		}

		&-nav {
			height: 140upx;
		}

		&-box {
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 99;

			&-top {
				display: flex;

				&-cat {
					image {
						width: 180upx;
						height: 180upx;
					}
				}

				&-text {
					margin: 30upx 0 0 40upx;
					line-height: 60upx;
					font-size: 20px;
					align-items: center;
					font-weight: bold;
				}
			}

			&-detail {
				margin: 0 auto;
				padding-top: 20upx;
				width: 90%;
				height: 70%;

				&-card {
					border-radius: 5px;
					margin: 20upx auto;
					width: 80%;
					height: 30%;
					padding: 20upx;

					>view {
						line-height: 68upx;
						color: #333;
						font-size: 36upx;
						align-items: center;
						border-bottom: 1px solid;

						text.name {
							display: inline-block;
							font-weight: bold;

						}

						text {
							font-weight: 500;
							padding-left: 20upx;
						}
					}

					&:first-child {}
				}

				.share-button {
					position: relative;
					top: 120%;
					color: #8e7d01;
					margin: 10upx 0;
				}
			}
		}
	}
</style>
