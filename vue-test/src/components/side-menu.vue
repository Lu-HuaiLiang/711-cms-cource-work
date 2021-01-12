<template>
    <div>
        <template v-for="(item,index) in parents">
            <MenuItem v-if="!item.children" :name="item.name" :key="`sideMenu_${item.title}_${index}`">
                <Icon side="30" :type="item.meta.icon"></Icon>
                {{item.meta.title}}
            </MenuItem>
            <Submenu v-else :name="item.name" :key="`sideMenu_${item.title}_${index}`">
                <template slot="title">
                    <Icon side="30" :type="item.meta.icon"></Icon>
                    {{item.meta.title}}
                </template>
                <side-menu :parents="item.children"></side-menu>
            </Submenu>
        </template>
    </div>
</template>

<script>
export default {
    name:"SideMenu",
    props: {
        parents: {
            type: Array,
            default: ()=>[]
        }
    }
}
</script>

<style lang="less" scoped>

</style>