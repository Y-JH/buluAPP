$(function() {
	//	config.html 反馈与建议 
	$(document).on("click", ".tijiao", function() {
		var contents = $("#fankui").val()
		if(contents != "" ){
			$.ajax({
				type: "post",
				url: activeUrl + "/mine/FeedBackAdd",
				data: {
					"content": contents,
					"cid": zcid
				},
				async: false,
				dataType: "json",
				success(data) {
					console.log(data)
					if (data.code == 10000) {
						mui.confirm(data.msg + "，", '提示', ['我知道了'], null)
						$("#fankui").val(' ');
					} else {
						alert("服务器开小差了 请稍后重试！");
					}
				},
				error(res) {
					alert("服务器开小差了 请稍后重试！");
				}
			});
		}else{
			mui.confirm("添加反馈与建议失败" + "，请输入信息", '提示', ['我知道了'], null)
		}

	})
})
