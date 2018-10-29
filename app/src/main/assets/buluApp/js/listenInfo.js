	$(function(){

//		试听课
			$.ajax({
				type: "post",
				url: activeUrl+"/demoClass/queryAllPage",
				data: {
					"startPage":0,
					"endPage":10,
					"cid":zcid
				},
				async: false,
				dataType: "json",
				success: function(data) {
					console.log(data)
						
						for(var i = 0; i < data.data.length; i++) {
							
							var start_date=data.data[i].start_date.substr(0,10)
							var start_dates=data.data[i].start_date.substr(10)
							var end_date=data.data[i].end_date.substr(10)
							var tea=''
							tea+=`
								<div class="hui-bg">
									<h5>${data.data[i].demo_lesson}</h5>
									<p>教师：<span>${data.data[i].listen_teacher}</span></p>
									<p>地址：<span>${data.data[i].address}</span></p>
									<p>
										<span class="st-time">${start_date}</span>
										<span class="st-time">${start_dates}-${end_date}</span>
									</p>
								`
						if( data.data[i].sfyy> 0){
							tea+=`<button class="subscribe yyBtn" disabled="disabled" style='background:gray;' data-id=${data.data[i].id}>已预约</button>`
						}
						else{
							tea+=`<button class="subscribe yyBtn" data-id=${data.data[i].id}>预约</button>`
						}
							tea+=`</div>`
								
								
								
							
							$('.stk-class').append(tea)

	
					}
					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开小差了 请稍后重试');
				}
			});
			
//		试听课列表
			
			$(document).on("click", ".subscribe", function() {
			
			var dataId=$(this).attr('data-id')
			$('.massage').show()
			
//			弹窗确认
			$(document).on('click','.affirm',function(){
				var names=$('.names').val()
				var tells=$('.tells').val()
				if(!names) {
					ycTips('姓名不能为空', "确定")
					return false;
				}
				if(!/^1[3,5,6,4,7,8]\d{9}$/.test(tells)) {
					ycTips('请输入正确的手机号', '确定')
					return false;
				}
				$.ajax({
					url: activeUrl + "/demoClass/Yystk",
					type: "post",
					data: {
						"stkid":dataId,
						"cid": zcid,
						"xyid":xyid,
						"name":names,
						"tel":tells
					},
					success: function(data) {
						console.log(data)
						mui.confirm(data.msg, '提示', ['我知道了'], null)
						$('.massage').hide()
					}
				})
			})
			
//			弹窗取消
			$(document).on('click','.cancels',function(){
				$('.massage').hide()
			})
//			
		});
			
	

})