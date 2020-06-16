<template>
	<view class="per-datum dominant-hue-bg">
		<view class="per-datum-nav">
			<nav-bar ref="navBar" backState="1000" :home="false"  transparentFixedFontColor="#FFF" type="transparentFixed" title="完善个人资料">
			<!-- <view class="icon_setUp" slot="transparentFixedRight">设置</view> -->
			</nav-bar>
		</view>
		<view class="per-datum-logo">
			<view class="per-datum-logo-msg">
				<image src="../../static/images/cyf.jpg" mode=""></image>
				<text>陈一发儿</text>
			</view>
		</view>
		<view class="clear">
		</view>
		<view class="per-datum-msg">
			<input type="text" v-model="username" placeholder="真实姓名" class="text-style " >
			<input type="text" v-model="phone" placeholder="手机号" class="text-style" >
			<view>
				<move-verify @result='verifyResult' ref="verifyElement"></move-verify>
			</view>
			<view class="verify" v-if="isVerify">
				<input type="text" v-model="username" placeholder="验证码" class="text-style ipt-default-current" >
				<button type="default" class="sms-cd-btn" id="sms-send-cd-btn" :disabled="!isSend" @click="sendVerify" >
				<text v-if="isSend">{{ sendText }}</text>
				<uni-countdown
				v-if="!isSend"
				color="#FFFFFF"
				background-color="#ffe300"
				border-color="#00B26A"
				:show-day="false"
				:hour="0"
				:minute="0"
				:second="9"
				:showPer="false"
				:showColon="false"
				@timeup="isOver"
			></uni-countdown>
			</button>
			</view>
			<button type="default" class="affirm-btn dominant-hue-bg" :disabled="isSure" >提交修改</button>

		</view>

		<view class="per-datum-bg">
			<image src="../../static/images/perfect.jpg" mode=""></image>
		</view>
	</view>
</template>

<script>
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
	import moveVerify from "@/components/helang-moveVerify/helang-moveVerify.vue"
	export default {
		data() {
			return {
				username:"",
				phone:"",
				resultData:{},
				isSure:true,
				isVerify:false,
				isSend:true,
				sendText:"发送验证码"
			}
		},
		components: {  "move-verify":moveVerify ,uniCountdown },
		methods:{
			/* 校验结果回调函数 */
			verifyResult(res){
				if(res.flag){
					this.isVerify = true ;
				}
				this.resultData = res;
			},
			/* 校验插件重置 */
			verifyReset(){
				this.$refs.verifyElement.reset();

				/* 删除当前页面的数据 */
				this.resultData = {};
			},
			isOver(){
				this.sendText="再次发送"
				this.isSend = true;
			},
			sendVerify(){
				console.log(111)
				this.isSend = false;
			}
		}
	}
</script>

<style lang="less">
	html,body,uni-page-body{
	 width: 100%;
	 height: 100%;
	}
	/deep/.uni-countdown__number{
		width: 100% !important;
		height: 64upx !important;
		font-size: 32upx !important;
	}
	.per-datum{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		&-nav{
			height: 90upx;
		}
		&-logo{
			width: 100%;
			height: 400upx;
			&-msg{
				position: absolute;
				z-index: 99;
				top: 10%;
				left: 50%;
				transform: translate(-50%);
				image{
					border-radius: 50%;
					width: 200upx;
					height: 200upx;
				}
				text{
					display: block;
					text-align: center;
					color: #333;
				}
			}

		}
		&-msg{
			width: 80%;
			margin: 0 auto;
			position: relative;
			z-index: 99;
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
		&-bg{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			image{
				width: 100%;
				height: 100%;
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
		.affirm-btn{
			margin-top: 40upx;
		}
	}

</style>
