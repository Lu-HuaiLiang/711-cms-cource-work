<template>
    <!-- <v-chart theme="ovilia-green" :options="polar"/> -->
    <!-- <div id="container" ref="chart"></div> -->
    <div>
    <Row type="flex" justify="space-around" style="margin-bottom: 30px;">
        <Col span="5" >
                <Card style="width:100%">
                    <p slot="title">
                    <!-- <Icon type="ios-film-outline"></Icon> -->
                        本月的销售额
                    </p>
                    <div style="text-align:center">
                        <h3>+ {{salePrice}}元</h3>
                    </div>
                </Card>
        </Col>
        <Col  span="5" >
            <Card style="width:100%">
                <p slot="title">
                    <!-- <Icon type="ios-film-outline"></Icon> -->
                    
                    本月的成本
                </p>
                <div style="text-align:center">

                        <h3>- {{saleCost}}元</h3>
                </div>
            </Card>
        </Col>
        <Col span="5" >
            <Card style="width:100%">
                <p slot="title">
                    <!-- <Icon type="ios-film-outline"></Icon> -->
                    本月的报销
                </p>
                 <div style="text-align:center">
        
                        <h3>- {{discardMoney}}元</h3>
                </div>
            </Card>
        </Col>

        <Col span="5" >
            <Card style="width:100%">
                <p slot="title">
                    <!-- <Icon type="ios-film-outline"></Icon> -->
                    本月的利润
                </p>
                <div style="text-align:center">
             
                        <h3>= {{profit}}元</h3>
                </div>
            </Card>
        </Col>
    </Row>

    <Row>
        <Col span="6">
            <Card dis-hover>
                <p slot="title">
                    <Icon type="md-clipboard"></Icon>
                    输入日期区间
                </p>
                <Form :model="formItem" :label-width="0">
                    <FormItem label="">
                        <Row>
                        <Col span="11">
                            <DatePicker type="date" placeholder="Select date" v-model="formItem.date1"></DatePicker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <DatePicker type="date" placeholder="Select date" v-model="formItem.date2"></DatePicker>
                        </Col>
                        </Row>
                      
                    </FormItem>
                      <FormItem label-position="top"  label="">
                            <Select v-model="formItem.Kind" placeholder="根据啥，看销售情况">
                                <Option value="productName">根据啥商品名称，看销售情况</Option>
                                <Option value="productKind">根据商品类别，看销售情况</Option>
                                <Option value="productBrand">根据商品品牌，看销售情况</Option>
                                <Option value="all">盈亏表</Option>
                            </Select>
                        </FormItem>
                    <FormItem>
                        <Button long type="primary" @click="handleSubmit">提交</Button>
                        <!-- <Button @click="handleReset" style="margin-left: 8px">重置</Button> -->
                    </FormItem>
                </Form>
            </Card>
        </Col>
        <Col span="17" offset="1">
           <Card dis-hover>
                <p slot="title">
                    <Icon type="md-trending-up"></Icon>
                    销售情况
                </p>
                <Table :columns="columns" :data="list"></Table>
            </Card>
        </Col>
    </Row>
    </div>
</template>

<script>

import {getBestSaleByName,getMonthSale} from '@/api/money'
const moment = require('moment');
export default {
    data () {
        return {
            formItem: {
                date1: '',
                date2: '',
                Kind: ''
            },
            list: [],
            columns: [],
            salePrice: 0, 
            saleCost: 0, 
            discardMoney:0, 
            profit: 0
        }
    },

    async mounted(){
        let _ = this
        await getMonthSale().then(res=>{
            let {salePrice, saleCost, discardMoney, profit} = res.data
            _.salePrice = salePrice,
            _.saleCost = saleCost
            _.discardMoney = discardMoney
            _.profit = profit
        })
    },
    methods: {
        async handleSubmit(){
            let _ = this
            let date1 = this.formItem.date1, 
            date2 = this.formItem.date2,
            Kind = this.formItem.Kind
            if (!Kind) {
                this.$Message.error('请选择类型');
            } else if (!date1 || !date2) {
                this.$Message.error('请选择日期');
            } else if (date1 > date2) {
                this.$Message.error('日期1不能大于日期2');
            } else {
                await getBestSaleByName(date1,date2,Kind).then(res=>{
                    _.list = res.data.sales
                    _.columns = res.data.columns
                    console.log(res)
                    this.$Message.success('查询成功！');
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>