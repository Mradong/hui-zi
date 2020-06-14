<template>
	<view class="my-item">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="我的项目">
		</nav-bar>
		<view class="item-chunk  clear">
		</view>
		<view class="items">
			<view class="item-table">
				<view class="item-title">
					项目名称
				</view>
				<view class="item-title">
					上期收益
				</view>
				<view class="item-title">
					项目总收益
				</view>
			</view>
			<view class="item" v-for=" item,index in 5" :key="index" @click="toItemDetail( index )">
				<view class="item-content">
					<view class="item-content-main">
						陈一发儿
					</view>
					<view class="item-content-minor">
						已缴纳 <text> 2 </text> 期
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
						总缴费 <text> 15000 </text>元
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
	.my-item{
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
			.item-table{
				display: flex;
				margin: 20upx 0 10upx;
				padding-bottom: 10upx;
				border-bottom: 1px solid #C0C0C0;
				.item-title{
					flex: 2;
					text-align: center;
					font-weight: 700;
					font-family:SimSun,Microsoft JhengHei,Georgia,Serif;
				}
			}
			.item{
				
				display: flex;
				border-bottom: 1px dashed #C0C0C0;
				.item-content{
					flex: 2;
					text-align: center;
					display: flex;
					padding: 10upx 0 ;
					flex-direction: column;
						text{
							margin: 0 5upx;
						}
					&-main,&-minor{
						flex: 1;
						
					}
					&-main{
						font-size: 36upx;
						line-height:60upx;
						text{
							font-size: 46upx;
							color: #f31d1d;
							margin: 0 10upx;
						}
					}
					&-minor{
						font-size: 24upx;
						line-height:30upx;
						color: #C8C7CC;
					}
				}
			}
		}
	}
</style>
