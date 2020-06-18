<template>
	<view class="my-item">
		<view class="share-nav">
			<nav-bar ref="navBar" backState="1000" :home="false"  transparentFixedFontColor="#FFF" type="transparentFixed" title="我的项目">
			<!-- <view class="icon_setUp" slot="transparentFixedRight">设置</view> -->
			</nav-bar>
		</view>
		<view class="item-chunk clear">
		</view>
		<view class="item-card">
			
		</view>
		<view class="items">
			<view class="item" @click="toItemDetail()">
				<view class="item-title">
					王二狗500
				</view>
				<view class="item-detail">
					<view class="item-detail-money">
						<view class="item-detail-money-t">
							已缴期数(期)
						</view>
						<view class="item-detail-money-b">
							5
						</view>
					</view>
					<view class="item-detail-money">
						<view class="item-detail-money-t">
							本期收益(元)
						</view>
						<view class="item-detail-money-b">
							0.00
						</view>
					</view>
					<view class="item-detail-money">
						<view class="item-detail-money-t">
							累计收益(元)
						</view>
						<view class="item-detail-money-b">
							0.00
						</view>
					</view>
					<view class="item-detail-go">
						<image src="../../static/images/yjt.svg" mode=""></image>
					</view>
				</view>
			</view>
			<view class="item" @click="toItemDetail()">
				<view class="item-title">
					王二狗500
				</view>
				<view class="item-detail">
					<view class="item-detail-money">
						<view class="item-detail-money-t">
							已缴期数(期)
						</view>
						<view class="item-detail-money-b">
							5
						</view>
					</view>
					<view class="item-detail-money">
						<view class="item-detail-money-t">
							本期收益(元)
						</view>
						<view class="item-detail-money-b">
							0.00
						</view>
					</view>
					<view class="item-detail-money">
						<view class="item-detail-money-t">
							累计收益(元)
						</view>
						<view class="item-detail-money-b">
							0.00
						</view>
					</view>
					<view class="item-detail-go">
						<image src="../../static/images/yjt.svg" mode=""></image>
					</view>
				</view>
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
			toItemDetail( id ){
				uni.navigateTo({
					url: '/pages/itemDetail/index?id='+ id 
				});
			},
		}
	}
</script>

<style lang="less">
	html,body,uni-page-body{
			 width: 100%;
			 height: 100%;
	}
	.my-item{
		width: 100%;
		height: 100%;
		background-color: #F0EFF5;
		.item-chunk{
			height: 400upx;
			background-color: #4563C2;
			border-radius: 6upx;
			box-shadow: 0 2px 2px #d1d1d1;
		}
		.item-card{
			height: 4upx;
			background-color: #FFFFFF;
		}
		.items{
			.item{
				margin-top: 30upx;
				background-color: #FFFFFF;
				&-title{
					height: 90upx;
					line-height: 90upx;
					margin-left: 20upx;
					border-bottom: 1px solid #F0EFF5;
					font-size: 40upx;
					color: #272931;
				}
				&-detail{
					height: 140upx; 
					margin-left: 20upx;
					margin-top: 20upx;
					display: flex;
					font-size: 26upx;
					color: #969696;
					
					&-money{
						flex: 3;
						text-align: left;
						&-b{
							margin-top: 20upx;
							font-size: 40upx;
							color: #272931;
						}
					}
					&-go{
						image{
							width: 40upx;
							height: 40upx;
						}
						flex: 1;
						line-height: 140upx;
					}
				}
			}

		}
	}
</style>
