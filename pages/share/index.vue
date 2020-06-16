<template>
	<view class="share dominant-hue-bg">
		<image class="fx_bg" src="../../static/images/fx_bg.jpg" mode=""></image>
		<view class="share-nav">
			<nav-bar ref="navBar" backState="2000" :home="false"  transparentFixedFontColor="#FFF" type="transparentFixed" title="分享">
			<!-- <view class="icon_setUp" slot="transparentFixedRight">设置</view> -->
			</nav-bar>
		</view>
		<view class="clear">
		</view>
		<view class="share-box">
			<view class="share-box-top">
				<view class="share-box-top-cat">
					<image src="../../static/images/share_cat.svg" mode=""></image>
				</view>
				<view class="share-box-top-text">
					您的好朋友，王二狗<br />邀请您加入~
				</view>
			</view>
			<view class="share-box-detail">
				<view class="share-box-detail-card">
					<view class="">
						<text class="name">项目名称:</text><text>王二狗500</text>
					</view>
					<view class="">
						<text class="name">总期数:</text><text>50</text>
					</view>
					<view class="">
						<text class="name">固定金额(元):</text><text>500</text>
					</view>
					<view class="">
						<text class="name">预计开始时间:</text><text>2019-10-09</text>
					</view>
					<button type="default" class="share-button " @click="join" v-if="isShow"> {{ buttonText }}</button>
					<button type="default" class="share-button " @click="toLogin" v-if="!isShow"> {{ buttonText}}</button>
				</view>
			</view>
			
			<uni-popup ref="popup" type="dialog">
			    <uni-popup-dialog type="warn" title="未登录" content="小主,是否前往登录~" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import { getToken } from '@/utils/auth'
	export default {
		data() {
			return {
				buttonText:"冲吧,路飞~",
				isShow:true,
				resultData:{},
				isVerify:false,
			}
		},
		onLoad(){
			if( getToken()){
				//=> 获取用户信息,判断该项目是否已经参加
			}
			else{
				this.buttonText ="qu登录~";
			}
				
		},
		components: {  
			uniPopup,
			uniPopupDialog
		},
		methods:{
			/* 校验结果回调函数 */
			verifyResult(res){
				console.log(res);
				this.isVerify = true ;
				this.resultData = res;
			},
			/* 校验插件重置 */
			verifyReset(){
				this.$refs.verifyElement.reset();

				/* 删除当前页面的数据 */
				this.resultData = {};
			},
			close(done){
				done()
			},
			confirm(done){
				uni.navigateTo({
					url: '/pages/login/index?from=share'
				});
				done()
			},
			toLogin(){
				this.$refs.popup.open();
			},
			join(){
				console.log( "我加入会子了")
			}
		},
		watch:{
			buttonText(){
				this.isShow = false ,
				this.$refs.popup.open();
			}
			
		}
	}
</script>

<style lang="less">
	 html,body,uni-page-body{
		 width: 100%;
		 height: 100%;
	 }
	.share{
		width: 100%;
		height: 100%;
		overflow: hidden;
		.fx_bg{
			width: 100%;
			height: 100%;
			position: absolute;
			
		}
		&-nav{
			height: 140upx;
		}
		&-box{
			width: 100%;
			height: 100%;
			position: relative;
			z-index: 99;
			&-top{
				display: flex;
				margin-left:40upx;
				&-cat{
					image{
						width: 180upx;
						height: 180upx;
					}
				}
				&-text{
					margin: 30upx 0 0 40upx;
					line-height: 60upx;
					font-size: 20px;
					align-items: center;
					font-weight: bold;
				}
			}
			&-detail{
				margin: 0 auto;
				padding-top: 20upx;
				width: 90%;
				height: 70%;
				&-card{

					border-radius: 5px;
					margin: 20upx auto;
					width: 80%;
					height: 30%;
					padding: 20upx;
					>view{
						line-height:68upx;
						color: #333;
						font-size: 36upx;
						align-items: center;
						border-bottom: 1px solid;
						text.name{
							display: inline-block;
							font-weight: bold;
							width: 250upx;
						} 
						text{
							
							font-weight: 500;
							padding-left: 20upx;
						}
					}
					&:first-child{

					}
				}
				.share-button{
					position: relative;
					top: 120%;
					color: #8e7d01;
					background-color: #FFFFFF;
				}
					
			}
		}
	}
</style>
