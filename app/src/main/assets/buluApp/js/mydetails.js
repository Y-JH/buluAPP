$(function() {
	//mydetails.html 相关页面 翟勤
	var a = GetRequest();
//	console.log("id:" + a['id']) //打印出传过来的id
	$.ajax({
		url: activeUrl + "/mine/HourInfoByID",
		type: "post",
		data: {
			"xyid": xyid,
			"pkid": a['id']
		},
		success: function(data) {
//			console.log(data)
			var newdatb = (data.data.date).substr(0, 16)
			var newdatc = (data.data.time_bucket).substr(11, 5)
			var skr = ''
			skr += `<div class="main_font clearfix">
						<h4 style="padding: 1rem 0 0.5rem 0; color: rgb(102,102,102);">课程: ${data.data.class_hour}</h4>
						<p>学生: ${data.data.study}</p>
						<p>讲课老师: ${data.data.teachername}</p>
						<p class="star">
						课堂表现:<img src="../../img/redxing.png"/>
			              		<img src="../../img/redxing.png"/>
			              		<img src="../../img/redxing.png"/>
			              		<img src="../../img/redxing.png"/>
			              		<img src="../../img/heixing.png"/>
			              	</p>
			              	<p style="color: rgb(103,103,103);">${newdatb}-${newdatc}</p>
			          </div>
			          <div class="main_section clearfix">
			          	<p style="width: 90%; margin: 0.5rem auto;">
			          		老师留言: ${data.data.lesson_summary}
			          	<p style="width: 90%; margin: 0.5rem auto;">
			          		老师留言: ${data.data.teacher_mess} 
			          	</p>
			          </div>`
			$('#mainas').append(skr)
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