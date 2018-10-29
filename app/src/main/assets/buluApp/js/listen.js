$(function() {
	//listen.html 试听记录 
	$.ajax({
		type: "post",
		url: activeUrl + "/mine/StjlList",
		data: {
			"xyid": xyid,
			"cid": zcid,
			"startPage": 0,
			"endPage": 10
		},
		async: false,
		dataType: "json",
		success: function(data) {
			//			console.log(data)							
			for(var i = 0; i < data.data.length; i++) {
				var ste = ''
				ste += `<ul class="mui-table-view booking">
										<li class="mui-table-view-cell" style="line-height: 1.5rem;">
											<div class="main_booking ">
	                      		<h4 style="color: rgb(102,102,102);"> ${data.data[i].demo_lesson}</h4>
	                      		<p>讲课老师: ${data.data[i].listen_teacher}</p>
	                      		<p>地点:${data.data[i].address}</p>
	                      		<p style="color: rgb(153,153,153);">${data.data[i].start_date}</p>
								    <div class="hr" style="width: 95%; height: 0.1rem; border-bottom: 0.1rem solid #EEEEEE; margin: 0.3rem auto;"></div>
									<textarea id="oInput" class="form" rows="" placeholder="试听反馈" datas-type="${data.data[i].id}">${data.data[i].listening_feedback}</textarea>
											</div>
										</li>
									</ul>
									<div class="pingjia">待评价</div>
									<div class="lineh"></div>`
				$('#oton').append(ste)
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器开小差了 请稍后重试！");
		}
	});

	//	config.html  试听记录反馈
	$("#oInput").blur(function() {
		var typea = $(this).attr('datas-type')
//		console.log(typea)
		var contents = $("#oInput").val()
//		console.log(contents)
		$.ajax({
			type: "post",
			url: activeUrl + "/mine/StjlFeedBack",
			data: {
				"id": typea,
				"content": contents
			},
			async: false,
			dataType: "json",
			success: function(data) {
//				console.log(data)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("服务器开小差了 请稍后重试！");
			}
		});
	})
})