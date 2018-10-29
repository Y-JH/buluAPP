$(function(){
	//		明星教师页面   
		$.ajax({
			type: "post",
			url: activeUrl + "/starTeachers/queryAllPage",
			data: {
				"type": 0,
				"startPage":0,
				"endPage":10
				
			},
			async: false,
			dataType: "json",
			success: function(data) {
											console.log(data.data)
				var datas = data.data
				console.log()
				for(var i = 0; i < datas.length; i++) {
					var teaStar = '';
					teaStar += `
							<div class="stars-items">
								<a onclick="viewStartTeacherInfo('id=${datas[i].id}')" class="stars-img">
									<img src="${imgSrc}${datas[i].cover}" alt="" />
									<p class="star-text"> ${datas[i].teachername} <span> ${datas[i].label} </span></p>
								</a>
							</div>
							`
					$('.stars-con1 ').append(teaStar)
		
				}
		
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				mui.alert('服务器开小差了 请稍后重试');
			}
		});
  
//	咘噜--优秀剧目
			$.ajax({
				type: "post",
				url: activeUrl + "/ActivitiesPerformed/queryAllPage",
				data: {
					"startPage":0,
					"endPage":2
				},
				async: false,
				dataType: "json",
				success: function(data) {
//					console.log(data.data)
					for(var i = 0; i < data.data.length; i++){

						var str=''
						str+=`
						<dl class="teachers-item no-border youxiu">
							<a onclick="viewStartActiveInfoInfo('id=${data.data[i].id}')">
								<dt class="jumu">
									<img src='${imgSrc}${data.data[i].activitieCover}'/>
								</dt>
								<dd>${data.data[i].activityName}</dd>
							</a>
						</dl>
						
						`
						$('#yxjm').append(str)
					}
					
					
					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开小差了 请稍后重试');
				}
			});
	
	
	//	咘噜--上课实景
	$.ajax({
		type: "post",
		url: activeUrl+"/video/queryAllPage",
		data: {
			"type":2,
			"cid":zcid,
			"startPage":0,
			"endPage":2
		},
		async: false,
		dataType: "json",
		success: function(data) {
//			var data=data.data
//			console.log(data)
			for(var i = 0; i<data.data.length; i++){
				var str=''
				str+=`
					<dl class="teachers-item no-border">
						<dt class="jumu jumnn">
							<a onclick="viewStarClassVideoInfo('videoId=${data.data[i].id}')">
								<img src='${imgSrc}${data.data[i].videoimg}'/>
							</a>
						</dt>
						<dd>${data.data[i].course}</dd>
					</dl>
				`
				$('#sksj').append(str)
			}
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			mui.alert('服务器开小差了 请稍后重试');
		}
				
	});
	
//	咘噜--学生分享
	$.ajax({
		type: "post",
		url: activeUrl+"/video/queryAllPage",
		data: {
			"type":3,
			"cid":zcid,
			"startPage":0,
			"endPage":4
		},
		async: false,
		dataType: "json",
		success: function(data) {
//			var data=data.data
//			console.log(data)
			for(var i = 0; i<data.data.length; i++){
				var str=''
				str+=`
					<dl class="teachers-item no-border">
						<dt class="jumu" style="height: 6.5rem;">
							<a onclick="viewStartStudentShareVideoInfo('videoId=${data.data[i].id}')">
								
									<img src='${imgSrc}${data.data[i].videoimg}'/>
							</a>
							
						</dt>
						<dd> <span style='color:rgb(255,139,54);'>${data.data[i].course}</span> &nbsp; ${data.data[i].upload_person}</dd>
					</dl>
				`
				$('#xsfx').append(str)
			}
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			mui.alert('服务器开小差了 请稍后重试');
		}
				
	});

	
	
})

