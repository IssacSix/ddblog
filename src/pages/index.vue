<template>
  <div class="index-box">
    <h2 v-html='msg'></h2>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '你好 我是丁丁 <br> 欢迎来到我的blog'
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h2 {
    font-size: 30px;
    line-height: 80px;
  }
</style>
