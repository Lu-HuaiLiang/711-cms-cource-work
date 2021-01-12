const Router = require('koa-router')
const router = new Router({
    prefix: '/administrators'
})
const Administrators = require('../models/administrators')
const { RegisterValidator } = require('../validators/validators')

// 得到管理者列表
router.get('/getManagerList',async (ctx)=>{
    const managers = await Administrators.findAll(), list = []
    managers.forEach(manager=>{
        let role = manager['dataValues'].role
        manager['dataValues'].charactor = role == 1 ? '超级管理员' : '普通管理员' 
        delete manager['dataValues'].created_at
        delete manager['dataValues'].updated_at
        delete manager['dataValues'].password
        // product['dataValues'].orderDay = orderDay
        list.push(manager['dataValues'])
    })
    throw new global.errs.Success({list})
})

// 删除管理员
router.post('/deleteManager',async (ctx)=>{
    let username = ctx.request.body.username
    // 1.查找有无这个管理员
    let manager = await Administrators.findOne({ where:{username} })
    if (!manager) throw new global.errs.ParameterException('找不到该管理者！')
    // 2.表删掉
    await Administrators.destroy({
        where: {username}
    })
    throw new global.errs.Success({},'删除成功')
})


// 修改单条管理者信息
// 参数 body manager Object
router.post('/alterManager',async (ctx)=>{
    // phone,username,password
    let {alter_manager,username} = ctx.request.body
    // if(!alter_manager) throw new global.errs.ParameterException()
    let manager = await Administrators.findOne({ where:{username} })
    if (!manager) throw new global.errs.ParameterException('找不到该管理员！')
    await Administrators.update(alter_manager,{
        where: {username}
    })
    throw new global.errs.Success({},'修改成功！')
})
 
// 注册管理者
router.post('/register',async (ctx)=>{
    const v = await new RegisterValidator().validate(ctx)
    let new_administrator = ctx.request.body
    await Administrators.create(new_administrator)
    throw new global.errs.Success({},'创建管理员成功！')
})



module.exports = router;
