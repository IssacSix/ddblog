<template>
  <div class="movieAdmin-box">
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :id="formLabelAlign._id">
			<el-form-item label="电影名称">
				<el-input v-model="formLabelAlign.title"></el-input>
			</el-form-item>
			<el-form-item label="导演">
				<el-input v-model="formLabelAlign.doctor"></el-input>
			</el-form-item>
			<el-form-item label="国家">
				<el-input v-model="formLabelAlign.country"></el-input>
			</el-form-item>
			<el-form-item label="语言">
				<el-input v-model="formLabelAlign.language"></el-input>
			</el-form-item>
			<el-form-item label="片源地址">
				<el-input v-model="formLabelAlign.flash"></el-input>
			</el-form-item>
			<el-form-item label="上映年代">
				<el-input v-model="formLabelAlign.year"></el-input>
			</el-form-item>
			<el-form-item label="电影简介">
				<el-input v-model="formLabelAlign.summary"></el-input>
			</el-form-item>
		</el-form>
		<el-button type="primary" class="preview-btn" @click="onSubmit">提交录入</el-button>
	</div>
</template>

<script>
import axios from "axios"
import Utils from '@/assets/utils'
export default {
  name: 'movieAdmin',
  data () {
    return {
			labelPosition: 'right',
			formLabelAlign: {
				_id: '',
				title: '',
				doctor: '',
				country: '',
				language: '',
				flash: '',
				year: '',
				summary: ''
			}
    }
	},
	created () {
		if (this.$route.params.id) this.moviesData()
	},
  components: {
	},
	methods: {
		moviesData () {
			let _this = this
			let params = {
				id: this.$route.params.id
			}
			Utils.post('movieById', params, (res) => {
				_this.formLabelAlign = res
			}, (res) => {
				this.errMsgOpen(res)
			})
		},
		errMsgOpen(msg) {
			const h = this.$createElement;
			this.$notify({
				title: '服务端错误',
				message: h('i', { style: 'color: teal'}, '服务挂啦！')
			});
		},
		onSubmit () {
			let params = this.formLabelAlign
			let _this = this
			Utils.post('creatNew', params, (res) => {
				_this.$router.push({
					name: 'movieDetail',
					params: {id: res.id}
				})
			}, (res) => {
				this.errMsgOpen(res)
			})
		}
	}
}
</script>

<style lang="less">
	.movieAdmin-box {
		margin-top: 50px;
		.preview-btn {
			display: block;
			margin-left: 80px;
		}
	}
	.el-form {
		width: 70%;
	}
</style>