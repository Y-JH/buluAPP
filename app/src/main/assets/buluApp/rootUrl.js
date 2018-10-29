function getValue() {
	var str = decodeURIComponent(window.location.search),
		obj = {},
		item = [];
	if(str && ~str.indexOf('?')) {
		str = str.slice(1)
	}
	if(str != null && str != "") {
		if(str.indexOf("&") != -1) {
			item = str.split("&");
			for(var i = 0; i < item.length; i++) {
				var itemValue = item[i].split("=");
				obj[itemValue[0]] = itemValue[1];
			}
		} else {
			item = str.split("=");
			obj[item[0]] = item[1];
		}
		return obj;
	}
}

//	首页--banner页面请求
$.ajax({
	type: "post",
	url: activeUrl + "/bananer/queryAllPage",
	data: {
		'startPage': 0,
		'endPage': 4
	},
	async: false,
	dataType: "json",
	success: function(data) {
		//console.log(data)
		for(var i = 0; i < data.data.length; i++) {
			var bannerStr = ''
			bannerStr += `
						<div class="swiper-slide">
						    <a onclick="onClickBanner('id=${data.data[i].id}')" class='banners'><img src="${imgSrc}${data.data[i].bimgurl}" alt="" /></a>
						</div>
					`
			$('.swiper-wrapper').append(bannerStr)
		}

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
//					alert("请求失败！");
	}
});

$(function() {

	//	首页请求课程
	var str = document.getElementsByClassName('class-item')

	$.ajax({
		type: "post",
		url: activeUrl + "/course/queryAll",
		data: {
			"startPage": 0,
			"endPage": 10
		},
		async: false,
		dataType: "json",
		success: function(data) {
//			console.log(data)
			for(var i = 0; i < data.data.length; i++) {
				//				console.log(data.data[i].id)
				var str = ''
				str += `
						<dl class="class-item">
							<dt>
								<a onclick="onClickClassButton('id=${data.data[i].id}')"  class='class-items'>
									<img src="${imgSrc}${data.data[i].logo}" alt="" />
								</a>
							</dt>
							<dd>${data.data[i].course_name}</dd>
						</dl>
						`
				//							str+="<dl class='class-item'><dt><a href='classInfo.html?id=' "+data.data[i].id+" class='class-items'><img src='../../img/ke1.png' alt='' /></a></dt><dd>"+data.data[i].courseName+"</dd></dl>"
				$('.pic-class').append(str)
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {

			//			alert("请求失败！");
		}
	});

	//	首页--活动演出页面请求  ActivitiesPerformed/queryAll

	$.ajax({
		type: "post",
		url: activeUrl + "/ActivitiesPerformed/queryAllPage",
		data: {
			"startPage": 0,
			"endPage": 4
		},
		async: false,
		dataType: "json",
		success: function(data) {

			for(var i = 0; i < 4; i++) {
				var act = '';
				act += `
					<dl class="yc-info">
						<dt><a onclick="onClickPerformItem('id=${data.data[i].id}')"><img src="${imgSrc}${data.data[0].activitieCover}" alt="" /></a></dt>
						<dd>${data.data[i].activityName}</dd>	
					</dl>
					`
				$('#active').append(act)
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//			alert("请求失败！");
		}
	});

	//	首页--演出详情更多页面请求  ActivitiesPerformed/queryAll
	$.ajax({
		type: "post",
		url: activeUrl + "/ActivitiesPerformed/queryAllPage",
		data: {
			"startPage": 0,
			"endPage": 10
		},
		async: false,
		dataType: "json",
		success: function(data) {
//			console.log(data)
			for(var i = 0; i < data.data.length; i++) {
				var actMore = '';
				actMore += `
						<div class="bc-center clearfix">
							<a onclick="onClickPerformItem('id=${data.data[i].id}')" class="yanList-l"> <img src="${imgSrc}${data.data[0].activitieCover}" alt="" /> </a>
							<div class="yanList-r">
								<h5>《${data.data[i].activityName}》</h5>
								<p>
									演出时间：<span class="yanchu-time">${data.data[i].time}</span>
								</p>

								<p>演出剧场：<span class="jc">${data.data[i].theater}</span></p>
								<p>剧场地址：<span class="dz">${data.data[i].theatreAddress}</span></p>
							</div>
						</div>		
						<div class="lines" style="margin-top: 0rem;"></div>
						
						`
				$('#actMore').append(actMore)
			}

			//				

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//				alert("请求失败！");
		}
	});

	//	
	//	首页--新闻页面数据请求
	$.ajax({
		type: "post",
		url: activeUrl + "/news/queryAllPage",
		data: {
			"startPage": 0,
			"endPage": 2,
			"cid": zcid,
			"xyid": xyid
		},
		async: false,
		dataType: "json",
		success: function(data) {
//			console.log(data.data)
			for(var i = 0; i < 2; i++) {
				var aa = (data.data[i].createTime).substr(0, 10)
				var news = '';
				news += `
								<a onclick="onClickNewsCondition('id=${data.data[i].id}')"><div class="consulta" style="margin-top: 0;">
									<div class="consultas clearfix">
										<div class="consulta-l">
											<img src="${imgSrc}${data.data[i].newimg}" alt="" />
										</div>
										<div class="consulta-r">
											<p class='overels'>${data.data[i].headline}</p>
											<div class="consulta-pic clearfix">
												<p><i><img src="../../img/zixun.png" alt="" /></i> 咘噜教育</p>
												<span>${aa}</span>
											</div>
										</div>
									</div>
								</a>
						`
				$('#news').append(news)

			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//					alert("请求失败！");
		}
	});

});