<template>
   <div class="layout-wrapper">
        <Layout class="layout-outer">
            <Sider breakpoint="md" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="sider-wrapper">
                    
                    <Menu theme="dark"  ref="menu" :active-name="$route.name" :open-names="openNames" width="auto" @on-select="handleSelect">
                        <div class="layout-logo"></div>
                        <side-menu :parents="routers" />
                    </Menu>
            </Sider>
            <Layout>
                <Header class="header-wrapper"> 
                    <!-- <Icon :class="triggerClassess" @click.native="handleCollapsed" type="md-menu" :size="32"/> -->
                    <!-- <Button @click="turnTo">打开参数页</Button> -->
                    <div>
                        <Button @click="handleLogout">退出登录</Button>
                        
                        <div class="name">
                            <span v-if="role == '1'" class="tag red">#超级管理员</span>
                            <span v-else class="tag green">#普通管理员</span>
                            <!-- <span>{{username}}</span> -->
                            <div class="avatar">{{username}}</div>
                        </div>
                    </div>
                </Header>
                <Content class="content-wrapper">
                    <div id="tabs">
                        <Tabs type="card" @on-click="handleClickTab" :animated="false" :value="getTabNameByRoute($route)">
                            <TabPane :label="labelRender(item)" :name="getTabNameByRoute(item)" v-for="(item,index) in tabs" :key="`tabNav${index}`"  />
                        </Tabs>
                    </div>
                    <Card dis-hover class="page-card">
                        <router-view/>
                    </Card>
                </Content>
            </Layout>            
        </Layout>
   </div>
</template>

<script>
import store from '@/store'
import sideMenu from '../components/side-menu.vue'
import Table from './table.vue'
import {mapState,mapActions,mapMutations } from 'vuex'
import {getTabNameByRoute,getRouteById,getOpenArrByName} from '@/lib/util.js'
export default {
  components: { sideMenu, Table },
    name: 'LayOut',
    data(){
        return{
            username: localStorage.getItem('username'),
            role: localStorage.getItem('role'),
            isCollapsed: false,
            getTabNameByRoute
        }
    },
    mounted(){

    },

    watch: {
        // '$route' (newRoute) {
        //     // console.log(newRoute)
        //     this.UPDATE_ROUTER(newRoute)
        // },
        openNames (){
            this.$nextTick(()=>{
                this.$refs.menu.updateOpened()
            })
        }
    },

    computed:{
        ...mapState({
            routers: state => state.router.routers.filter(item=>{
                return item.path !== '*' && item.name !== 'login'
            }),
            tabs: state => state.tabNav.tabs
        }),
        // triggerClassess(){
        //     return [
        //         'icon-collapsed',
        //         this.isCollapsed ? 'rotate' : ''
        //     ]
        // },
        openNames(){
            return getOpenArrByName(this.$route.name,this.routers)
        }
    },

    methods: {
        ...mapActions([
            'logout',
            'handleRemove'
        ]),
        ...mapMutations([
            'UPDATE_ROUTER',
            'CLEAR_TAB'
        ]),
        handleSelect(name){
            // this.tabs.push(name)
            this.$router.push({
                name
            })
        },
        // handleCollapsed(){
        //     this.isCollapsed = !this.isCollapsed
        // },
        handleClickTab(id){
            console.log(id)
            let route = getRouteById(id)
            this.$router.push(route)
        },
        handleLogout () {
            this.logout()
            this.$router.push({
                name: 'login'
            })
        },
        turnTo (){
            let id = 'params' + (Math.random() * 100).toFixed(0)
            this.$router.push({
                name: 'params',
                params: {id}
            })
        },
        handleTabRemove(id,event){
            event.stopPropagation()
            console.log(id)
            this.handleRemove({
                id,
                $route: this.$route
            }).then(nextRoute=>{
                this.$router.push(nextRoute)
            })
        },
        labelRender(item){
            return  h=>{
                return (
                    <div style="width:100%;">
                        <span class="title">{item.meta.title}</span>
                        <icon  nativeOn-click={this.handleTabRemove.bind(this,getTabNameByRoute(item))} style="" type="md-close-circle"/>
                    </div>
                )
            }
        }
    }
}
</script>

<style lang="less" >
.avatar {
    display:inline-block;
    background: #001528; 
    width:35px; 
    height: 35px;
    line-height:35px; 
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    color: white;
    border-radius: 50%;
    cursor: pointer;
    
}

.layout-outer,.layout-wrapper{
    height: 100%;
    .header-wrapper{
        background: white;
        box-shadow: 0 1px 1px rgba(0,0,0,0.1) ;
        padding: 0 23px;
        // .icon-collapsed{
        //     cursor: pointer;
        //     vertical-align: -0.27em !important;
        //     transition: transform .3s ease;
        //     &.rotate{
        //         transform: rotateZ(-180deg);
        //         transition: transform .3s ease;
        //     }
        // }
    }
    .content-wrapper{
        padding: 10px;
        .ivu-tabs-bar{
            border: none;
            margin-bottom: 0;
            .ivu-tabs-nav-container {
                line-height: 1.56;
                font-size: 14px;
            }
            .ivu-tabs-tab-active {
                font-weight: bold;
            }
            .ivu-icon{
                margin-right: 0px;
                margin-left: 7px;
            }        
        }        
        .ivu-card{
            border-radius: 0px;
        }
    }
    
    .sider-wrapper{
        background: #e94820;
        background: #001528;
        overflow: hidden;
        height: 100%;

        .layout-logo{
            height: 64px;
            background: #e94820;
            background: url("../static/image/logo.png") no-repeat fixed;
            background-size: 200px 64px;
        }
        .ivu-layout-sider-children {
            overflow-y: scroll;
            overflow-x: hidden;  
            margin-right: -20px;  
        }
    }
    .page-card{
        min-height: ~"calc(100vh - 120px)";
    }

    .name {
        float:right; font-size: 23px; font-weight:400;
    }

    .tag{
    //   width: 100%;
    //   background: red;
    //   padding: 5px;;
      font-size: 15px; 
      text-align: center;
      font-weight: 600;
      margin-right: 12px;
    }

    .red {
        color: red;
    }

    .green {
        color: green;
    }

    
}

</style>