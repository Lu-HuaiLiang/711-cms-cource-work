<template>
  <div id="app">
    <router-view/> 
  </div>
</template>

<script>
import Test from '_v/Test.vue'
import LayOut from './views/LayOut.vue'
import MenuPage from './views/MenuPage'
import Table from './views/table.vue'
import {mapState,mapActions,mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    Test,
    MenuPage,
    LayOut,
    Table
  },
   watch: {
    '$route' (newRoute) {
        this.UPDATE_ROUTER(newRoute)
    }
  },
  methods: {
    ...mapMutations([
      'UPDATE_ROUTER'
    ])
  }
}
</script>

<style lang="less" >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
html,body{
  height: 100%;
}
body{
  margin: 0;
}
</style>
