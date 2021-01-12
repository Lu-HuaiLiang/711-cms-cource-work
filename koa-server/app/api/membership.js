const Router = require('koa-router')
const { ParameterException } = require('../../core/http-exception')
const router = new Router({
    prefix: '/membership'
})

const Membership = require('../models/membership')

// 生成新会员
router.post('/createMember', async (ctx) => {
    let {username,phone} = ctx.request.body.member
    let credit = 0
    // 找一下这个电话号码有无被注册
    let membership = await Membership.findOne({
        where: {
            phone
        }
    })
    if (membership) throw new global.errs.ParameterException('电话号码存在！')
    let new_membership = {
        username,
        phone,
        credit
    }
    const r = await Membership.create(new_membership)
    throw new global.errs.Success({},'创建会员成功！')
})

// 删除管理员
router.post('/deleteMember',async (ctx)=>{
    let phone = ctx.request.body.phone
    // 1.查找有无这个管理员
    let member = await Membership.findOne({
        where:{phone}
    })
    if (!member) throw new global.errs.ParameterException('找不到该管理者！')
    // 2.表删掉
    await Membership.destroy({
        where: {phone}
    })
    throw new global.errs.Success({},'删除成功')
})

// 修改会员信息
router.post('/alterMember',async (ctx) => {
    let body = ctx.request.body
    let {alter_member,phone} = ctx.request.body
    // console.log(alter_member,phone)
    // membership
    let member = await Membership.findOne({
        where: {phone}
    })
    if (!member) throw new global.errs.ParameterException('找不到该会员')
    await Membership.update(alter_member,{
        where: {phone}
    })
    throw new global.errs.Success({},'修改成功！')
})

router.get('/getMemberList',async (ctx)=>{
    const members = await Membership.findAll(), list = []
    members.forEach(member=>{
        delete member['dataValues'].created_at
        delete member['dataValues'].updated_at
        list.push(member['dataValues'])
    })
    throw new global.errs.Success({list})
})

module.exports = router