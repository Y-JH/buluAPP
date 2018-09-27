var activeUrl = "http://192.168.0.132:8080";
var activeUrl1 = "http://192.168.0.132:8080"; //翟勤
dataId = 0; //学员id
cid = 0; //课时id
ccId = 0; //课程大纲id
console.log(ccId)
console.log(dataId)
console.log(cid)
$(function() {
	var unixTimestamp = new Date(1526007949000);
	commonTime = unixTimestamp.toLocaleString(1535594400000);
	//获取时间和日期
	Date.prototype.toLocaleString = function() {
		return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
	};
	Date.prototype.toLocaleString1 = function() {
		return this.getHours() + ":" + this.getSeconds() + "";
	};

		//bookingClass.html 相关请求  翟勤
		$.ajax({
			type: "post",
			url: activeUrl1 + "/TimeTable/timeTablelist",
			data: {
				"id": 1
			},
			async: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				for(var i = 0; i < data.data.length; i++) {
					//获取时间和日期的相关代码
					Date.prototype.toLocaleString = function() {
						return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
					};
					var odom = document.getElementById('usera');
					var unixTimestap = new Date(data.data[i].classDate); //获取日期
					commonTime = unixTimestap.toLocaleString();
					var unixTimestap = new Date(data.data[i].classDate); //获取开始时间
					commonTime1 = unixTimestap.toLocaleString1();
					odom.innerHTML += `<div class="main_font">
						        <h4 class="hdr">${data.data[i].hour}</h4>
						        <p>班级: ${data.data[i].classGrade.className}</p>
						        <p>讲课老师: ${data.data[i].teacher}</p>
						        <p>教室: 教学楼${data.data[i].classGrade.classroom}</p>
						        <p class="padd">${commonTime} ${commonTime1}-${data.data[i].classTime}</p>
					        </div>
					        <div class="btn">
						        <button type="button" class="mui-btn mui-btn-outlined quxiao" style="background-color: rgb(255,139,54); color: white;">预约</button>
					        </div>`
				}
	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求失败！");
			}
		});

	//bookingClass.html课时预约课题大纲接口
	$.ajax({
		type: "post",
		url: activeUrl + "/course/queryAll",
		data: {
			"id": 1
		},
		async: false,
		dataType: "json",
		success: function(data) {
			console.log(data)

			for(var i = 0; i < data.data.length; i++) {

				var std = ''
				std += `<a class="mui-control-item static-color kcdg" href="#item1mobile" id=${data.data[i].id}>
						${data.data[i].courseName}
					</a>`
				$('#sliderSegmentedControl').append(std)
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求失败！");
		}
	});

	//		//myclass.html 页面请求 翟勤
			$('#scribe').click(function(){
				$('#mycalss').html('')
			$.ajax({
				type: "post",
				url: activeUrl1 + "/cade/classRecordlist",
				data: {
					"yid": 1
				},
				async: false,
				dataType: "json",
				success: function(data) {
					console.log(data)
					//for 循环
					for(var i = 0; i < data.data.length; i++) {
						//获取时间和日期的相关代码
						Date.prototype.toLocaleString = function() {
							return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
						};
						var unixTimestap = new Date(data.data[i].schooldate); //获取日期
						commonTime = unixTimestap.toLocaleString();
						var unixTimestap = new Date(data.data[i].schooldate); //获取日期
						commonTime = unixTimestap.toLocaleString();
						var obtn = document.getElementById('');
						var sta = ''
						sta += `<li class="mui-table-view-cell" style="line-height: 1.5rem;">
						<a href="mydetails.html"><div class="main_font" style="margin-top: 1rem;">
			              		<h4 style="padding: 1rem 0 0.5rem 0; color: rgb(102,102,102);">课程: ${data.data[i].hourName}</h4>
			              		<p>学生: ${data.data[i].cadetcyd[0].study}</p>
			              		<p>讲课老师: ${data.data[i].teacher}</p>
			              		<p class="star">课堂表现:
			              			<img src="../../img/redxing.png"/>
			              			<img src="../../img/redxing.png"/>
			              			<img src="../../img/redxing.png"/>
			              			<img src="../../img/redxing.png"/>
			              			<img src="../../img/heixing.png"/>
			              		</p>
			              		<p style="color: rgb(103,103,103);">${commonTime} ${data.data[i].timeBucket}</p>
			              		<p>课时总结: ${data.data[i].hourSum}</p>
			              		<p>老师留言: ${data.data[i].teacherMess}</p>
			              	</div></a></li>`
						$('#myclass').append(sta)
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}
			});
		})

		//mydetails.html 相关页面 翟勤
		$.ajax({
			type: "post",
			url: activeUrl1 + "/cade/classRecordlist",
			data: {
				"yid": 1
			},
			async: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				for(var i = 0; i < data.data.length; i++) {
					//获取时间和日期的相关代码
					Date.prototype.toLocaleString = function() {
						return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
					};
					var unixTimestap = new Date(data.data[i].schooldate); //获取日期
					commonTime = unixTimestap.toLocaleString();
					var unixTimestap = new Date(data.data[i].schooldate); //获取日期
					commonTime = unixTimestap.toLocaleString();

					var stb = ''
					stb += `<div class="main_font clearfix">
					<h4 style="padding: 1rem 0 0.5rem 0; color: rgb(102,102,102);">课程: ${data.data[i].hourName}</h4>
					<p>学生: ${data.data[i].cadetcyd[i].study}</p>
					<p>讲课老师: ${data.data[i].teacher}</p>
					<p class="star">
					课堂表现:<img src="../../img/redxing.png"/>
		              		<img src="../../img/redxing.png"/>
		              		<img src="../../img/redxing.png"/>
		              		<img src="../../img/redxing.png"/>
		              		<img src="../../img/heixing.png"/>
		              	</p>
		              	<p style="color: rgb(103,103,103);">${commonTime} ${data.data[i].timeBucket}</p>
		          </div>
		          <div class="main_section clearfix">
		          	<p style="width: 90%; margin: 0.5rem auto;">
		          		老师留言: ${data.data[i].hourSum}
		          	</p>
		          	<p style="width: 90%; margin: 0.5rem auto;">
		          		老师留言: ${data.data[i].teacherMess}
		          	</p>
		          </div>`
					$('#mainas').append(stb)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求失败！");
			}
		});

	//learning.html页面请求	景浩		
	$.ajax({
		type: "post",
		url: activeUrl + "/cadetcy/queryCadetcyById",
		data: {
			"id": 1
		},
		async: false,
		dataType: "json",
		success: function(data) {
			var unixTimestap = new Date(data.data[0].classConsumptions[0].date); //获取日期
			commonTime = unixTimestap.toLocaleString();

			dataId = data.data[0].id
			console.log(dataId)
			var unixTimestap1 = new Date(data.data[0].classConsumptions[0].date); //获取时间
			commonTime1 = unixTimestap1.toLocaleString1();

			var stc = ''
			stc += `
								<div class="mui-row">
						<div class="left mui-col-sm-9 mui-col-xs-9">
							<img src="../../img/tou.png" />
							<div class="hide clearfix">
								<h1 class="names">${data.data[0].study}</h1>
								<p>${data.data[0].classGrade.campus}</p>
							</div>
						</div>
						<div class="right mui-col-sm-3 mui-col-xs-3">
							<a href="bookingclass.html">
								<img src="../../img/kes.png" />
							</a>
						</div>
					</div>
					<div class="font">
						<p> 今日课程:${commonTime}<img src="../../img/time.png" alt="" /> ${commonTime1}-${data.data[0].classConsumptions[0].timeBucket}</p>
						<p>${data.data[0].classHour}(${data.data[0].classGrade.className}) ${data.data[0].classGrade.teacher}/${data.data[0].classGrade.assistant}${data.data[0].classGrade.classroom}教室</p>
					</div>
					<div class="xuan mui-row">
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(67,271,241);">完成作业</span><span>${data.data[0].done}次</span></div>
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(247,53,54);">请假</span><span>${data.data[0].askLeave}次</span></div>
						<div class="mui-col-sm-3 mui-col-xs-3"><span style="color: rgb(160,199,8);">缺课<span><span>${data.data[0].missClass}次<span></div>
						<div class="mui-col-sm-3 mui-col-xs-3">
							<span style="color: rgb(59,96,171);">课时</span>
							<a style="color: rgb(59,96,171);">${data.data[0].ch}</a>/${data.data[0].classMum}
						</div>
					</div>`
			$('#headers').append(stc)

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求失败！");
		}
	});

	//learning.html  课题大纲的接口  景浩 
	$.ajax({
		type: "post",
		url: activeUrl + "/course/queryAll",
		data: {
			"id": 1
		},
		async: false,
		dataType: "json",
		success: function(data) {
			console.log(data)
			for(var i = 0; i < data.data.length; i++) {

				var daga = ''
				daga += `<a class="mui-control-item kecheng" href="#item5moblie" id=${data.data[i].id} >
								${data.data[i].courseName}
							</a>`
				$('#xxks').append(daga)
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求失败！");
		}
	});

	//learning.html  课程表 点击事件 景浩
	$('.kecheng').on('click', function() {
		$('#kecheng').html('')
		//		alert( $(this).attr('id') )
		ccId = $(this).attr('id')
		console.log('学员id------>' + dataId)
		$.ajax({
			type: "post",
			url: activeUrl + "/cadetcy/selectByCadetcyId",
			data: {
				"caId": dataId,
				"ccId": ccId
			},
			dataType: "json",
			success: function(data) {
				console.log('---->课程大纲')
				cid = data.data[0].classConsumptions[0].id
				console.log(cid)
				console.log(data.data[0].classConsumptions[0].id)

				str = ' '
				for(var i = 0; i < data.data.length; i++) {
					//					cid = data.data[i].classGrade.id
					//获取时间和日期的相关代码	
					var unixTimestap = new Date(data.data[i].classConsumptions[0].date); //获取日期
					commonTime = unixTimestap.toLocaleString();
					console.log(commonTime)
					var unixTimestap1 = new Date(data.data[i].classConsumptions[0].date); //获取时间
					commonTime1 = unixTimestap1.toLocaleString1();

					str = ''
					str += `<li class="mui-table-view-cell">
	                      	<div class="mui-row">
	                      		<div class="picture mui-col-sm-3 mui-col-xs-3">
	                      			<img src="../../img/tou1.png" alt="" />
	                      			<button id="telephone" class="btnteach">${data.data[i].classGrade.teacher}</button>
	                      		</div>
	                      		<div class="pictures mui-col-sm-9 mui-col-xs-9">
	                      			<p style="margin-bottom: 0.8rem;">${commonTime}<img src="../../img/time.png" alt="" />${commonTime1}-${data.data[i].classConsumptions[0].timeBucket}</p>
	                      			<span>课时:${data.data[i].classConsumptions[0].classHour}</span><br />
	                      			<span style="font-size: 1rem; margin-top: 0.5rem;">班级：${data.data[i].classGrade.className}</span><br />
	                      			<span style="font-size: 1rem; margin-top: 0.5rem;">
	                      				教室：${data.data[i].classGrade.classroom}室
	                      			</span>
	                      			<button class="mui-btn mui-btn-warning" style="border-radius: 1rem; margin-left: 2.5rem;">调课</button>
	                      			<button  class="mui-btn mui-btn-danger qingjias" style="border-radius: 1rem;" id="qingjias" type=${data.data[i].classGrade.id}>请假</button>
	                      		</div>
	                      	</div>
	                      </li><div class="lines"></div>`

					$('#kecheng').append(str)

				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求失败！");
			}
		});
	})

	//请假接口  景浩
	$(document).on("click", ".qingjias", function() {
		ccId = $(this).attr('type')

		$.ajax({
			url: activeUrl + "/cadetcy/leave",
			type: "post",
			data: {
				aid: dataId,
				cid: cid
			},
			success: function(data) {
				console.log(data)
				mui.confirm(data.msg, '提示', ['我知道了'], null)
			}
		})
	});

	//listen.html 页面请求  景浩
	//获取时间和日期的相关代码
	Date.prototype.toLocaleString = function() {
		return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
	};
	Date.prototype.toLocaleString1 = function() {
		return this.getHours() + ":" + this.getSeconds() + "";
	};
	$.ajax({
		type: "post",
		url: activeUrl + "/user/queryByUserId",
		data: {
			"id": 8
		},
		async: false,
		dataType: "json",
		success: function(data) {
			console.log(data)
			for(var i = 0; i < data.data.length; i++) {
				//获取时间和日期的相关代码
				var unixTimestamp = new Date(data.data[i].listeningTestManages[0].startDate); //获取日期
				commonTime = unixTimestamp.toLocaleString(); //

				var unixTimestamp1 = new Date(data.data[i].listeningTestManages[0].startDate); //获取开始时间
				commonTime1 = unixTimestamp1.toLocaleString1(); //

				var unixTimestamp2 = new Date(data.data[i].listeningTestManages[0].endDate); //获取开始时间
				commonTime2 = unixTimestamp2.toLocaleString1(); //

				var ste = ''
				ste += `<ul class="mui-table-view booking">
										<li class="mui-table-view-cell" style="line-height: 1.5rem;">
											<div class="main_booking ">
	                      		<h4 style="color: rgb(102,102,102);"> ${data.data[i].listeningTestManages[0].demoLesson}</h4>
	                      		<p>讲课老师: ${data.data[i].listeningTestManages[0].listenTeacher}</p>
	                      		<p>地点:${data.data[i].listeningTestManages[0].address}</p>
	                      		<p style="color: rgb(153,153,153);">${commonTime} ${commonTime1}-${commonTime1}</p>
								    <div class="hr" style="width: 95%; height: 0.1rem; border-bottom: 0.1rem solid #EEEEEE; margin: 0.3rem auto;"></div>	
									<textarea id="hcqk" class="form" rows="" placeholder="试听反馈">${data.data[i].listeningTestManages[0].listeningFeedback}</textarea>
											</div>
										</li>
									</ul>
									<div class="pingjia">待评价</div>
									<div class="lines"></div>`
				$('#oton').append(ste)
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求失败！");
		}
	});
	console.log(dataId)
	console.log(ccId)
	//bookingClass.html  查询该学员预约课时  景浩 
	$(document).on("click", ".kcdg", function() {
		$('#usera').html('')
		//		alert($(this).attr('id'))
		ccId = $(this).attr('id')
		console.log('id------>' + ccId)
		$.ajax({
			type: "post",
			url: activeUrl + "/cadetcy/selectOrder",
			data: {
				"cid": ccId
			},
			async: false,
			dataType: "json",
			success: function(data) {
				cid = data.data[0].classConsumptions[0].id
				console.log(cid)
				for(var i = 0; i < data.data.length; i++) {
					//获取时间和日期的相关代码

					Date.prototype.toLocaleString = function() {
						return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
					};
					var unixTimestap = new Date(data.data[i].classConsumptions[0].date); //获取日期
					commonTime = unixTimestap.toLocaleString();
					var unixTimestap = new Date(data.data[i].classConsumptions[0].date); //获取开始时间
					commonTime1 = unixTimestap.toLocaleString1();

					var sts = ''
					sts += `<div class="main_font">
							        <h4 class="hdr">${data.data[i].classConsumptions[0].classHour}</h4>
							        <p>班级: ${data.data[i].classGrade.className}</p>
							        <p>讲课老师: ${data.data[i].classGrade.teacher}</p>
							        <p>教室: 教学楼${data.data[i].classGrade.classroom}</p>
							        <p class="padd">${commonTime} ${commonTime1}-${data.data[i].classConsumptions[0].timeBucket}</p>
							        <div class="btn">
							        <button type="button" class="mui-btn mui-btn-outlined quxiao" style="background-color: rgb(255,139,54); color: white;" id="yuyue">预约</button>
						        </div> 
						        </div>`
					$('#usera').append(sts)

				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求失败！");
			}
		});
	})

	//bookingClass.html 点击预约按钮功能接口
	$(document).on("click", ".quxiao", function() {
		ccId = $(this).attr('type')
		$.ajax({
			url: activeUrl + "/cadetcy/bookingClass",
			type: "post",
			data: {
				aid: dataId,
				cid: cid
			},
			success: function(data) {
				console.log(data)
				if(data.code == 10000) {
					mui.confirm(data.msg + "，请按时上课", '提示', ['我知道了'], null)
				} else {
					mui.confirm(data.mag + "，预约失败请重试", '提示', ['我知道了'], null)
				}
			}
		})
	});
	//myclass.html预约课时

	$('#subscribe').click(function() {
		$('#mycalss').html('')
		console.log('id------>' + dataId)
		ccId = $(this).attr('id')
		console.log('id------>' + ccId)
		$.ajax({
			type: "post",
			url: activeUrl + "/cadetcy/selectByCadetcyId2",
			data: {
				"caId": dataId
			},
			async: false,
			dataType: "json",
			success: function(data) {
				console.log(data)
				
				for(var i = 0; i < data.data.length; i++) {
					//获取时间和日期的相关代码
					Date.prototype.toLocaleString = function() {
						return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
					};
					var unixTimestap = new Date(data.data[i].classConsumptions[0].date); //获取日期
					commonTime = unixTimestap.toLocaleString();
					var unixTimestap = new Date(data.data[i].classConsumptions[0].date); //获取开始时间
					commonTime1 = unixTimestap.toLocaleString1();
					console.log(data.data[i].classGrade.teacher)
					var stg = ''
					stg += `<li class="mui-table-view-cell" style="line-height: 1.5rem;">
							<div class="main_booking ">
								<h4 style="color: rgb(102,102,102);">课程: ${data.data[i].classConsumptions[0].classHour}</h4>
								<p>讲课老师: ${data.data[i].classGrade.teacher}</p>
								<p>教室: ${data.data[i].classGrade.classroom}</p>
								<p>学生: ${data.data[i].study}</p>
								<p style="color: rgb(153,153,153);">${commonTime} ${commonTime1}-${data.data[i].classConsumptions[0].timeBucket}</p>
								<div class="btn">
									<button type="button" class="mui-btn mui-btn-outlined quxiaoa" style="background-color: rgb(255,139,54); color: white;">取消预约</button>
									<button type="button" class="mui-btn mui-btn-warning mui-btn-outlined">设置提醒</button>
								</div>
							</div>
						</li>`
					$('#mycalss').append(stg)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求失败！");
			}
		});
	})

	//myclass.html 点击取消预约按钮功能接口
	$(document).on("click", ".quxiaoa", function() {
		ccId = $(this).attr('type')
		console.log(ccId)
		$.ajax({
			url: activeUrl + "/cadetcy/deleteCadetcyHour",
			type: "post",
			data: {
				aid: dataId,
				cid: cid
			},
			success: function(data) {
				console.log(data)
				mui.confirm(data.msg, '提示', ['取消', '确认'], null)
			}
		})
	});
	//取消预约按钮
	//			$('.quxiaoa').click(function() {
	//				mui.confirm('确认取消播音主持课程的预约吗？', '提示', ['取消', '确认'], null)
	//			})

})