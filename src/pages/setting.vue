<template>
  <div class="setting-box">
		<el-form ref="form" :model="settingForm" label-width="100px" label-position="left">
  		<el-form-item label="登录状态">
				<el-button tyep="primery" @click="logout()">退出登录</el-button>
			</el-form-item>
		</el-form>
  </div>
</template>

<script>
import Utils from '@/assets/utils'
export default {
  name: 'setting',
  data () {
  	return {
			settingForm: {
	
			}
		}
	},
	computed: {
		is_login () {
			// conole.log('setting login status: ' + this.$store.is_login)
		}
	},
	created () {
		
	},
	components: {
	},
	methods: {
		logout () {
			let _this = this
			Utils.post('logout', '' , res => {
				if (res === '退出登录') {
					_this.$router.push({path: '/'})
					_this.$store.commit('logout')
				}
			}, res => {
				console.log(res)
			})
		}
	}
}
</script>

<style lang="less">
	.setting-box {
		margin-top: 50px;
	}
</style>
