import Home from '@/views/Home.vue'

export const routerMap = [
  {
    path: '/home',
    component: ()=>import('_v/LayOut.vue'),
    name: 'home',
    meta: {
      icon: 'md-home',
      title: '首页'
    },
    children: [
      {
        path: 'home_index',
        name: 'home_index',
        meta: {
          icon: 'ios-arrow-forward',
          title: '关于系统'
        },
        component: Home
      },
      {
        path: 'counter',
        name: 'counter',
        meta: {
          icon: 'ios-arrow-forward',
          title: '收银台'
        },
        component: ()=>import('_v/counter/counter.vue')
      }
    ]
  },
  {
    path: '/money',
    component: ()=>import('_v/LayOut.vue'),
    name: 'money',
    meta: {
      icon: 'md-pie',
      title: '资金管理'
    },
    children: [
      {
        path: 'moneyAnalyse',
        name: 'moneyAnalyse',
        meta: {
          icon: 'ios-arrow-forward',
          title: '销售分析'
        },
        component: ()=>import('_v/money/moneyAnalyse.vue')
      }
    ]
  },
  {
    path: '/product',
    component: ()=>import('_v/LayOut.vue'),
    name: 'product',
    meta: {
      icon: 'md-basket',
      title: '商品管理'
    },
    children: [
      {
        path: 'productList',
        name: 'productList',
        meta: {
          icon: 'ios-arrow-forward',
          title: '商品列表'
        },
        component: ()=>import('_v/product/productList.vue')
      },{
        path: 'productAdd',
        name: 'productAdd',
        meta: {
          icon: 'ios-arrow-forward',
          title: '新添商品'
        },
        component: ()=>import('_v/product/productAdd.vue')
      }
    ]
  },
  {
    path: '/inventory',
    component: ()=>import('_v/LayOut.vue'),
    name: 'inventory',
    meta: {
      icon: 'md-cube',
      title: '库存管理'
    },
    children: [
      {
        path: 'inventoryList',
        name: 'inventoryList',
        meta: {
          icon: 'ios-arrow-forward',
          title: '库存列表'
        },
        component: ()=>import('_v/inventory/inventoryList.vue')
      },{
        path: 'inventoryDiscard',
        name: 'inventoryDiscard',
        meta: {
          icon: 'ios-arrow-forward',
          title: '商品报销'
        },
        component: ()=>import('_v/inventory/inventoryDiscard.vue')
      }
    ]
  },
  {
    path: '/vip',
    component: ()=>import('_v/LayOut.vue'),
    name: 'vip',
    meta: {
      icon: 'logo-vimeo',
      title: '会员管理'
    },
    children: [
      {
        path: 'vipList',
        name: 'vipList',
        meta: {
          icon: 'ios-arrow-forward',
          title: '会员列表'
        },
        component: ()=>import('_v/vip/vipList')
      },{
        path: 'vipAdd',
        name: 'vipAdd',
        meta: {
          icon: 'ios-arrow-forward',
          title: '新添会员'
        },
        component: ()=>import('_v/vip/vipAdd.vue')
      }
    ]
  },
  {
    path: '/manager',
    component: ()=>import('_v/LayOut.vue'),
    name: 'manager',
    meta: {
      icon: 'md-contact',
      title: '管理员管理'
    },
    children: [
      {
        path: 'managerList',
        name: 'managerList',
        meta: {
          icon: 'ios-arrow-forward',
          title: '管理员列表'
        },
        component: ()=>import('_v/manager/managerList.vue')
      },{
        path: 'managerAdd',
        name: 'managerAdd',
        meta: {
          icon: 'ios-arrow-forward',
          title: '新添管理员'
        },
        component: ()=>import('_v/manager/managerAdd.vue')
      }
    ]
  },
  {
    path: '/order',
    component: ()=>import('_v/LayOut.vue'),
    name: 'order',
    meta: {
      icon: 'ios-list-box',
      title: '订单管理'
    },
    children: [
      {
        path: 'orderList',
        name: 'orderList',
        meta: {
          icon: 'ios-arrow-forward',
          title: '查看订单'
        },
        component: ()=>import('_v/order/orderList.vue')
      }
    ]
  },
  {
    path: '/Test',
    component: ()=>import('_v/LayOut.vue'),
    name: 'Test',
    meta: {
      icon: 'ios-build',
      title: '测试'
    },
    children: [
      {
        meta: {
          icon: 'ios-arrow-forward',
          title: 'table'
        },
        name: 'table',
        path: 'table',
        component: ()=>import('_v/table.vue')
      },
      {
        path: 'test',
        component: ()=>import('_v/Test.vue'),
        name: 'test',
        meta: {
          icon: 'ios-arrow-forward',
          title: 'test'
        }
      },
      {
        path: 'params/:id',
        name: 'params',
        props: true,
        component: ()=>import('_v/argu.vue'),
        meta: {
          icon: 'ios-arrow-forward',
          title: '参数'
        }
      },{
        path: 'upload/:id',
        name: 'upload',
        props: true,
        component: ()=>import('_v/upload.vue'),
        meta: {
          icon: 'ios-arrow-forward',
          title: '文件上传'
        }
      }
    ]
  }
]

export const routes = [
   {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: ()=>import('_v/login.vue')
  },
  {
    path: '*',
    component: () => import('_v/error_404.vue')
  }
]
