import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
if (process.env.NODE_ENV !== 'production') require('./mock')


// Bus 组件间的响应用
import Bus from '@/bus'
Vue.prototype.$bus = Bus

// 图表
// import ECharts from 'vue-echarts/components/ECharts.vue'
// Vue.component('v-chart', ECharts)

Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
