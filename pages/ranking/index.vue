<template>
	<view class="ranking">
		<view class="ranking-top">
			<nav-bar ref="navBar" backState="1000" :home="false"  transparentFixedFontColor="#FFF" type="transparentFixed" title="投标排行榜">
			<!-- <view class="icon_setUp" slot="transparentFixedRight">设置</view> -->
			</nav-bar>
			<view class="ranking-one">
				<view class="ranking-one-icon">
					<image src="../../static/images/one.svg" mode=""></image>
				</view>
				<view class="ranking-one-detail">
					<view class="logo">
						<image src="../../static/images/cyf.jpg" mode=""></image>
					</view>
					<view class="name">
						陈一发儿
					</view>
				</view>

				<view class="ranking-one-num">
					<image src="../../static/images/1.svg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="ranking-content">
			<view class="ranking-title">
				<view class="ranking-title-l">
					排名
				</view>
				<view class="ranking-title-r">
					投标金额
				</view>
			</view>
			<view class="ranking-item" v-for="item,index in 8" >
				<view class="serial" v-if=" index == 0 ||  index == 1 ||  index == 2">
					<image :src=" index == 0 ? '../../static/images/jinjp.svg' :  index == 1 ?'../../static/images/yinjp.svg' : '../../static/images/tongjp.svg'" mode=""></image>
				</view>
				<view class="serial" v-if=" index != 0 &&  index != 1 &&  index != 2">
					{{index + 1 }}
				</view>
				<view class="ranking-item-detail">
					<view class="ranking-item-logo">
						<image src="../../static/images/cyf.jpg" mode=""></image>
					</view>
					<view class="ranking-item-name">
						陈一发儿
					</view>
				</view>
				<view class="ranking-item-money">
					1200元
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.ranking{
		&-top{
			width: 100%;
			height: 400upx;
			background: linear-gradient(to top right, #FFA733, #FF6A4C);
			position: relative;
		}
		&-one{
			width: 450upx;
			position: absolute;
			top: 60%;
			left: 50%;
			transform: translate(-50%,-50%);
			display: flex;
			&-icon{
				flex: 1;
				
				image{
					padding-top: 20upx;
					width: 80upx;
					height: 120upx;
				}
			}
			&-detail{
				.logo{
					width: 150upx;
					height: 150upx;
					border-radius: 50%;
					border: 1px solid #FFFFFF;
					overflow: hidden;
					margin: 0 auto;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.name{
					color: #FFFFFF;
					margin-top: 10upx;
					text-align: center;
				}
			}
			&-num{
				flex: 1;
				position: relative;
				text-align: right;
				image{
					padding-top: 20upx;
					width: 80upx;
					height: 120upx;
					padding-right: 20upx;
				}
				
				&::after{
					content: "nd";
					position: absolute;
					bottom: 95upx;
					right: 0;
					color: #FFF;
				}

			}
		}
		&-content{
			margin-top: 30upx;
			.ranking-title{
				display: flex;
				.ranking-title-r,.ranking-title-l{
					flex: 1;
					font-size: 40upx;
				}
				.ranking-title-r{
					margin-right: 20upx;
					text-align: right;
				}
				.ranking-title-l{
					margin-left: 20upx;
				}
			}
			.ranking-item{
				display: flex;
				margin: 30upx 0;
				>view{
					text-align: center;
					line-height: 70upx;
					font-size: 34upx;
				}
				.serial{
					flex: 1;
					image{
						
						width: 50upx;
						height: 50upx;
					}
					
				}
				.ranking-item-detail{
					flex: 4;
					display: flex;
					.ranking-item-logo{
						width: 70upx;
						height: 70upx;
						border-radius: 50%;
						overflow: hidden;
						background-color: #C0C0C0;
						image{
							
							width: 100%;
							height: 100%;
						}
					}
					.ranking-item-name{
						text-align: left;
						margin-left: 10upx;
						flex: 1;
					}
				}
				.ranking-item-money{
					text-align: center;
					flex:2;
					color: #FCDC06;
				}
			}		
		}
	}

</style>
