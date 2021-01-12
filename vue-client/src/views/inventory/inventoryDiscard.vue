<template>
    <Row style="margin-top:20px;">
        <h1 style="margin-left:109px;">商品报销</h1>
        <Col span='12' offset="0">
            <Form style="margin-top:20px;"  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
            
            <FormItem label="商品编号" prop="productId">
                <Input v-model="formValidate.productId" placeholder=""></Input>
            </FormItem>

            <FormItem label="商品报销数量" prop="productNumber">
                <InputNumber :max="999" :min="1" v-model="formValidate.discardNumber"></InputNumber>
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
import {createDiscard} from '@/api/discard'
export default {
    data () {
        return {
            formValidate: {
                productId:"",
                discardNumber:1
            },
            ruleValidate: {
                productId: [
                    { required: true, message: '商品编号不能为空！', trigger: 'blur' }
                ],
                // productNumber: [
                //     { required: true, message: '密码不能为空！', trigger: 'blur' }
                // ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    await createDiscard(this.formValidate).then(res=>{
                        console.log(res)
                        if (res.code == 200) this.$Message.success(res.msg);
                        else this.$Message.error(res.msg)
                    })
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
