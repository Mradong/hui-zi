<template>
	<view class="dream">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="梦想基金">
		</nav-bar>
		<view class="dream-banner">
			<view class="dream-banner-title">
				想买就买的自由<br>
				<text>梦想储存池</text>
				<view class="dream-banner-pig">
					<text>$5000.00</text>
					<!-- <image src="../../static/images/jinzhu.png" mode=""></image> -->
				</view>
			</view>
			<image src="../../static/images/fense_bg_02.png" mode=""></image>
		</view>
		<view class="dream-detail">
			<view class="dream-detail-item">
				1000.00<br />
				<text>梦想预算(元)</text>
			</view>
			<view class="dream-detail-item">
				0.00<br />
				<text>已存金额(元)</text>
			</view>
			<view class="dream-detail-item">
				暂无收益<br />
				<text>累计金额(元)</text>
			</view>
		</view>
		<view class="dream-items">
			<view class="dream-items-title">
				<image src="../../static/images/aixin.svg" mode=""></image>
				<text>梦想开始，快存入第一名启动梦想吧!</text>
			</view>

		</view>
		<view class="dream-tab">
			<view class="dream-tab-y">
				<button class="button-y">定时存入</button>
			</view>
			<view class="dream-tab-e">
				<button class="button-e" @click="goHuiZis">为了梦想取一名1</button>
			</view>
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
			goHuiZis(){
				uni.navigateTo({
					url: '/pages/huiHzs/index'
				});
			},
		}
	}
</script>

<style lang="less">
	.dream{
		&-banner{
			width: 100%;
			height: 400upx;
			position: relative;
			&-title{
				position: absolute;
				top: 50upx;
				z-index: 999;
				color: #FFFFFF;
				width: 100%;
				text-align: center;
				font-size: 40upx;
				line-height: 64upx;
				text-shadow:4upx 4upx 10upx #000000;
				>text{
					font-size: 36upx;
					position: relative;
					z-index: 99;
				}
				.dream-banner-pig{
					position: absolute;
					left: 50%;
					font-weight: 700;
					transform: translate(-50%);
					z-index: 9;
						text{
							line-height: 100upx;
							font-size: 68upx;
						}
				}
			}
			> image{
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
			}
		}
		&-detail{
			width: 90%;
			height: 150upx;
			margin: 0 auto;
			position: relative;
			top: -40upx;
			background-color: #FFFFFF;
			box-shadow: 0 0  15px #d2cfcf;
			border-radius: 10px;
			display: flex;
			
			&-item{
				padding-top: 20upx;
				flex: 1;
				text-align: center;
				line-height: 50upx;
				font-weight: 700;
				font-size: 32upx;
				text{
					font-weight: 500;
					color: #9A9A9A;
					font-size: 24upx;
				}
			}
		}
		&-items{
			margin: 20upx;
			&-title{
				text{
					position: relative;
					top: -10upx;
					right: -10upx;
				}
				image{
					width: 50upx;
					height: 50upx;
				}
			}

		}
		&-tab{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 120upx;
			display: flex;
			&-y{
				flex: 1;
				.button-y{
					color: #FF525A;
				}
			}
			&-e{
				flex: 2;
				.button-e{
					background-color: #FF525A;
					color: #FFFFFF;
					
				}
			}
			button , button::after{
				
				border-radius: 0;
				line-height: 120upx;
			}
		}
	}
</style>
