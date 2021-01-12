<template>
    <div class="split-spane-wrapper" ref="outer">
        <div class="pane pane-left" :style="{width: leftOffSetPercent}"></div>
        <div class="pane-trigger-con" @mousedown="handleMouseDown" :style="{left: triggerLeft,width: `${triggerWidth}px`}"></div>
        <div class="pane pane-right" :style="{left: leftOffSetPercent}"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            leftOffSet: 0.3,
            triggerWidth: 8,
            canMove: false,
            initLeft:0
        }
    },
    computed:{
        leftOffSetPercent(){
            return `${this.leftOffSet*100}%`
        },
        triggerLeft(){    
            return `calc(${this.leftOffSetPercent} - ${this.triggerWidth/2}px)`
        }
    },
    methods: {
        handleMouseDown(event){
            document.addEventListener('mousemove',this.handleMouseMove)
            document.addEventListener('mouseup',this.handleMouseUp)
            this.initLeft = event.pageX-event.srcElement.getBoundingClientRect().left
            this.canMove = true
        },
        handleMouseMove(event){
            if (!this.canMove) return
            let rect = this.$refs.outer.getBoundingClientRect()
            this.leftOffSet = (event.pageX-this.initLeft+this.triggerWidth/2-rect.left)/rect.width    
        },
        handleMouseUp(){
            this.canMove = false
        }
    }
}
</script>


<style lang="less" scoped>
.split-spane-wrapper{
    width: 450px;
    height: 300px;
    position: relative;
    .pane {
        height: 100%;
        &-left {
            position: absolute;
            background: palevioletred;
        }
        &-right {
            right: 0;
            bottom: 0;
            position: absolute;
            background: palegreen;
            left: 40%;
        }
        &-trigger-con {
            background: brown;
            height: 100%;
            z-index: 2;
            position: absolute;
            top: 0;
        }
    }
}
</style>