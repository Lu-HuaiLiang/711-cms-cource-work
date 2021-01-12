<template>
    <a-submenu>
        <div slot="title">{{parents.title}}</div>
        <template v-for="(item,index) in parents.children">
            <a-menu-item v-if="!item.children" :key="`reSubmenu_item_${index}`">{{item.title}}</a-menu-item>
            <re-submenu  v-else :key="`reSubmenu_item_${index}`" :parents="item"></re-submenu>
        </template>
    </a-submenu>
</template>

<script>
import AMenuItem from '../components/menu/a-menu-item.vue'
import aSubmenu from '../components/menu/a-submenu.vue'
export default {
    components: { aSubmenu, AMenuItem },
    name: 'ReSubmenu',
    props: {
        parents: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="less" scoped>

</style>