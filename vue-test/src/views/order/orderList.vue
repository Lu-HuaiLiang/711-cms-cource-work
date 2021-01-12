<template>
    <div>
        <Table border :columns="columns1" :data="list">
        <template slot-scope="{ row }" slot="orderId">
            <strong>{{ row.orderId }}</strong>
        </template>

        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">查看详情</Button>
            <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
        </template>
        </Table>
        
        <Drawer
            title="查看详情"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
        <Col span="24">
            <Table border :columns="columns2" :data="products">
            <template slot-scope="{ row }" slot="productId">
                <strong>{{ row.productId }}</strong>
            </template>

            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
                <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
            </template>
            </Table>
        </Col>
        <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
            <!-- <Button type="primary" @click="alterInfo('formData')">提交修改</Button> -->
        </div>
        </Drawer>    
    </div>
</template>
<script>
import {getAllOrder,getOneOrder} from '@/api/order'
import {clone} from 'lodash'
export default {
    data () {
        return {
            columns1: [
                {
                    title: '订单编号',
                    slot: 'orderId'
                },
                {
                    title: '订单日期',
                    key: 'orderDay'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 200,
                    align: 'center'
                }
            ],

            columns2: [
                {
                    title: '商品编号',
                    slot: 'productId'
                },
                {
                    title: '商品名称',
                    key: 'productName'
                },
                {
                    title: '购买数量',
                    key: 'productNumber'
                },
                {
                    title: '单价',
                    key: 'productNumber'
                }
            ],
            products: [],
            list: [],
            value3: false,
            show_index: 0,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formData: {
                username: '',
                phone: '',
                credit: 0,
            },
            ruleValidate: {
                username: [
                    { required: true, message: '会员名字不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '电话号码不能为空', trigger: 'blur' },
                    { pattern:/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/, message: '电话号码格式不正确', trigger: 'blur' }
                ]
            }
        }
    },

    async mounted(){
        let _ = this
        await getAllOrder().then(res=>{
            _.list = res.data.list
        })
    },

    methods: {
        async show (index) {
            this.value3 = true
            let orderId = this.list[index].orderId, _ = this
            await getOneOrder(orderId).then(res=>{
                _.products = res.data.list
            })
        },

        // async Info(name) {
        //     let _ = this
        //     let index = this.show_index
        //     let phone = this.list[index].phone
        //     this.$refs[name].validate(async (valid) => {
        //         if (valid) {
        //             // await getAllOrder(this.formData,phone).then(res=>{
        //             //     if (res.code === 200) this.$Message.success(res.msg);
        //             //     else this.$Message.error(res.msg);
        //             // })
        //             await getAllOrder().then(res=>{
        //                 _.list = res.data.list
        //             })
        //         } else this.$Message.error('参数错误!');
        //     })
        //     this.value3 = !this.value3
        // },

        // async remove (index) {
        //     let phone = this.list[index].phone
        //     this.list.splice(index, 1)
        //     await deleteMember(phone).then(res=>{
        //         if (res.code === 200) this.$Message.success(res.msg);
        //         else this.$Message.error(res.msg);
        //     })
        // }
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