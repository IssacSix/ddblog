<template>
  <div class="movieAdmin-box">
    <h2>时尚国内外，好莱坞巨资大片</h2>
    <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in movies" :key="index">
					<a class="movie-link" :href="'#/movieDetail/' + item._id">
						<div class="grid-content bg-purple">
							<span>著名导演：{{ item.doctor ? item.doctor : '无名' }}</span>	
							<el-button type="primary" class="preview-btn">点击观看</el-button>
						</div>
					</a>
				</el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import Utils from '@/assets/utils'
export default {
  name: 'adminList',
  data () {
    return {
			movies: []
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
			Utils.get('movieList', {}, (res) =>{
				_this.movies = res
				console.log(_this.movies)
			}, (res) => {
				this.errMsgOpen(res)
			})
		},
		errMsgOpen(msg) {
			const h = this.$createElement;
			this.$notify({
				title: '服务端错误',
				message: h('i', { style: 'color: teal'}, '服务挂啦')
			});
		}
	}
}
</script>

<style lang="less">
	.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
		background: #d3dce6;
		cursor: pointer;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
	}
	.preview-btn {
		display: block;
		margin: 0 auto;
	}
	.el-main { line-height: 120px;}
	.grid-content { padding-bottom: 10px;}
	.el-col-6 {
		margin: 10px 0;
	}
</style>
