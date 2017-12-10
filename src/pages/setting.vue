<template>
  <div class="setting-box">
		<el-form ref="form" :model="settingForm" label-width="100px" label-position="left">
  		<el-form-item label="登录状态">
				
			</el-form-item>
		</el-form>
  </div>
</template>

<script>
import axios from "axios";
import Utils from '@/assets/utils'
export default {
  name: 'setting',
  data () {
  	return {
			settingForm: {
	
			}
		}
  },
	created () {
		
	},
	components: {
	},
	methods: {
		errMsgOpen(msg) {
			const h = this.$createElement;
			this.$notify({
				title: '服务端错误',
				message: h('i', { style: 'color: teal'}, '好像是接口报错了呢！')
			});
    }
	}
}
</script>

<style lang="less">
	.setting-box {
		margin-top: 50px;
	}
</style>
