<template>
  <div class="errMsg-box">
    <el-button
    plain
    @click="open">
    可自动关闭
  </el-button>
  </div>
</template>

<script>
import axios from "axios";
import Utils from '@/assets/utils'
export default {
  name: 'movieAdmin',
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
			})
		}
	}
}
</script>

<style lang="less">
	
</style>
