<template>

    <div>
        <Table border :columns="columns12" :data="list">
                <template slot-scope="{ row }" slot="productId">
                    <strong>{{ row.productId }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
                    <Button type="error" size="small" @click="remove(index)">删除</Button>
                </template>
        </Table>
        <Drawer
            title="编辑"
            v-model="value3"
            width="360"
            :mask-closable="false"
            :styles="styles"
        >
        <Col span="24">
            <Form ref="formData" :model="formData">
                <FormItem label="商品名称" prop="productName">
                    <Input v-model="formData.productName" placeholder=""></Input>
                </FormItem>
                <FormItem label="商品类别" prop="productKind">
                    <Input v-model="formData.productKind" placeholder=""></Input>
                </FormItem>
                
                <FormItem label="商品品牌" prop="productBrand">
                    <Input v-model="formData.productBrand" placeholder=""></Input>
                </FormItem>

                <FormItem label="商品到岸价" prop="productCost">
                    <InputNumber :max="999" :min="1" v-model="formData.productCost"></InputNumber>
                </FormItem>
                    
                <FormItem label="商品普通价" prop="productPrice">
                    <InputNumber :max="999" :min="1" v-model="formData.productPrice"></InputNumber>
                </FormItem>

                <FormItem label="商品会员价" prop="productVipPrice">
                    <InputNumber :max="999" :min="1" v-model="formData.productVipPrice"></InputNumber>
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
import {getAllProduct,DeleteProduct,UpdateProduct} from '@/api/product'
import {clone} from 'lodash'
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
                    title: '品牌',
                    key: 'productBrand'
                },
                {
                    title: '类别',
                    key: 'productKind'
                },
                {
                    title: '到岸价',
                    key: 'productCost'
                },
                {
                    title: '普通价',
                    key: 'productPrice'
                },
                {
                    title: '会员价',
                    key: 'productVipPrice'
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
            formData: {}
        }
    },



    async mounted(){
        let _ = this
        await getAllProduct().then(res=>{
            console.log(res.data.list)
            _.list = res.data.list
        })
    },

    methods: {
        show (index) {
            this.value3 = true
            this.formData = clone(this.list[index])
            delete this.formData.productId
            this.alter_index = index
        },

        async alterInfo(name) {
            let _ = this
            let index = this.alter_index
            let productId = this.list[index].productId
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    await UpdateProduct(this.formData,productId).then(res=>{
                        if (res.code === 200) this.$Message.success(res.msg);
                        else this.$Message.error(res.msg);
                        this.value3 = !this.value3
                    })
                    await getAllProduct().then(res=>{
                        _.list = res.data.list
                    })
                } else this.$Message.error('参数错误!');
            })
        },
        async remove (index) {
            let productId = this.list[index].productId
            this.list.splice(index, 1)
            await DeleteProduct(productId).then(res=>{
                if (res.code === 200) this.$Message.success(res.msg);
                else this.$Message.error(res.msg);
            })
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