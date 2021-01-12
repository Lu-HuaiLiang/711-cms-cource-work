<template>
    <div class="menu-box">
        <!-- <a-menu>
            <a-menu-item>111</a-menu-item>
            <a-menu-item>222</a-menu-item>
            <a-submenu>
                <div slot="title">333</div>
                <a-menu-item>333-1</a-menu-item>
                <a-submenu>
                    <div slot="title">333-2</div>
                    <a-menu-item>333-2-1</a-menu-item>
                    <a-menu-item>333-2-2</a-menu-item>
                </a-submenu>
            </a-submenu>
        </a-menu> -->
        <a-menu>
            <template v-for="(item,index) in list">
                <a-menu-item v-if="!item.children" :key="`menu_item_${index}`">{{item.title}}</a-menu-item> 
                <re-submenu v-else :parents="item" :key="`menu_item_${index}`"></re-submenu>   
            </template> 
        </a-menu>
    </div>
</template>

<script>
import AMenuItem from '../components/menu/a-menu-item.vue'
import AMenu from '../components/menu/a-menu.vue'
import ASubmenu from '../components/menu/a-submenu.vue'
import ReSubmenu from './ReSubmenu.vue'
export default {
    name: 'MenuPage',
    components:{
        ASubmenu,
        AMenuItem,
        AMenu,
        ReSubmenu
    },
    data(){
        return {
            list: [
                {
                    title: '1',
                    icon: 'ios-alarm',
                    children: [
                        {
                            title: '3-1',
                            icon: 'ios-alarm'
                        },{
                            title: '3-2',
                            icon: 'ios-alarm',
                            children: [
                                {
                                    title: '3-2-1'
                                }
                            ]
                        }
                    ]
                },{
                    title: '2',
                    icon: 'ios-alarm'
                },{
                    title: '3',
                    icon: 'ios-alarm',
                    children: [
                        {
                            title: '3-1',
                            icon: 'ios-alarm'
                        },{
                            title: '3-2',
                            icon: 'ios-alarm',
                            children: [
                                {
                                    title: '3-2-1',
                                    icon: 'ios-alarm'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.menu-box {
    width: 300px;
    height:400px;
}
</style>