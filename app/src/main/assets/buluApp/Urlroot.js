var activeUrl = "http://192.168.0.132:8080";
//var activeUrl = "http://192.168.0.159:8080";
//var activeUrl ="http://c.service.bulu.aikaoen.com";
//var activeUrl = "http://c.service.bulu.aikaoen.com/buluc";
//var activeUrl1 = "http://c.service.bulu.aikaoen.com/buluc";
//dataId = 0; //学员id
cid = 0; //课时id
//kcid//课程大纲id
$(function() {
	//我的主页服务
	$.ajax({
		type: "post",
		url: activeUrl + "/mine/HomeInfo",
		data: {
			"xyid": xyid,
			"cid": zcid
		},
		async: false,
		dataType: "json",
		success: function(data) {
//						console.log(data)

			var stz = ''
			stz += `<div class="left mui-col-sm-3 mui-col-xs-3">`
			if(data.data.userinfo.picture == null){
				stz += `
						<a onclick="viewProfile()" href="ziliao.html"><img src="../../img/tou.png" /></a>`
			}else{
				stz += `
						<a onclick="viewProfile()" href="ziliao.html"><img src='${imgSrc}${data.data.userinfo.picture}'/></a>`
			}
			stz += `
					</div>
					<div class="left1 mui-col-sm-9 mui-col-xs-9">
						<div class="hide clearfix" style="line-height: 1rem; float: left;">
							<p style="margin-top: 1rem;">
					    	`
			if(xyid == 0) {
				stz += `<a href="#" style="margin-top: 1rem; font-size: 1rem;color: rgb(255,85,0);">${data.data.userinfo.user_name}</a>`
			} else {
				stz += `<a href="#" style="margin-top: 1rem; font-size: 1rem;color: rgb(255,85,0);">${data.data.userinfo.study}</a>`
			}

			if(data.data.userinfo.isstarstu > 0) {
				stz += `<a href="#" style="margin: 1rem 0 0 0.5rem; font-size: 1rem;color: red;">明星学员</a>`
			} else {
				stz += `<a href="#" style="margin: 1rem 0 0 0.5rem; font-size: 1rem;color: red;"></a>`
			}

			stz += `</p>
						<p>戏剧教育一班</p>
						<p style="font-size: 0.9rem;" class="zan">
							<img src="../../img/zan.png" />
							<a href="#" style="color: rgb(102,102,102);">收到的赞</a>
							<a href="#" style="color: red;">${data.data.userinfo.sdzcount}</a>
							<img style="margin-left: 0.5rem;" src="../../img/xin.png" />
							<a href="#" style="color: rgb(102,102,102); font-size: 0.9rem;">我喜欢的</a>
							<a href="#" style="color: red;">${data.data.userinfo.dzcount}</a>
						</p>
					</div>
					</div>`
			$('#hearsa').append(stz)
			var a = GetRequest();
//			console.log("id:" + a['id']) //打印出传过来的id
			for(var i = 0; i < data.data.messageinfo.length; i++) {
				var newdays = (data.data.messageinfo[i].createtime).substr(0, 16)
				var sty = ''
				sty += `<a href="message.html?id=${data.data.messageinfo[i].id}">
					<div class="news">
						<p style="padding: 0.5rem 0 0 1rem;">${data.data.messageinfo[i].type}<span style="float: right; margin-right: 0.5rem;">${newdays}</span></p>
						<p style="padding: 0 0 0 1rem;">${data.data.messageinfo[i].content}</p>
					</div>
				</a>`
				$('#messages').append(sty)
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器开小差了 请稍后重试！");
		}
	});
	
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