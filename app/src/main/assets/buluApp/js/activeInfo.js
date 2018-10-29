$(function(){
	//	演出详情详情页面请求  
		var activeId = getValue()['id'] || ''; 
//		var activeUrl="http://192.168.0.159:8080"
		$.ajax({
				type: "post",
				url: activeUrl+"/ActivitiesPerformed/queryById",
				data: {
					id:activeId
				},
				async: false,
				dataType: "json",
				success: function(data) {
		
						var activeList='';
						activeList+=`
									<div class="clearfix activebox">
										<p class='active-imgs'><img src="${imgSrc}${data.data.activitieCover}" alt="" class=""/></p>
										<div class="yanList-r clearfix">
											<p class="new-tit">${data.data.activityName}</p>
											<p>演出时间：<span class="yanchu-time">${data.data.time}</span>
											</p>
											<p><i>票务信息：</i><span class="yanchu-time">10:00</span>
												<span>14:30</span>
												<span>19:00</span>
											</p>
											<p>演出剧场：<span class="jc">${data.data.theater}</span></p>
											<p>剧场地址：<span class="dz">${data.data.theatreAddress}</span></p>
											<p class="ticketing clearfix">
												<span class="piaowu">票务信息：</span><span class="xx yuanjia">${data.data.ticketInformation}</span>
											</p>
											<p>特别提示：<span>儿童成人均需购票入场,时间以现场为准</span></p>
										</div>
									</div>
						`
						$('#activeList').append(activeList)
						
						var jqjs='';
						jqjs+=`
							<img src="${imgSrc}${data.data.detail}" style='width:100%;display;block;' />
						`
						$('.jqjs').append(jqjs)
						
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				mui.alert('服务器开小差了 请稍后重试');
			}
		});
})
