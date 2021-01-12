<template>
    <div>
    <div  style="margin-bottom: 20px;">
        <Button @click="value3 = true" type="primary"> 商品报销 </Button>
    </div>
    <Table border :columns="columns" :data="list">
        <template slot-scope="{ row }" slot="productId">
            <strong>{{ row.productId }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
        </template>
    </Table>
    <Drawer
            title="商品报销"
            v-model="value3"
            width="360"
            :mask-closable="false"
            :styles="styles"
        >
        <Col span="24">
        <Form style="margin-top:20px;"  ref="formValidate" :model="formValidate" :rules="ruleValidate" >
            <FormItem label="商品编号" prop="productId">
                <Input v-model="formValidate.productId" placeholder=""></Input>
            </FormItem>
            <FormItem label="商品报销数量" prop="productNumber">
                <InputNumber :max="999" :min="1" v-model="formValidate.discardNumber"></InputNumber>
            </FormItem>
        </Form>
        </Col>
          <div class="demo-drawer-footer">
                <Button style="margin-right: 8px" @click="value3 = false">取消</Button>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          </div>
    </Drawer> 
    </div>
</template>
<script>
import {createDiscard,getAllDiscard} from '@/api/discard'
export default {
    data () {
        return {
            list: [],
            columns: [
                {
                    title: '商品编号',
                    slot: 'productId',
                },
                {
                    title: '商品名称',
                    key: 'productName',
                },
                {
                    title: '商品成本',
                    key: 'productCost',
                },
                {
                    title: '报销数量',
                    key: 'discardNumber',
                },
                {
                    title: '报销日期',
                    key: 'date',
                },
            ],
            
            
            value3: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            formValidate: {
                productId:"",
                discardNumber:1
            },
            ruleValidate: {
                productId: [
                    { required: true, message: '商品编号不能为空！', trigger: 'blur' }
                ],
            }
        }
    },

    async mounted(){
        let _ = this
        await getAllDiscard().then(res=>{
            console.log(res.data.list)
            _.list = res.data.list
        })
    },

    methods: {
        handleSubmit (name) {
            let _ = this
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    await createDiscard(this.formValidate).then(res=>{
                        if (res.code == 200) this.$Message.success(res.msg);
                        else this.$Message.error(res.msg)
                    })
                    await getAllDiscard().then(res=>{
                        _.list = res.data.list
                    })
                    _.value3 = false
                } else {
                    this.$Message.error('参数错误！');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
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