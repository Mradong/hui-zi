<template>
	<view class="">
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
	.share-box-detail-msg{
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
</style>
