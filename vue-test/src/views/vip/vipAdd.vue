<template>
    <Row style="margin-top:20px;">
        <h1 style="margin-left:109px;">新添会员</h1>
        <Col span='12' offset="0">
            <Form style="margin-top:20px;"  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="姓名" prop="username">
                <Input v-model="formValidate.username" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem label="手机号" prop="phone">
                <Input v-model="formValidate.phone" placeholder="Enter something..."></Input>
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
import {createMember} from '@/api/member'
    export default {
        data () {
            return {
                formValidate: {
                    username: '',
                    phone: ''
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
        methods: {
            show (index) {
                this.value3 = true
                this.formData = clone(this.list[index])
                console.log(typeof this.list[index].credit)
                this.alter_index = index
            },

            async alterInfo(name) {
                let _ = this
                let index = this.alter_index
                let productId = this.list[index].productId
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        await alterMember(this.formData,productId).then(res=>{
                            if (res.code === 200) this.$Message.success(res.msg);
                            else this.$Message.error(res.msg);
                        })
                        await getAllMember().then(res=>{
                            _.list = res.data.list
                        })
                    } else this.$Message.error('参数错误!');
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate(async (valid) => {
                    if (valid) {
                        await createMember(this.formValidate).then((res)=>{
                            if (res.code == 200) {
                                console.log(res)
                                this.$Message.success(res.msg);   
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
                    } else {
                        this.$Message.error('参数错误!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>