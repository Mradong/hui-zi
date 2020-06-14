<template>
	<view class="item-detail">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="项目详情">
		</nav-bar>
		<view class="item-chunk  clear">
		</view>
		<view class="items">
			<view class="item" v-for=" item,index in 5" :key="index" @click="toItemDetail( index )">
				<view :class="index == 0 ? 'red-sign':'green-sign'">
				</view>
				<view class="item-content">
					<view class="item-content-main">
						2020-9-10
					</view>
					<view class="item-content-minor">
						第 <text> 2 </text> 期
					</view>
				</view>
				<view class="item-content">
					<view class="item-content-main">
						+
						<text>111</text>
					</view>
					<view class="item-content-minor">
						缴费 <text> 222 </text>元
					</view>
				</view>
				<view class="item-content">
					<view class="item-content-main">
						+
						<text>20000</text>
					</view>
					<view class="item-content-minor">
						缴费 <text> 15000 </text>元
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.item-detail{
		width: 95%;
		margin: 0 auto ;
		.item-chunk{
			height: 250upx;
			margin: 20upx 0 40upx;
			background-image: linear-gradient(to bottom right, #f5bdcb, #fceee2);
			border-radius: 6upx;
			box-shadow: 0 2px 2px #d1d1d1;
		}
		
		.items{
			.item{
				display: flex;
				border-bottom: 1px solid  #f1eaea;
				position: relative;
				.item-content{
					flex: 2;
					text-align: center;
					height: 150upx;
					display: flex;
					flex-direction: column;
					&-ball{
						width: 80upx;
						height: 80upx;
						line-height:80upx;
						border-radius: 50%;
						background-image: linear-gradient(to bottom right, #f5bdcb, #fceee2);
						position: relative;
						top: 50%;
						left: 50%;
						margin-top: -40upx;
						margin-left: -40upx;
						font-size: 40upx;
						color: #f18d00;
					}
					&-main,&-minor{
						flex: 1;
						
					}
					&-main{
						font-size: 36upx;
						line-height:80upx;
						text{
							font-size: 46upx;
							color: #f31d1d;
							margin: 0 10upx;
						}
					}
					&-minor{
						font-size: 24upx;
						line-height:40upx;
						color: #C8C7CC;
					}
				}
				.red-sign,.green-sign{
					position: absolute;
					top: 0;
					left: 0;
					width: 0;
					height: 0;
				}
				.red-sign{
					border-top: 30upx solid #f30a0a;
					border-right: 30upx solid transparent;
				}
				.green-sign{
					border-top: 30upx solid #4CD964;
					border-right: 30upx solid transparent;
				}
			}
		}
	}
</style>
