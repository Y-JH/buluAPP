////拨打电话
//document.getElementById("telephone").addEventListener('tap', function() {
//	var btnArray = ['拨打', '取消'];
//	var phone = "13122222222";
//	mui.confirm('是否拨打' + phone + '?', '提示', btnArray, function(e) {
//		if(e.index == 0) {
//			plus.device.dial(phone, false);
//		}
//	});
//});
//
//document.getElementById("telephonea").addEventListener('tap', function() {
//	var btnArray = ['拨打', '取消'];
//	var phone = "13122222222";
//	mui.confirm('是否拨打' + phone + '?', '提示', btnArray, function(e) {
//		if(e.index == 0) {
//			plus.device.dial(phone, false);
//		}
//	});
//});
//document.getElementById("telephones").addEventListener('tap', function() {
//	var btnArray = ['拨打', '取消'];
//	var phone = "13122222222";
//	mui.confirm('是否拨打' + phone + '?', '提示', btnArray, function(e) {
//		if(e.index == 0) {
//			plus.device.dial(phone, false);
//		}
//	});
//});
$(function() {
	//learning.html  学习天地主页服务
	$.ajax({
		type: "post",
		url: activeUrl + "/xxtd/xxtdHomeInfo",
		data: {
			"xyid": xyid,
			"cid": zcid
		},
		async: false,
		dataType: "json",
		success: function(data) {
			//			console.log(data)
			if(data.data.jrskinfo.length > 0) {
				//				console.log("显示")
				//				console.log(data)
				var newdateb = (data.data.jrskinfo[0].date).substr(0, 16)
				var newdatem = (data.data.jrskinfo[0].time_bucket).substr(11, 5)
				console.log(data.data.xyinfo[0].user_name)
				var stc = ''
				stc += `
					<div class="mui-row">
						<div class="left mui-col-sm-9 mui-col-xs-9">
							<img src="../../img/students.png" alt="" />
							<div class="hide clearfix">`
				if(xyid > 0) {
					stc += `<h1 class="names">${data.data.xyinfo[0].study}</h1>`
				} else {
					stc += `<h1 class="names">${data.data.xyinfo[0].user_name}</h1>`
				}

				stc += `		<p>${data.data.jrskinfo[0].campusname}</p>
							</div>
						</div>
						<div class="right mui-col-sm-3 mui-col-xs-3">
							<a href="bookingclass.html" class="pic">
								<img src="../../img/kes.png" />
							</a>
						</div>
					</div>
					<div class="font">
						<p> 今日课程<img class="timed" src="../../img/time.png" alt="" /> ${newdateb}-${newdatem}</p>
						<p>${data.data.jrskinfo[0].course_name}(${data.data.jrskinfo[0].class_name}) ${data.data.jrskinfo[0].teachername}/${data.data.jrskinfo[0].assistantname}${data.data.jrskinfo[0].classroom}教室</p>
					</div>
					<div class="xuan mui-row">
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(67,271,241);">完成作业</span><span>${data.data.xyinfo[0].done}次</span></div>
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(247,53,54);">请假</span><span>${data.data.xyinfo[0].ask_leave}次</span></div>
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(160,199,8);">缺课<span><span>${data.data.xyinfo[0].miss_class}次<span></div>
						<div class="mui-col-sm-3 mui-col-xs-3">
							<span style="color: rgb(59,96,171);">课时</span>
							<a style="color: rgb(59,96,171);">${data.data.xyinfo[0].class_hour}</a>/${data.data.xyinfo[0].class_mum}
						</div>
					</div>`
				$('#headers').append(stc)

			} else {
				//				console.log("不显示")
				var stc = ''
				stc += `
					<div class="mui-row">
						<div class="left mui-col-sm-9 mui-col-xs-9">
							<img src="../../img/students.png" alt="" />
							<div class="hide clearfix">`

				if(xyid > 0) {
					stc += `<h1 class="names">${data.data.xyinfo[0].study}</h1>`
				} else {
					stc += `<h1 class="names">${data.data.xyinfo[0].user_name}</h1>`
				}
				stc += `
								<p></p>
							</div>
						</div>
						<div class="right mui-col-sm-3 mui-col-xs-3">
							<a href="bookingclass.html" class="pic">
								<img src="../../img/kes.png" />
							</a>
						</div>
					</div>
					<div class="font">
						<p></p>
						<p></p>
					</div>
					<div class="xuan mui-row">
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(67,271,241);">完成作业</span><span>${data.data.xyinfo[0].done}次</span></div>
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(247,53,54);">请假</span><span>${data.data.xyinfo[0].ask_leave}次</span></div>
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(160,199,8);">缺课<span><span>${data.data.xyinfo[0].miss_class}次<span></div>
						<div class="mui-col-sm-3 mui-col-xs-3">
							<span style="color: rgb(59,96,171);">课时</span>
							<a style="color: rgb(59,96,171);">${data.data.xyinfo[0].class_hour}</a>/${data.data.xyinfo[0].class_mum}
						</div>
					</div>`
				$('#headers').append(stc)
			}
			//课题大纲
			if(data.data.bmkcinfo.length > 0) {
				//				console.log("显示")
				for(var i = 0; i < data.data.bmkcinfo.length; i++) {
					//					console.log(data)
					var daga = ''
					daga += `<div class="slide"><a class="mui-control-item kecheng" id=${data.data.bmkcinfo[i].courseid} >
								${data.data.bmkcinfo[i].course_name}
							</a></div>`
					$('#xxks').append(daga)
				}
			} else {
				//				console.log("不显示")
				for(var i = 0; i < data.data.length; i++) {
					var daga = ''
					daga += `<a class="mui-control-item kecheng">
								
							</a>`
					$('#xxks').append(daga)
				}
			}
			//该学员预约课时
			str = ' '
			for(var i = 0; i < data.data.yyksinfo.length; i++) {
				//				console.log(data)
				var newdatec = (data.data.yyksinfo[i].date).substr(0, 10)
				var newdatebc = (data.data.yyksinfo[i].date).substr(10, 6)
				var newdateo = (data.data.yyksinfo[i].time_bucket).substr(11, 5)
				str = ''
				str += `<li class="mui-table-view-cell">
		                      	<div class="mui-row">
		                      		<div class="picture mui-col-sm-3 mui-col-xs-3">
		                      			<a href="tel:${data.data.yyksinfo[i].tel}">
		                      				<img src="${imgSrc}${data.data.yyksinfo[i].userimg}" alt="" style='border-radius:50%;'/>
		                      			</a>
		                      			
		                      			<button id="telephone" class="btnteach">${data.data.yyksinfo[i].teachername}</button>
		                      		</div>
		                      		<div class="pictures mui-col-sm-9 mui-col-xs-9 learn-star">
		                      			<p style="margin-bottom: i.8rem;">${newdatec} <img class="imgh" src="../../img/time.png" alt="" /> <a class="aas">${newdatebc}-${newdateo}</a></p>
		                      			<span style="color: rgb(102,102,102); margin-top:0.4rem; display:block;">课时:<i></i>${data.data.yyksinfo[i].course_name}</span>
		                      			<span style="font-size: 0.9rem; display:block; margin-top:0.4rem; color:#666c;"  class='learnspan'>班级:<i></i>${data.data.yyksinfo[i].class_name}</span>
		                      			<span style="font-size: 0.9rem;color:#666c;">
		                      				教室:<i></i>${data.data.yyksinfo[i].classroom}室
		                      			</span>
		                      			<button  class="mui-btn mui-btn-danger qingjias mui-pull-right" style="border-radius: 1rem;margin-right:1rem;" id="qingjias" type=${data.data.yyksinfo[i].pkid}>请假</button>
		                      		</div>
		                      	</div>
		                      </li><div class="lines"></div>`

				$('#kecheng').append(str)

			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器开小差了 请稍后重试！");
		}
	});
	//点击课程大纲获取课程下的预约课时信息
	$(document).on("click", ".kecheng", function(event) {
		kcid = $(this).attr('id')
		$('#kecheng').html(' ');
		//		console.log(kcid)
		$.ajax({
			type: "post",
			url: activeUrl + "/xxtd/xxtdYyksByKcid",
			data: {
				"xyid": xyid,
				"kcid": kcid,
				"startPage": 0,
				"endPage": 4
			},
			async: false,
			dataType: "json",
			success: function(data) {
				//				console.log(data)
				for(var i = 0; i < data.data.length; i++) {
					var newdayaa = (data.data[i].date).substr(0, 10)
					var newdaybb = (data.data[i].date).substr(10, 6)
					var newdaycc = (data.data[i].time_bucket).substr(11, 5)
					str = ''
					str += `<li class="mui-table-view-cell">
		                      	<div class="mui-row">
		                      		<div class="picture mui-col-sm-3 mui-col-xs-3">
		                      			<a href="tel:${data.data[i].tel}">
		                      				<img src="${imgSrc}${data.data[i].userimg}" alt="" style='border-radius:50%;'/>
		                      			</a>
		                      			<button id="telephone" class="btnteach">${data.data[i].teachername}</button>
		                      		</div>
		                      		<div class="pictures mui-col-sm-9 mui-col-xs-9 learn-star">
		                      			<p>${newdayaa} <img class="imgh" src="../../img/time.png" alt="" /> <a class="aas">${newdaybb}-${newdaycc}</a></p>
		                      			<span style="color: rgb(102,102,102); margin-top:0.4rem; display:block;">课时:<i></i>${data.data[i].course_name}</span>
		                      			<span style="font-size: 0.9rem; display:block; margin-top:0.4rem; color:#666c;"  class='learnspan'>班级:<i></i>${data.data[i].class_name}</span>
		                      			<span style="font-size: 0.9rem;color:#666c;">
		                      				教室:<i></i>${data.data[i].classroom}室
		                      			</span>
		                      			<button  class="mui-btn mui-btn-danger qingjias mui-pull-right" style="border-radius: 1rem;margin-right:1rem;" id="qingjias" type=${data.data[i].pkid}>请假</button>
		                      		</div>
		                      	</div>
		                      </li><div class="lines"></div>`

					$('#kecheng').append(str)

				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("服务器开小差了 请稍后重试！");
			}
		});
	});
	//请假接口  景浩
	$(document).on("click", ".qingjias", function() {
		var pkid = $(this).attr("type")
		$.ajax({
			url: activeUrl + "/xxtd/xxtdStudentStateUpdate",
			type: "post",
			data: {
				"xyid": xyid, //学员id
				"pkid": pkid, //排课id
				"state": 0
			},
			success: function(data) {
				if(data.code == 10000) {
					mui.confirm(data.msg, '提示', ['我知道了'], null)
				} else {
					mui.confirm(data.msg, '提示', ['我知道了'], null)
				}
			}
		})
	});

	//我的课程
	$(document).on("click", ".muixxk", function(event) {
		$("#item1mobile").show()
		$("#item2mobile").hide()
		$("#item3mobile").hide()
		$("#item4mobile").hide()
	});

	//师生互动
	$(document).on("click", ".shisheng", function(event) {
		$("#item2mobile").show()
		$("#item1mobile").hide()
		$("#item3mobile").hide()
		$("#item4mobile").hide()
	});

	//learning.html  我的作业 
	$(document).on("click", ".workss", function(event) {
		$("#item3mobile").show()
		$("#item1mobile").hide()
		$("#item4mobile").hide()
		$("#item2mobile").hide()
		$.ajax({
			type: "post",
			url: activeUrl + "/xxtd/xxtdZyList",
			data: {
				"xyid": xyid,
				"state": 3,
				"startPage": 0,
				"endPage": 4
			},
			async: false,
			dataType: "json",
			success: function(data) {
				for(var i = 0; i < data.data.length; i++) {
					//					console.log(data)
					var newdatec = (data.data[i].date).substr(0, 10)
					var newdatebc = (data.data[i].date).substr(10, 6)
					var newdateo = (data.data[i].time_bucket).substr(11, 5)
					var pp = parseInt(data.data[i].classroom_per)
					$('#work').html(' ')
					var works = ''
					works += `<ul class="mui-table-view booking">
								<li class="mui-table-view-cell" style="line-height: 1.5rem;">
									<div class="main_booking ">
										<h4 class="her">${data.data[i].class_name} ${data.data[i].course_name}</h4>
										<p>讲课老师: ${data.data[i].teachername}、${data.data[i].assistantname}</p>
										<p>教室: 教学楼${data.data[i].classroom}</p>
										<p>学生: ${data.data[i].study}</p>
										<p class="star">课堂表现:
											`
					for(var j = 0; j < pp; j++) {
						works += `							<img src="../../img/redxing.png" />`
					}

					works += `					</p>
										<p>${newdatec}${newdatebc}-${newdateo}</p>
									</div>
								</li>
								<li class="mui-table-view-cell parent_text">
									<p>
										<a class="fontsize" href="#">作业要求:</a>${data.data[i].homework_require}</p>
									<p>
										<a class="fontsize" href="#">课时总结:</a> ${data.data[i].lesson_summary}</p>
									<p>
									`
					if(data.data[i].teacher_mess == null) {
						works += `<a class="fontsize" href="#">教师留言:</a></p>`
					} else {
						works += `<a class="fontsize" href="#">教师留言:</a> ${data.data[i].teacher_mess}</p>`
					}

					`
								</li>
							</ul>
							<div class="profile-photo">
								<div class="head-photos"><img src="../../img/camera.png" /></div>
								上传作业
							</div>`
					$('#work').append(works)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("服务器开小差了 请稍后重试！");
			}
		});
	});

	//课时资料
	$(document).on("click", ".ziliaoa", function(event) {
		$("#item4mobile").show()
		$("#item1mobile").hide()
		$("#item3mobile").hide()
		$("#item2mobile").hide()
	});
})