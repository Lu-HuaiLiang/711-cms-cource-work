<template>
    <edit-table :columns="columns" :data="tableData"></edit-table>
</template>

<script>
import { getTableData } from '@/api/data'
import editTable from '../components/edit-table/edit-table.vue'
export default {
    components: { editTable },
    data(){
        return{
            tableData: [],
            columns: [
                {key:'name',title:'姓名',editable: true},
                {key:'age',title:'年龄',editable: true},
                {key:'email',title:'邮箱',editable: true},
            ]
        }
    },
    mounted(){
        getTableData().then(res=>{
            this.tableData = res
        }) 
    }
}
</script>

<style lang="less" scoped>

</style>