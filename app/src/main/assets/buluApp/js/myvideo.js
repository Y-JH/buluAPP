$(function() {
	//实现全选反选
	$("#theadInp").on('click', function() {
		$("ul li input:checkbox").prop("checked", $(this).prop('checked'));
	})
	$("ul li input:checkbox").on('click', function() {
		//当选中的长度等于checkbox的长度的时候,就让控制全选反选的checkbox设置为选中,否则就为未选中
		if($("ul li input:checkbox").length === $("ul li input:checked").length) {
			$("#theadInp").prop("checked", true);
		} else {
			$("#theadInp").prop("checked", false);
		}
	})

$('.inpt, .quanxuan').hide()
$("#bian").click(function(e) {

	if( $(".quanxuan").css("display") == "none") {
		$('.inpt').show()
		$(this).html('完成')
		$('.quanxuan').show()
	} else {
		$(this).html('编辑')
		$('.quanxuan').hide()
		$('.inpt').hide()
	}
});
$('.delete').click(function(){
	
	if( $('.inpt').is(':checked')) {
		
    	$(that).parent().remove();
    	
	}
})
	function activeVideo(videoType,startPages,endPage){
		$.ajax({
				type: "post",
				url: activeUrl + "/mine/VideoList",
				data: {
					"cid": zcid,
					"xyid": xyid,
					"type": videoType,
					"startPage": startPages,
					"endPage":endPage
				},
				async: false,
				dataType: "json",
				success: function(data) {
					if(videoType == 0) {
						$('.myfabu').html('')
						for(var i = 0; i < data.data.length; i++) {
							var stq = ''
							stq += `
							<li class="mui-table-view-cell mui-media jcsps" style='width:33.3%; height:7rem;'>
								<a href='greatvideo.html?videoId=${data.data[i].id}' class="a">
									<img src="${imgSrc}${data.data[i].videoimg}" alt="" />
								</a>
								
								<p class="clearfix" class="p"><img src="../../img/love.png" alt=""  class="img"/> <span class="z-num love-num">${data.data[i].like_number}</span></p>
							</li>
							`
							$('.myfabu').append(stq)
	
						}
					} else {
						$('.mylike').html('')
						for(var i = 0; i < data.data.length; i++) {
							var stp = ''
							stp += `<li class="mui-table-view-cell mui-media jcsps" style='width:33.3%; height:7rem;'>
								<a href='greatvideo.html?videoId=${data.data[i].id}' class="a">
									<img src="${imgSrc}${data.data[i].videoimg}" alt="" />
								</a>
								
								<p class="clearfix" class="p"><img src="../../img/love.png" alt=""  class="img"/> <span class="z-num love-num">${data.data[i].like_number}</span></p>
							</li>`
							$('.mylike').append(stp)
						}
						
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("服务器开小差了 请稍后重试！");
				}
			});
		
	}
	activeVideo(0,0,10)
	

//	myVideo.html 我的视频 
	$('.hh').click(function() {
		var types = $(this).attr('data_type')
		activeVideo(types,0,10)
	})

})