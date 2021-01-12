<template>
    <Row style="margin-top:20px;">
        
        <Col span='8' offset="1">
            <h1 style="margin-left:100px;">新添商品</h1>
            <Form style="margin-top:20px;"  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
            
            <FormItem label="商品编号" prop="productId">
                <Input v-model="formValidate.productId" placeholder=""></Input>
            </FormItem>
            <FormItem label="商品名称" prop="productName">
                <Input v-model="formValidate.productName" placeholder=""></Input>
            </FormItem>
            <FormItem label="商品类别" prop="productKind">
                <Input v-model="formValidate.productKind" placeholder=""></Input>
            </FormItem>
            <FormItem label="商品品牌" prop="productBrand">
                <Input v-model="formValidate.productBrand" placeholder=""></Input>
            </FormItem>
            <FormItem label="商品到岸价" prop="productCost">
                <InputNumber :max="999" :min="1" v-model="formValidate.productCost"></InputNumber>
            </FormItem>
            <FormItem label="商品普通价" prop="productPrice">
                <InputNumber :max="999" :min="1" v-model="formValidate.productPrice"></InputNumber>
            </FormItem>
            <FormItem label="商品会员价" prop="productVipPrice">
                <InputNumber :max="999" :min="1" v-model="formValidate.productVipPrice"></InputNumber>
            </FormItem>
            <FormItem label="初始化数量" prop="productNumber">
                <InputNumber :max="999" :min="0" v-model="formValidate.productNumber"></InputNumber>
                <!-- <Input v-model="formValidate.productNumber" placeholder=""></Input> -->
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>

        </Form>
        </Col>
    </Row>
</template>
<script>
import {addProduct} from '@/api/product'
export default {
    data () {
        return {
            formValidate: {
                productId:"",
                productName:"",
                productKind:"",
                productBrand:"",
                productCost: 1,
                productPrice: 1,
                productVipPrice: 1,
                productNumber:0
            },
            ruleValidate: {
                // username: [
                //     { required: true, message: '姓名不能为空！', trigger: 'blur' }
                // ],
                // password: [
                //     { required: true, message: '密码不能为空！', trigger: 'blur' }
                // ],
                // phone: [
                //     { required: true, message: '电话不能为空！', trigger: 'blur' }
                // ],
            }
        }
    },
    methods: {
        async handleSubmit (name) {
            await addProduct(this.formValidate).then((res)=>{
                    if (res.code == 200) {
                        console.log(res)
                        this.$Message.success(res.msg);   
                    } else {
                        this.$Message.error(res.msg);
                    }
            })
            // this.$refs[name].validate(async (valid) => {
            //     if (valid) {
               
            //         this.$Message.success('Success!');
            //     } else {
            //         this.$Message.error('Fail!');
            //     }
            // })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>
