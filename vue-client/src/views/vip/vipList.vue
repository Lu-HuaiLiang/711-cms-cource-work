<template>
    <div>
        <Table border :columns="columns12" :data="list">
        <template slot-scope="{ row }" slot="username">
            <strong>{{ row.username }}</strong>
        </template>

        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
        </Table>
        
        <!-- <Button @click="value3 = true" type="primary">Create</Button> -->
        <Drawer
            title="编辑"
            v-model="value3"
            width="360"
            :mask-closable="false"
            :styles="styles"
        >
        <Col span="24">
            <Form ref="formData" :rules="ruleValidate" :model="formData">
                <FormItem prop="username" label="会员名称" label-position="top">
                    <Input v-model="formData.username" placeholder="please enter user name" />
                </FormItem>    
                <FormItem prop="phone" label="会员电话" label-position="top">
                    <Input v-model="formData.phone" placeholder="please enter user name" />
                </FormItem>
                <FormItem label="会员积分" label-position="top">
                    <InputNumber :max="999" :min="0" v-model="formData.credit"></InputNumber>
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
import {getAllMember,deleteMember,alterMember} from '@/api/member'
import {clone} from 'lodash'
export default {
    data () {
        return {
            columns12: [
                {
                    title: '会员名称',
                    slot: 'username'
                },
                {
                    title: '会员电话',
                    key: 'phone'
                },
                {
                    title: '会员积分',
                    key: 'credit'
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
        await getAllMember().then(res=>{
            _.list = res.data.list
        })
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
            let phone = this.list[index].phone
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    await alterMember(this.formData,phone).then(res=>{
                        if (res.code === 200) this.$Message.success(res.msg);
                        else this.$Message.error(res.msg);
                    })
                    await getAllMember().then(res=>{
                        _.list = res.data.list
                    })
                } else this.$Message.error('参数错误!');
            })
            this.value3 = !this.value3
        },

        async remove (index) {
            let phone = this.list[index].phone
            this.list.splice(index, 1)
            await deleteMember(phone).then(res=>{
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