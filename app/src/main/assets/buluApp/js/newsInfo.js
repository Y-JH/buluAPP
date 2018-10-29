$(function(){
//	新闻详情
			$.ajax({
				type: "post",
				url: activeUrl+"/news/queryAllPage",
				data: {
					"startPage":0,
					"endPage":10,
					"cid":zcid,
					"xyid":xyid
				},
				async: false,
				dataType: "json",
				success: function(data) {
						for(var i = 0; i <data.data.length; i++) {
							console.log(data.data[i].id)
							var datacreat=(data.data[i].createTime).substr(0,10)
							var consulta='';
							consulta+=`
								<a href="newCondition.html?id=${data.data[i].id}"><div class="consulta" style="margin-top: 0;">
									<div class="consultas clearfix">
										<div class="consulta-l">
											<img src="${imgSrc}${data.data[i].content}" alt="" />
										</div>
										<div class="consulta-r">
											<p class='overels'>${data.data[i].headline}</p>
											<div class="consulta-pic clearfix">
												<p><i><img src="../../img/zixun.png" alt="" /></i> 咘噜教育</p>
												<span>${datacreat}</span>
											</div>
										</div>
									</div>
								</a>
								
							`
							$('#consulta').append(consulta)
						}
							
					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}
			});
	
	//--------------上拉加载更多---------------
	
		    //获取滚动条当前的位置
		    $(function(){
			    //滚动事件触发
			    window.onscroll = function () {
//			    	alert(1)
					var timer = null;
			        if (getScrollTop() + getClientHeight() === getScrollHeight()) {
			        	
			        	if(timer){
			                clearTimeout(timer);
			            }
			            timer = setTimeout(function(){
			               	ycTips('在这里加载数据咯！');
			                news()
			                
			            },2000);
			            
			            
			        }
			   	 };
		    })
	
})
