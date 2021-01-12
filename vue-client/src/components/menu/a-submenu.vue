<template>
    <ul class="a-submenu">
        <div @click="handleClick" class="a-submenu-title">
            <slot name="title"></slot>
            <span class="shrink-icon" :style="{transform: `rotateZ(${showChild?0:180}deg)`}">></span>
        </div>
        <div v-show="showChild" class="a-submenu-child-box">
            <slot></slot>
        </div>
    </ul> 
</template>

<script>
export default {
    name: 'ASubmenu',
    data () {
        return {
            showChild: false
        }
    },
    methods: {
        handleClick () {
            this.showChild = !this.showChild
        }
    }
}
</script>

<style lang="less" >
.a-submenu{
    background: peru;
    &-title{
        position: relative;
        .shrink-icon{
            position: absolute;
            top: 0;
            right: 10px;
        }
    }
    &-child-box{
        overflow: hidden;
        padding-left: 20px;
    }
    li {
        background: peru;
    }
    
}
</style>