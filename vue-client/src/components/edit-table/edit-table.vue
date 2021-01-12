<template>
    <Table border :columns="columns" :data="data"></Table>
</template>

<script>
export default {
    name: 'EditTable',
    props: {
        columns: {
            type: Array,
            default: ()=>[]
        },
        data: {
            type: Array,
            default: ()=>[]
        }
    }
}
</script>

<style lang="less" scoped>

</style>