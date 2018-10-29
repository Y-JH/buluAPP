$(function(){
	var newsInfoId = getValue()['id'] || ''; 
			$.ajax({
				type: "post",
				url: activeUrl+"/news/queryById",
				data: {
					'id':newsInfoId
				},
				async: false,
				dataType: "json",
				success: function(data) {
						console.log(data.data)
						var createTime=( data.data.createTime ).substr(0,10);
						var consulta='';
							newsInfoId+=`
								<p class="news-title">${data.data.headline}</p>
								<div class="new-data">${createTime}</div>
								<img src="${imgSrc}${data.data.content}" alt="" />	
								
							`
							$('#newsInfoId').append(newsInfoId)


					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开销差了 请稍后重试');
				}
			});
})
