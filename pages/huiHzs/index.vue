<template>
	<view class="hui-zis">
		<view class="hui-zis-top">
			<nav-bar ref="navBar" backState="1000" :home="false"  transparentFixedFontColor="#FFF" type="transparentFixed" title="会子列表">
			<!-- <view class="icon_setUp" slot="transparentFixedRight">设置</view> -->
			</nav-bar>
			<image src="../../static/images/cyf.jpg" mode=""></image>
		</view>
		<wuc-tab class="hui-zis-tab" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :textFlex="true" ></wuc-tab>
		<view class="hui-zis-items" v-if="isHuiItem">
			<view class="hui-zis-items-title">
				<text class="jingxuan">精选会子</text>
				<view class="all"><text>全部 </text><image src="../../static/images/jiantou.svg" mode=""></image></view>
				<image src="../../static/images/yunwen.png" mode=""></image>
			</view>
			<view class="hui-zis-items-item">
				<view class="custom-area">
					<view class="custom-area-item">
						<view class="tc thead">
							<view class="tc-r">代码：2020lyd13256465</view>
							<view class="tc-l"></view>
						</view>
						<view class="td">
							<view class="td-r">
								<view class="shouyi">100.00</view>
								<view class="">每月预计盈利</view>
							</view>
							<view class="td-l">
								<view class="td-l-tile">娜美500会</view>
								<view class="">每月会费：500</view>
								<view class="">剩余名额：5 人</view>
							</view>
						</view>
						<view class="tf">
							<view class="tf-r">项目名：</view>
							<view class="tf-l"><button type="default" class="tf-button" @click="toShare">入一名</button></view>
						</view>
					</view>
					<view class="custom-area-item">
						<view class="tc thead">
							<view class="tc-r">编码：2020lyd13256465</view>
							<view class="tc-l"></view>
						</view>
						<view class="td">
							<view class="td-r">
								<view class="shouyi">100.00</view>
								<view class="">每月预计盈利</view>
							</view>
							<view class="td-l">
								<view class="td-l-tile">李二狗500会</view>
								<view class="">每月会费：500</view>
								<view class="">剩余名额：5(人)</view>
							</view>
						</view>
						<view class="tf">
							<view class="tf-r">项目名：</view>
							<view class="tf-l"><button type="default" class="tf-button">入一名</button></view>
						</view>
					</view>
				</view>
			</view>
		</view>
			<view class="" v-if="!isHuiItem">
				功能暂未开放
			</view>
	</view>

</template>

<script>
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	export default {
		data() {
			return {
			  TabCur: 0,
			  tabList: [{ name: '我是会员' ,icon: 'cuIcon-comment'}, { name: '我是会头',icon: 'cuIcon-comment' }],
			  isHuiItem:true,
			}},
		components: { WucTab },
		methods: {
			tabChange(index) {
				if(index == 0){
					this.isHuiItem = true;
					return ;
				}
				this.isHuiItem = false;
			},
			toShare(){
				uni.navigateTo({
					url: '/pages/share/index'
				});
			}
		}
	}
</script>

<style lang="less">
	.hui-zis{
		&-top{
			height: 400upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		&-tab{
			width: 90%;
			margin: 0 auto;
			position: relative;
			top: -40upx;
			background-color: #FFFFFF;
			box-shadow: 0 0  15px #d2cfcf;
			border-radius: 10px;
			display: flex;
		}
		&-items{
			width: 90%;
			margin: 0 auto;
			&-title{
				position: relative;
				.jingxuan{
					font-size: 40upx;
					font-weight: 700;
					color: #7b00d8;
					text-shadow:5upx 5upx 8upx #0e5dd4;
					text-align: left;
					position: relative;
					z-index: 99;
					margin-left: 30upx;
				}
				.all{
					float: right;
					margin-right: 20upx;
					text{
						position: relative;
						top: -4upx;
					}
					image{
						width: 30upx;
						height: 30upx;
					}
				}
				> image{
					position: absolute;
					top: -80%;
					left: 0;
					width:250upx;
					height: 120upx;
					opacity:0.2;
					filter:alpha(opacity=20); /* 针对 IE8 以及更早的版本 */
				}
			}
			&-item{
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
						box-shadow: 10upx 10upx 20upx #C0C0C0;
					}
					.tc,
					.td,
					.tf {
						width: 100%;
						height: 60upx;
						color: rgba(166, 166, 166, 1);
						font-size: 26upx;
						line-height: 60upx;
						border: 2upx solid rgba(242, 242, 242, 1);
						display: flex;
						padding: 0 30upx;
						box-sizing: border-box;
						&-r {
							flex: 2;
							text-align: left;
						}
						&-l {
							flex: 1;
							text-align: right;
						}
					}
					.td {
						height: 230upx;
						&-r {
							flex: 1;
							text-align: left;
							color: #333333;
							position: relative;
							
							.shouyi{
								margin-top: 30upx;
								font-size: 70upx;
								line-height: 100upx;
								color: #ff0900;
							}
							&::after{
								content: '';
								display: block;
								height: 200upx;
								width: 2upx;
								background-color: #f1e4e4;
								position: absolute;
								top: 50%;
								right: 0;
								transform: translate(0,-50%);
							}
						}
						&-l {
							flex: 1;
							text-align: left;
							margin-left:50upx;
							font-size: 24upx;
							.td-l-tile{
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
								color: #fff;
								box-shadow: rgba(144, 192, 239, 1) solid 1px;
								background: linear-gradient(to top right, #ff6ba2, #7b00d8);
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
</style>
