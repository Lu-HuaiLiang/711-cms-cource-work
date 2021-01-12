<template>
    <Row style="margin-top:20px;">
        <h1 style="margin-left:109px;">新添管理员</h1>
        <Col span='12' offset="0">
            <Form style="margin-top:20px;"  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="姓名" prop="username">
                <Input v-model="formValidate.username" placeholder=""></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
                <Input v-model="formValidate.password" placeholder=""></Input>
            </FormItem>
            <FormItem label="手机号" prop="phone">
                <Input v-model="formValidate.phone" placeholder=""></Input>
            </FormItem>
            <FormItem label="权限" prop="role">
                <RadioGroup v-model="formValidate.role">
                    <Radio label="0">普通店员</Radio>
                    <Radio label="1">超级管理员</Radio>
                </RadioGroup>
            </FormItem>
                
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
        </Col>
    </Row>
</template>
<script>
import {register} from '@/api/administrators'
export default {
    data () {
        return {
            formValidate: {
                username: '',
                password: '',
                phone: '',
                role: '0'
            },
            ruleValidate: {
                username: [
                    { required: true, message: '名字不能为空不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                // phone: [
                //     { required: true, message: '电话号码不能为空', trigger: 'blur' },
                //     { pattern:/^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/, message: '电话号码格式不正确', trigger: 'blur' }
                // ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate(async(valid) => {
                if (valid) {
                    await register(this.formValidate).then((res)=>{
                        if (res.code == 200) {
                            // console.log(res)
                            this.$Message.success(res.msg);   
                        } else {
                            console.log(res)
                            this.$Message.error(res.msg[0]);
                        }
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