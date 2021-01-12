<template>
    <div class="OuterWrapper">
        <div class="InnerWrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.OuterWrapper{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .InnerWrapper{
    height: ~"calc(100vh - 190px)";
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .title{
    text-align: center;
  }
}
</style>