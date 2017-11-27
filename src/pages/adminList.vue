<template>
  <div class="adminList-box">
		<el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="电影名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="doctor"
      label="导演"
      width="120">
    </el-table-column>
    <el-table-column
      prop="country"
      label="国家"
      width="120">
    </el-table-column>
		<el-table-column
      prop="language"
      label="语种"
      width="120">
    </el-table-column>
		<el-table-column
      prop="flash"
      label="视频地址"
      width="120">
    </el-table-column>
    <el-table-column
      prop="meta.createdAt"
      label="录入时间"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="goMovieDe(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click="goMovieAd(scope.row)" type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import axios from "axios";
import Utils from '@/assets/utils'
export default {
  name: 'adminList',
  data () {
    return {
			movies: [],
			tableData: []
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
				_this.tableData = res
			}, (res) => {
				this.errMsgOpen(res)
			})
		},
		errMsgOpen(msg) {
			const h = this.$createElement;
			this.$notify({
				title: '服务端错误',
				message: h('i', { style: 'color: teal'}, '好像是接口报错了呢！')
			});
    },
    goMovieDe (data) {
      this.$router.push({path: 'movieDetail/' + data._id})
    },
    goMovieAd (data) {
      this.$router.push({path: 'movieAdmin/' + data._id})
    }
	}
}
</script>

<style lang="less">
	.adminList-box {
		margin-top: 50px;
	}
  .el-table th { text-align: center;}
  a {
    color: #409EFF;
  }
</style>
