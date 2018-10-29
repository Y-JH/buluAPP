//	首页--bannerInfo页面请求
	var  bannerId= getValue()['id'] || ''; 
	$.ajax({
		type: "post",
		url: activeUrl+"/bananer/queryById",
		data: {
			"id":bannerId
		},
		async: false,
		dataType: "json",
		success: function(data) {
//			console.log(data)
				var bannerImg = ''
				var bannerCon = ''
				var bannerTit= ''
				bannerImg += `
								<img src="${imgSrc}${data.data.bimgurl}" alt="" class="banner-img"/>
							`
				bannerCon +=`
								<li>
									<img src="../../img/shu.png" alt="" />
									<span>
										${data.data.ext1}
									</span>
									<p>
										${data.data.bintro}
									</p>
								</li>
				`
				bannerTit +=`
							<h1 class="mui-title">${data.data.ext1}</h1>
				`
				$('.banner-tit').append(bannerTit)
				$('.banner-img').append(bannerImg)
				$('.banner-con').append(bannerCon)

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			mui.alert('服务器开小差了 请稍后重试');
		}
	});