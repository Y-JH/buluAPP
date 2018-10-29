$(function() {
		//myclass.html预约课时
		function myclass(classType){
			$.ajax({
			type: "post",
			url: activeUrl + "/mine/HourInfo",
			data: {
				"xyid": xyid,
				"type": classType,
				"startPage": 0,
				"endPage": 4
			},
			async: false,
			dataType: "json",
			success: function(data) {
				console.log(data.data)
				console.log(data.data.class_hour)
				$('.consume').text("总课时数"+data.data.ksinfo.class_mum+"节")
				$('.allClass').text("消耗课时"+data.data.ksinfo.class_hour+"节")
				if(classType == 2) {
					$('.myxiao').html('')
					for(var i = 0; i < data.data.list.length; i++) {
						var newdateg = (data.data.list[i].date).substr(0, 16)
						var newdatel = (data.data.list[i].time_bucket).substr(11, 5)
						var sta = ''
						sta += `<li class="mui-table-view-cell" style="line-height: 1.5rem;">
							<a href="mydetails.html?id=${data.data.list[i].pkid}"><div class="main_font" style="margin-top: 1rem;">
				              		<h4 style="padding: 1rem 0 0.5rem 0; color: rgb(102,102,102);">课程: ${data.data.list[i].class_hour}</h4>
				              		<p>学生: ${data.data.list[i].study}</p>
				              		<p>讲课老师: ${data.data.list[i].teachername}</p>
				              		<p class="star">课堂表现:
				              			<img src="../../img/redxing.png"/>
				              			<img src="../../img/redxing.png"/>
				              			<img src="../../img/redxing.png"/>
				              			<img src="../../img/redxing.png"/>
				              			<img src="../../img/heixing.png"/>
				              		</p>
				              		<p style="color: rgb(103,103,103);">${newdateg}-${newdatel}</p>
				              		<p>课时总结: ${data.data.list[i].lesson_summary}</p>
				              		<p>老师留言: ${data.data.list[i].teacher_mess}</p>
				              	</div></a></li>`
						$('.myxiao').append(sta)

					}
				} else {
					$('.myclass').html('')
					for(var i = 0; i < data.data.list.length; i++) {
						var newdatek = (data.data.list[i].date).substr(0, 16)
						var newdateh = (data.data.list[i].time_bucket).substr(11, 5)
						var stg = ''
						stg += `<li class="mui-table-view-cell" style="line-height: 1.5rem;">
							<div class="main_booking ">
								<h4 style="color: rgb(102,102,102);">课程: ${data.data.list[i].class_hour}</h4>
								<p>讲课老师: ${data.data.list[i].teachername}</p>
								<p>教室: ${data.data.list[i].classroom}</p>
								<p>学生: ${data.data.list[i].study}</p>
								<p style="color: rgb(153,153,153);">${newdatek}-${newdateh}</p>
								<div class="btn">
									<button type="button" class="mui-btn mui-btn-outlined quxiaoa  butn" style="background-color: rgb(255,139,54); color: white;" data-id="${data.data.list[i].pkid}">取消预约</button>
									<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined butn remind">设置提醒</button>
								</div>
							</div>
						</li>`
						$('.myclass').append(stg)
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("服务器开小差了 请稍后重试！");
			}
		});
		}
		myclass(2)
	$('.yy').click(function() {
		var type = $(this).attr('data-type')
		myclass(type)
	})
	//myclass.html 点击取消预约按钮功能接口
	$(document).on("click", ".quxiaoa", function() {
		var pkid = $(this).attr("data-id")
		$.ajax({
			url: activeUrl + "/xxtd/xxtdYyksCancle",
			type: "post",
			data: {
				"xyid": xyid,
				"pkid": pkid
			},
			success: function(data) {
//				console.log(data)
				mui.confirm(data.msg, '提示', ['取消', '确认'], null)
			}
		})
	});
	//设置提醒
	$(document).on("click", ".remind", function() {
		mui.confirm('暂未开通', '提示', ['取消', '确认'], null)
	})
})