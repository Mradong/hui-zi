<template>
	<view class="competition">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="参与投标"></nav-bar>
		<view class="form-row">
			<label class="form-row-title">金额</label>
			<input type="number" maxlength="11" v-model="money" placeholder="请输入投标金额" class="form-row-input " />
			<!-- 不能为空值，看到做判断 -->
			<view class="warn" v-if="money == '' ? true : false"></view>
		</view>
		<button class="competition-button" type="primary" @click="openCompetition">确认</button>
		<uni-popup ref="Competition" type="dialog">
			<uni-popup-dialog type="input" title="提示" :content="Competition" :duration="2000" :before-close="true"  @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popup" type="message">
		    <uni-popup-message :type="type" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
export default {
	data() {
		return {
			money: '',
			Competition: '',
			type:"success",
			message:"提交成功!"
		};
	},
	onLoad() {},
	onShow() {},
	methods: {
		openCompetition() {
			console.log( this.money  != '' )
			if( this.money  ){
				this.Competition = `当前投标金额 ${this.money} 元，是否提交`;
				this.$refs.Competition.open();
			}
			else{
				this.type= "error";
				this.message ="投标金额不能为空";
				this.$refs.popup.open();
			}
		},
		confirm(done, value) {
			this.$refs.popup.open();
			done();
			setTimeout(function(){
				uni.navigateTo({
					url: '/pages/home/index'
				});
			},1000)
		},
		close(done){
			done()
		},
	},
	components: {
		uniPopup,
		uniPopupMessage,
		uniPopupDialog
	}
};
</script>

<style lang="less">
.form-row {
	display: flex;
	padding: 10upx 20upx;
	border-bottom: 1px solid #f1f1f1;
	margin-top: 20upx;
	&-title {
		flex: 1;
		color: rgba(56, 56, 56, 1);
		font-size: 34upx;
		line-height: 150%;
		text-align: center;
		vertical-align: middle;
	}
	&-input {
		flex: 4;
	}
}
.competition-button {
	width: 85%;
	margin: 80upx auto;
}
</style>
