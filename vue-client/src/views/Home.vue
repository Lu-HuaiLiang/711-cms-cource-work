<template>
  <center>
    <div style="">
      <img src="@/static/image/logo2.png" class="logo"></div>
    </div>
  
    <h1 style="color:#037d56; margin-top:20px;">超市后台管理系统</h1>
    <div style="margin-top:5px;" class="title">小组成员: 猪翔发,站楷全,五赢,Tom</div>
  </center>
</template>

<script>
import Center from '../components/center.vue'
export default {

  name: 'Home',
  components: {
    Center
  }
}
</script>

<style lang="less" scoped>
  .logo{
    width: 150px;
    height: 150px;
  }
</style>
