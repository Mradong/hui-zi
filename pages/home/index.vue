<template>
	<view class="dream">
		<nav-bar fontColor="#000" backState="2000" :home="false" :titleCenter="true" type="fixed" title="梦想基金"></nav-bar>
		<view class="dream-banner dominant-hue-bg-shade">
			<view class="icon-lyd-l"><image src="../../static/images/wenhao.svg" mode=""></image></view>
			<view class="icon-lyd-r" @click="toDatum"><image src="../../static/images/shezhi.svg" mode=""></image></view>
		</view>
		<view class="dream-detail">
			<view class="dream-detail-item">
				{{ totalValue }}
				<br />
				<text>总取金额(元)</text>
			</view>
			<view class="dream-detail-item">
				{{ totalInput }}
				<br />
				<text>累计支出(元)</text>
			</view>
			<view class="dream-detail-item">
				{{ totalReturn }}
				<br />
				<text>累计收益(元)</text>
			</view>
		</view>
		<view class="dream-items">
			<view class="dream-items-quesheng" v-if="!isLogin">
				<image src="../../static/images/xiuxi.svg" mode=""></image>
				<text>今天没有消息,好好休息一下</text>
			</view>
			<view class="dream-items-title" v-if="isLogin">
				<image src="../../static/images/xiaoxi.svg" mode=""></image>
				<text>小主，今天有消息啦,
				请查收~
				</text>
			</view>
			<view class="in-competition" v-if="isLogin">
				<view class="today-item">
					<view class="custom-area">
						<view class="custom-area-item">
							<view class="tc thead">
								<view class="tc-r" v-if="isOver">投标已结束</view>
								<view class="tc-r" v-if="!isOver">
									<view class="countdown-text">投标结束倒计时</view>
									<uni-countdown
										color="#FFFFFF"
										background-color="rgb(246, 118, 124)"
										border-color="#00B26A"
										:show-day="false"
										:hour="hour"
										:minute="minute"
										:second="second"
										@timeup="isCompetition"
									></uni-countdown>
								</view>
								
							</view>
							<view class="td">
								<view class="td-r">
									<view class="unclosed-competition" v-if="!isOver">小主、投标还未结束呢!</view>
									<view class="shouyi" v-if="isOver">100.00</view>
									<view class="">本期缴费</view>
								</view>
								<view class="td-l">
									<view class="td-l-tile">李二狗500会</view>
									<view class="">每月固定会费：500</view>
									<view class="">第23期</view>
								</view>
							</view>
							<view class="tf">
								<view class="tf-r" v-if="!isOver">
									<view class="countdown-text">
										当前已投标，金额<text>500</text>
										再去>>
									</view>
								</view>
								<view class="tf-r" v-if="isOver">
									本期投标已经结束,去看一下>>
								</view>
								<view class="tf-l" v-if="!isOver"><button type="default" class="tf-button dominant-hue-button-bg-red" @click="competition">修改一下</button></view>
								<view class="tf-l" v-if="isOver"><button type="default" class="tf-button dominant-hue-button-bg-yell">取会结果</button></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="dream-tab">
			<view class="dream-tab-y"><button class="dominant-hue-button-bg-red" @click="goMyItem">我的会子</button></view>
			<view class="dream-tab-e"><button class="dominant-hue-button-bg-yell" @click="goHuiZis">冲啊，路飞</button></view>
		</view>
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog type="warn" title="未登录" content="小主,是否前往登录~" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
import {mapState} from "vuex"
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
import { getToken } from '@/utils/auth'
import { getHomeTodayPay , getUserTAC} from '@/api/home.js'
export default {
	data() {
		return {
			title: 'Hello',
			hour: 0,
			minute: 0,
			second: 0,
			isLogin:false,
			isOver:false,
			totalValue:"0.00",
			totalInput:"0.00",
			totalReturn:"0.00"
		};
	},
	onLoad() {
		if( !getToken() ){
			this.isLogin  =  true ;
			// getHomeTodayPay().then(response =>{
			// 	console.log(response )
			// })
			this.countTime();
			getUserTAC().then(response =>{
				if( response.data.msg === "SUCCESS" ){
					this.totalValue = response.data.data.totalValue;
					this.totalInput = response.data.data.totalInput;
					this.totalReturn = response.data.data.totalReturn;
				}
				else{
					uni.showToast({ title: '获取数据失败', icon: 'none' });
				}
			
			})
		}
		else{
			this.isLogin  = false;
		}
	},
	onShow() {

	},
	computed: {
		...mapState(['userName'])
	},
	methods: {
		goHuiZis() {
			uni.navigateTo({
				url: '/pages/huiHzs/index'
			});
		},
		goMyItem(){
			if( !getToken() ){
				uni.navigateTo({
					url: '/pages/myItem/index'
				});
			}
			else {
				this.$refs.popup.open();
			}
		},
		toDatum(){
			uni.navigateTo({
				url: '/pages/perfectDatum/index'
			});
		},
		competition(){
			uni.navigateTo({
				url: '/pages/competition/index'
			});
		},
		toRanking(){
			uni.navigateTo({
				url: '/pages/ranking/index'
			});
		},
		isCompetition(){
			this.isOver = true ;
		},
		countTime() {
			//获取当前时间
			let date = new Date();
			let now = date.getTime();
			//设置截止时间
			let str = date.getFullYear() + '/' + (Number(date.getMonth()) + 1) + '/' + date.getDate() + ' 22:00:00';
			let endDate = new Date(str);
			let end = endDate.getTime();
			//时间差
			let leftTime = end - now;
			//定义变量 d,h,m,s保存倒计时的时间
			if (leftTime >= 0) {
				this.hour = Math.floor((leftTime / 1000 / 60 / 60) % 24);
				this.minute = Math.floor((leftTime / 1000 / 60) % 60);
				this.second = Math.floor((leftTime / 1000) % 60);
			}
			if( date.getHours() >= 22){
				this.isOver = true ;
			}
		},
		close(done){
			done()
		},
		confirm(done){
			uni.navigateTo({
				url: '/pages/login/index?from=home'
			});
			done()
		}

	},
	components: {
		uniCountdown,
		uniPopup,
		uniPopupDialog
	}
};
</script>

<style lang="less">
/deep/.header_fixed {
	z-index: 99999;
}
/deep/.uni-countdown {
	float: left;
}
.dream {
	&-banner {
		width: 100%;
		height: 400upx;
		position: relative;
		&-title {
			position: absolute;
			top: 50upx;
			z-index: 9;
			color: #ffffff;
			width: 100%;
			text-align: center;
			font-size: 40upx;
			line-height: 64upx;
			text-shadow: 4upx 4upx 10upx #000000;
			> text {
				font-size: 36upx;
				position: relative;
				z-index: 99;
			}
			.dream-banner-pig {
				position: absolute;
				left: 50%;
				font-weight: 700;
				transform: translate(-50%);
				z-index: 9;
				text {
					line-height: 100upx;
					font-size: 68upx;
				}
			}
		}
		> image {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
		}
		.icon-lyd-r,
		.icon-lyd-l {
			width: 50upx;
			height: 50upx;
			position: absolute;
			top: 20upx;
			z-index: 99;
			opacity: 0.5;
			filter: alpha(opacity=50); /* 针对 IE8 以及更早的版本 */
			image {
				width: 100%;
				height: 100%;
			}
		}
		.icon-lyd-r {
			right: 20upx;
		}
		.icon-lyd-l {
			left: 20upx;
		}
	}
	&-detail {
		width: 90%;
		height: 150upx;
		margin: 0 auto;
		position: relative;
		top: -40upx;
		background-color: #ffffff;
		box-shadow: 0 0 15px #d2cfcf;
		border-radius: 10px;
		display: flex;
		&-item {
			padding-top: 20upx;
			flex: 1;
			text-align: center;
			line-height: 50upx;
			font-weight: 700;
			font-size: 32upx;
			text {
				font-weight: 500;
				color: #9a9a9a;
				font-size: 24upx;
			}
		}
	}
	&-items {
		margin: 20upx;
		margin-bottom: 140upx;
		&-quesheng{
			width: 90%;
			height: 400upx;
			image{
				width: 360upx;
				height: 360upx;
				display: block;
				margin: 0 auto;
			}
			text {
				font-size: 36upx;
				display: block;
				text-align: center;
			}
		}
		&-title {
			
			height: 100upx;
			text {
				float: left;
				font-weight: bold;
				margin-left: 10upx;
				width:305upx;
			}
			image {
				width: 100upx;
				height: 100upx;
				float: left;
			}
		}
		.in-competition {
			.today-item {
				.custom-area {
					width: 95%;
					margin: 0 auto;
					color: rgba(80, 80, 80, 1);
					font-size: 14px;
					line-height: 150%;
					text-align: center;
					&-item {
						margin-top: 20upx;
						width: 100%;
						box-shadow: 10upx 10upx 20upx #c0c0c0;
					}
					.tc,
					.td,
					.tf {
						width: 100%;
						height: 80upx;
						color: rgba(166, 166, 166, 1);
						font-size: 26upx;
						line-height: 60upx;
						border: 2upx solid rgba(242, 242, 242, 1);
						display: flex;
						padding: 0 30upx;
						box-sizing: border-box;
						&-r {
							padding-top: 10upx;
							flex: 2;
							text-align: left;
							.countdown-text {
								float: left;
								
								text{
									padding: 8upx;
									color: #DD524D;
									font-size: 28upx;
								}
							}
						}
						&-l {
							flex: 1;
							text-align: right;
						}
					}
					.td {
						height: 210upx;
						&-r {
							flex: 1;
							text-align: left;
							color: #333333;
							position: relative;
							.unclosed-competition {
								margin-top: 30upx;
								font-size: 24upx;
								color: #ff1800;
								line-height: 36upx;
							}
							.shouyi {
								margin-top: 30upx;
								font-size: 70upx;
								line-height: 76upx;
								color: #ff0900;
							}
							&::after {
								content: '';
								display: block;
								height: 184upx;
								width: 2upx;
								background-color: #f1e4e4;
								position: absolute;
								top: 50%;
								right: 0;
								transform: translate(0, -50%);
							}
						}
						&-l {
							flex: 1;
							text-align: left;
							margin-left: 50upx;
							font-size: 24upx;
							.td-l-tile {
								font-weight: 600;
								margin-top: 30upx;
								font-size: 40upx;
								color: #333333;
							}
						}
					}
					.tf {
						height: 80upx;
						&-r {
							flex: 2;
							text-align: left;
						}
						&-l {
							flex: 1;
							text-align: right;
							.tf-button {
								margin-top: 12upx;
								width: 200upx;
								height: 56upx;
								box-shadow: rgba(144, 192, 239, 1) solid 1px;
								border-radius: 4px;
								font-size: 26upx;
								line-height: 56upx;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
	&-tab {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		&-y {
			flex: 1;
			.button-y {
				color: #FBF0DC;
				background-color: #FD5234;
			}
		}
		&-e {
			flex: 2;
			.button-e {
				color:#250D00;
			}
		}
		button,
		button::after {
			border-radius: 0;
			line-height: 120upx;
		}
	}
}
</style>
