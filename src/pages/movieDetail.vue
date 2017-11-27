<template>
  <div class="movieDetail-box">
    <el-row :gutter="20">
			<el-col :span="16">
				<h2 class="box-title">电影详情</h2>
				<h3 class="box-title-h3">名称：{{formLabelAlign.title ? formLabelAlign.title : '无名'}}</h3>
				<div class="vedio-box">
					<embed :src="formLabelAlign.flash" type="application/x-shockwave-flash" allowFullScreen="true" quality="high" width="720" height="400" align="middle">
				</div>
			</el-col>
			<el-col :span="8" class="detail-box">
				<ul class="detail-list">
					<li class="detail-list-title">导演：{{ formLabelAlign.doctor}}</li>
					<li class="detail-list-title">国家：{{ formLabelAlign.country}}</li>
					<li class="detail-list-title">语种：{{ formLabelAlign.language}}</li>
					<li class="detail-list-title">简介：{{ formLabelAlign.summary}}</li>
				</ul>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import axios from "axios"
import Utils from '@/assets/utils'
export default {
  name: 'movieDetail',
  data () {
    return {
			formLabelAlign: {
				id: '',
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
		this.moviesData()
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
		}
	}
}
</script>

<style lang="less">
	.movieDetail-box {
		.box-title {
			font-size: 30px;
		}
		.box-title,
		.box-title-h3 {
			line-height: 40px;
		}
		.detail-list-title {
			line-height: 40px;
		}
		.detail-box {
			padding-top: 140px; 
		}
	}
</style>