<template>
	<view class="hui-zis">
		<view class="hui-zis-top"><nav-bar fontColor="#000" backState="3000" :home="false" :titleCenter="true" type="fixed" title="分享入口"></nav-bar></view>
		<wuc-tab class="hui-zis-tab" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange" :textFlex="true"></wuc-tab>
		<view class="hui-zis-items" v-if="isHuiItem">
			<view class="hui-zis-items-item" v-for="item in listData" :key="item.pid">
				<view class="name">{{item.name}}</view>
				<view class="go"><button size="small" class="dominant-hue-button-bg-red" @click="toShare(item.pid)">分享项目</button></view>
			</view>
		</view>
		<view class="" v-if="!isHuiItem">功能暂未开放</view>
	</view>
</template>

<script>
import WucTab from '@/components/wuc-tab/wuc-tab.vue';
import { getProjects , getUserInfo} from '@/api/huizis.js';
export default {
	data() {
		return {
			TabCur: 0,
			tabList: [{ name: '我是会员', icon: 'cuIcon-comment' }, { name: '我是会头', icon: 'cuIcon-comment' }],
			listData: [],
			userInfo:{},
			isHuiItem: true
		};
	},
	components: { WucTab },
	methods: {
		tabChange(index) {
			if (index == 0) {
				this.isHuiItem = true;
				return;
			}
			this.isHuiItem = false;
		},
		toShare(id) {
			uni.navigateTo({
				url: '/pages/share/index?projectId='+id +"&inviteName="+this.userInfo.nickName +"&cid="+ this.userInfo.cid
			});
		}
	},
	onLoad() {
		getProjects().then(response => {
			let initData = [];
			let resData = response.data.data;
			let len = response.data.data.length;
			for (let i = 0; i < len; i++) {
				initData[i] = {
					pid: resData[i].pid,
					name: resData[i].name
				};
			}
			this.listData = initData;
		});
		getUserInfo().then(response => {
			let resData = response.data.data;
			let initData ={
				cid: resData.cid,
				headUrl: resData.headUrl,
				mobile: resData.mobile,
				name: resData.name,
				nickName: resData.nickName,
				uid: resData.uid,
			}
			this.userInfo = initData ;
		});
	}
};
</script>

<style lang="less">
.hui-zis {
	&-top {
		height: 250upx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	&-tab {
		width: 90%;
		margin: 0 auto;
		position: relative;
		top: -40upx;
		background-color: #ffffff;
		box-shadow: 0 0 15px #d2cfcf;
		border-radius: 10px;
		display: flex;
	}
	&-items {
		width: 90%;
		margin: 0 auto;
		&-title {
			position: relative;
			.jingxuan {
				color: #7b00d8;
				margin-left: 30upx;
			}
			.all {
				float: right;
				margin-right: 20upx;
				text {
					position: relative;
					top: -4upx;
				}
				image {
					width: 30upx;
					height: 30upx;
				}
			}
			> image {
				position: absolute;
				top: -80%;
				left: 0;
				width: 250upx;
				height: 120upx;
				opacity: 0.2;
				filter: alpha(opacity=20); /* 针对 IE8 以及更早的版本 */
			}
		}
		&-item {
			display: flex;
			border: 1px solid #bbb19e;
			padding: 20upx;
			.name {
				flex: 1;
				border-right: 1px solid #bbb19e;
				font-size: 28upx;
				line-height: 90upx;
			}
			.go {
				flex: 1;
				margin-left: 20upx;
			}
		}
	}
}
</style>
