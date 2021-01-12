<template>
    <div class="MainWrapper">
        <Form class="FormWrapper" ref="formInline" :model="formInline" :rules="ruleInline" >
            <div class="ItemWrapper">
                <FormItem prop="username">
                <Input class="NameInput" type="text" v-model="formInline.username" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="Password">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem class="Btn">
                    <Button long type="primary" @click="handleSubmit">登录</Button>
                </FormItem>
            </div>
        </Form>
    </div>

    <!-- <div>
        <input type="text" v-model="userName"/>
        <input type="password" v-model="password">
        <button @click="handleSubmit">登录</button>
        <button @click="getInfo">请求数据</button>
    </div> -->
</template>

<script>
import {mapActions,mapMutations} from 'vuex'
import axios from 'axios'
import {getUserInfo} from '@/api/index'
import { getToken } from '@/lib/util'
export default {
    name: 'login',
    data () {
        return {
            formInline: {
                username: '',
                password: ''
            },
            ruleInline: {
                // username: [
                //     { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                // ],
                // password: [
                //     { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                //     { type: 'string', min: 3, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                // ]
            }   
        }
    },

    mounted(){
        this.CLEAR_TAB()
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        ...mapMutations([
            'CLEAR_TAB',
            'SET_USERNAME',
            'SET_ROLE'
        ]),
        handleSubmit() {
            let _ = this
            this.$refs['formInline'].validate(async (valid) => {
                if (valid) {
                    await this.login({
                          username:this.formInline.username,
                          password:this.formInline.password
                    }).then(res=>{
                        localStorage.setItem('username',res.data.username[0])
                        localStorage.setItem('role',res.data.role)
                        this.$Message.success(res.msg);
                        this.$router.push({name: 'home_index'})
                    }).catch(res=>{
                        this.$Message.error(res.msg);
                    })
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>

.MainWrapper{
    height: 100%;
    width: 100%;
    background: url("../static/image/IMG_0152.jpg") no-repeat fixed;
    background-attachment: fixed;
    background-origin: padding-box;
    background-position: bottom center;
    background-size: cover;
}
.FormWrapper{
    height: 100%;;
    display: flex;
    justify-content: center;
    align-items: center;
}
.ItemWrapper{
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1) ;
    background: white;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    padding: 50px 20px 10px 20px;
    height:  270px;
    width: 300px;
    text-align: center;
    .Btn{
        margin: 45px;
    }
    .NameInput{
        margin-bottom: 7px;
    }
}
</style>