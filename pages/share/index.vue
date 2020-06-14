<template>
	<view class="share">
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
						项目名称:<text>王二狗500</text>
					</view>
					<view class="">
						总期数:<text>50</text>
					</view>
					<view class="">
						固定金额(元):<text>500</text>
					</view>
					<view class="">
						预计开始时间:<text>2019-10-09</text>
					</view>
				</view>
				<view class="share-box-detail-msg">
					<input type="text" v-model="username" placeholder="真实姓名" class="text-style " >
					<input type="text" v-model="phone" placeholder="手机号" class="text-style" >
					<view>
						<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
					</view>
					<view class="verify" v-if="isVerify">
						<input type="text" v-model="username" placeholder="验证码" class="text-style ipt-default-current" >
						<button type="default" class="sms-cd-btn" id="sms-send-cd-btn" >发送验证码</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"
	export default {
		data() {
			return {
				username:"",
				phone:"",
				resultData:{},
				isVerify:false,
			}
		},
		components: {  "move-verify":moveVerify  },
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
		background-color: #FADC00;
		&-nav{
			height: 80upx;
		}
		&-box{
			width: 100%;
			height: 100%;
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
				background-color: #FFFFFF;
				&-card{
					border-radius: 5px;
					margin: 20upx auto;
					width: 80%;
					height: 30%;
					
					padding: 20upx;
					>view{
						line-height:68upx;
						color: #333;
						font-size: 16px;
						align-items: center;
						text{
							padding-left: 20upx;
						}
					}
				}
				&-msg{
					width: 90%;
					margin: 0 auto;
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
				.verify{
					display: flex;
					width: 100%;
					.ipt-default-current{
						flex: 3;
					}
					.sms-cd-btn{
						flex: 2;
						height: 84upx;
						line-height: 84upx;
						padding: 0 24upx;
						margin: 30upx 10upx ;
						color: #444444;
						background: #ffe300;
						border-radius: 4px;
						text-align: center;
						font-size: 14px;
					}

				}
			}
		}
	}
</style>
