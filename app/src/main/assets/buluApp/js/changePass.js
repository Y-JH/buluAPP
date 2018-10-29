$(function(){
//	mui(document.body).on('tap','#change',function(){
//		
//	    mui.ajax(activeUrl+'/user/changePasswd',{
//	    	
//		    data:{
//		        
//		    },
//		    dataType: 'json', //服务器返回json格式数据
//		        type: 'post', //HTTP请求类型
//		        timeout: 10000, //超时时间设置为10秒；
//		    success: function(data) {
//		        //服务器返回响应，根据响应结果，分析是否登录成功； 
//		        console.log(data)
//		    },
//		    error: function(xhr, type, errorThrown) {
//		        mui.alert('服务器连接超时，请稍后再试');
//		    }
//	
//		});
//
//	})
	
	$('#change').click(function(){
		var oldPasswd = $('.oldpass').val()
		var newPasswd = $('.newpass').val()
		$.ajax({
			type: 'post',
			url: activeUrl + '/user/changePasswd',
			data: {
				oldPasswd:oldPasswd,
		        newPasswd:newPasswd,
		        cid:zcid
			},
			dataType: 'json',
			beforeSend: function() {
				//                        判断用户名是否为空
				if(!oldPasswd) {
					ycTips('您的旧密码不能为空哦', "确定")
					return false;
				}
				//                        判断账户是否为空
				if(!newPasswd) {
					ycTips('您的新密码不能为空哦', "确定")
					return false;
				}
				if(!/^([a-zA-Z]*\d+[a-zA-Z]+)|(\d*[a-zA-Z]+\d+)$/.test(newPasswd)) {
					ycTips('密码必须包含英文和数字哦', '确定')
					return false;
				}
				//判断密码输入的长度是否为6~11之间
				if(newPasswd.length < 6 || newPasswd.length > 11) {
					ycTips('请输入6-13位的密码', "确定")
					return false;
				}

			},
			success: function(data) {
				console.log(data)
				var ids = data.data
				console.log(ids)
				var msg = data.msg
				ycTips(msg, '确定')

				if(data.code == 10000) {
//					window.location.href = "information.html?userName=" + $name + "&accountNumber=" + $accountNumber + "&passwd=" + $password + "&patriarch" + $patriarch + "&tel" + $tel + '&id=' + ids;
					mui.alert('恭喜！密码修改成功');
				}

			},

		})
	 
	})//
})