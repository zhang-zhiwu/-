$(function () {
    getUserInfo()
    $('#btnLogout').on('click',function(){
        const{layer} = layui
        layer.confirm('确定退出登录',{icon:3,title:'提示'},function(){
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头headers字段
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
              }
            renderAvatar(res.data)
        },
    })
}
// 渲染用户的头像
function renderAvatar(user){
    // 渲染用户的头像
    const name = user.nickname || user.username
      // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
     // 3. 按需渲染用户的头像
    if(user.user_pic !== null){
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src',user.user_pic).show()
    }else{
        $('.layui-nav-img').hide()
        var first = user.username[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}