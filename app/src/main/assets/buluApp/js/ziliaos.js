
var codes = -1;
$(function() {
	//点击绑定按钮
	$(document).on('click', '.binding', function() {
		var xyname = $(".xy-name").val()
		var xhtell = $(".xh-tell").val()
		var xuehao = $(".xuehao").val()
		if(xyname != "" && xhtell != "" && xuehao != "") {
			$.ajax({
				url: activeUrl + "/mine/BindXh",
				type: "post",
				data: {
					"xyid": xyid,
					"cid": zcid,
					"name": xyname,
					"tel": xhtell,
					"xh": xuehao
				},
				success: function(data) {
					if(data.code == 10000) {
						console.log(data)
						var xyid = data.data.xyid
//						console.log(xyid)
						localStorage.setItem('xyid', xyid) //存变全局 第一个参数是自己命名  第二个是data里面的参数  setItem
						xyid = sessionStorage.getItem('xyid'); // 学员id; 
						console.log('学号id为' + xyid)
						mui.confirm(data.msg + "，", '提示', ['我知道了'], null)
					} else {
						mui.confirm(data.msg + "，", '提示', ['我知道了'], null)
					}

				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("服务器开小差了 请稍后重试！");
				}
			})
		}

	})
	//ziliao.html 个人资料
	    $.ajax({
        		type: "post",
        		url: activeUrl + "/mine/CUserInfo",
        		data: {
        			"xyid": xyid,
        			"cid": zcid
        		},
        		async: false,
        		dataType: "json",
        		success: function(data) {
        //			console.log(data)
        			$('.xm').text(data.data.user_name)
        			$('.sr').text(data.data.birth_date)
        			$('.dh').text(data.data.tel)
        			$('.jzxm').text(data.data.patriarch)
        			$('.student_number').text(data.data.student_number)
        			if(data.data.picture == null){
        				$('.photos').attr('src',"../../img/tou.png")
        			}else{
        				$('.photos').attr('src',imgSrc+data.data.picture)
        			}
        			if($('.student_number').text() == '') {
        				//点击学号跳转绑定学号
        				$(document).on('click', '.tells', function() {
        					$(this).attr('href', 'xuehao.html')
        				})
        			}
        			//点击手机号跳转修改手机号
        			$(document).on('click', '.iphone', function() {
        				$(this).attr('href', 'replaceTell.html')
        			})
        		},
        		error: function(XMLHttpRequest, textStatus, errorThrown) {
        			alert("服务器开小差了 请稍后重试！");
        		}
        	});

	
// 修改手机号
	$('#amend').click(function() {
		var xtell = $('.iphones').val() //手机号 
		var $code = $('.iphoneplus').val()//验证码
		if(!xtell) {
			ycTips('手机号不能为空', "确定")
			return false;
		}
		if(!/^1[3,5,7,8]\d{9}$/.test(xtell)) {
			ycTips('请输入正确的手机号', '确定')
			return false;
		}
		if(!$code) {
			ycTips('验证码不能为空', '确定')
			return false;
		}
		if($code != codes) {
			ycTips('验证码输入不正确', '确定')
			return false;
		}else{
			$.ajax({
				type: 'post',
				url: activeUrl + '/mine/UpdateTel',
				data: {
					"tel": xtell,
					"cid": zcid
				},
				dataType: 'json',
				success: function(data) {
					var msg = data.msg
					ycTips(msg, '确定')
				},
	
			})
		}

	})
	$('.huoqu').click(function() {
		var xtell = $('.iphones').val();
		if(!xtell){
			ycTips('手机号不能为空', "确定")
					return false;
		}else{
			iphoneplus()
		}
	})
	//获取验证码
	function iphoneplus() {
		$('.huoqu').attr("disabled", true)
		time = 60;
		// 重置
		if(this.timers) {
			clearInterval(this.timers);
		};
		// 计时器
		this.timers = setInterval(function() {
			--this.time;
			if(this.time <= 0) {
				this.time = 0;
				$('.huoqu').removeAttr("disabled")
				$('.huoqu').text('获取验证码')
				clearInterval(this.timers);
				return false;
			}
			$('.huoqu').text(this.time + 's后重发');

		}, 1000)
		
		var oldPhone = $('.iphones').val();
		$.ajax({
			type: "get",
			url: activeUrl + "/user/SendVerificationCode",
			data: {
				oldPhone: oldPhone
			},
			async: false,
			dataType: "json",
			success: function(data) {
				codes = data.data
				console.log(codes)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				mui.alert('服务器开小差了 请稍后重试');
			}
		});
	}
	
})