$(function() {
	var a = GetRequest();
	console.log("id:" + a['id']) //打印出传过来的id
	$.ajax({
		url: activeUrl + "/mine/MessageInfo",
		type: "post",
		data: {
			"xyid": xyid,
			"cid": zcid,
			"messageid": a['id']
		},
		success: function(data) {
//			console.log(data)
			$('.date').text(data.data.createtime)
			$('.type').text(data.data.type)
			$('.content').text(data.data.content)
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器开小差了 请稍后重试！");
		}
	})

	function GetRequest() {
		var url = location.search; //获取url中"?"符后的字串
		var theRequest = new Object(); 
		if(url.indexOf("?") != -1) {    
			var str = url.substr(1);    
			strs = str.split("&");    
			for(var i = 0; i < strs.length; i++) {      
				theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);    
			}  
		}  
		return theRequest;
	}
})