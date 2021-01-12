<template>
    <div>
            <Table border :columns="columns12" :data="list">
        <template slot-scope="{ row }" slot="productId">
            <strong>{{ row.productId }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
        </template>
    </Table>
    <Drawer
            title="修改库存数量"
            v-model="value3"
            width="360"
            :mask-closable="false"
            :styles="styles"
        >
        <Col span="24">
            <Form ref="formData" :rules="ruleValidate" :model="formData">
                <FormItem label="数量改为" prop="username">
                    <InputNumber :max="999" :min="1" v-model="formData.productNumber"></InputNumber>
                </FormItem>
            </Form>
        </Col>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="value3 = false">Cancel</Button>
            <Button type="primary" @click="alterInfo('formData')">提交修改</Button>
        </div>
    </Drawer> 
    </div>
</template>
<script>
import {clone} from 'lodash'
import {getAllInventory,AlterInventory} from '@/api/inventory'
export default {
    data () {
        return {
            columns12: [
                {
                    title: '商品编号',
                    slot: 'productId'
                },
                {
                    title: '商品名称',
                    key: 'productName'
                },
                {
                    title: '商品数量',
                    key: 'productNumber'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 200,
                    align: 'center'
                }
            ],
            list: [],
            value3: false,
            alter_index: 0,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                productNumber: 0,
            },
            ruleValidate: {
            
            }
        }
    },



    async mounted(){
        let _ = this
        await getAllInventory().then(res=>{
            console.log(res.data.list)
            _.list = res.data.list
        })
    },

    methods: {
        show (index) {
            this.value3 = true
            this.formData = clone(this.list[index])
            console.log(this.list[index])
            this.alter_index = index
        },

        async alterInfo(name) {
            let _ = this
            let index = this.alter_index
            let productId = this.list[index].productId
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    await AlterInventory(productId,this.formData.productNumber).then(res=>{
                        if (res.code === 200) this.$Message.success(res.msg);
                        else this.$Message.error(res.msg);
                    })
                    await getAllInventory().then(res=>{
                        _.list = res.data.list
                    })
                } else this.$Message.error('参数错误!');
            })
            this.value3 = !this.value3
        },

        remove (index) {
            this.productList.splice(index, 1);
        }
    }
}
</script>

<style>
    .demo-drawer-footer{
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-top: 1px solid #e8e8e8;
        padding: 10px 16px;
        text-align: right;
        background: #fff;
    }
</style>