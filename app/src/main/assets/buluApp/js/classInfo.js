$(function(){
	
			mui.plusReady(function() {

				$('.book-class').click(function() {
					$('.massage').show()
					$('html').css('overflow','hidden')
				})
				
				$('.iknow').click(function(){
					$('.tips').hide()
				})

			})
			
			var classInfoId = getValue()['id'] || ''; 

			$.ajax({
				type: "post",
				url: activeUrl+"/course/queryById",
				data: {
					"id": classInfoId,
					"cid":zcid
				},
				async: false,
				dataType: "json",
				success: function(data) {
	
							if(data.data.course.id==classInfoId){
//								console.log(data.data.course)
								$('.kc-title').text(data.data.course.courseName)
								
								var kcxq=''
								kcxq+=`								
									<div class="kc-img"><img src="${imgSrc}${data.data.course.file}" alt="" /></div>
									<p>
										${data.data.course.courseDescription}
									</p>
								`
								$('.kc-info').append(kcxq)

								for(var i=0;i<data.data.demolist.length;i++){
									
									var stk='';
									stk+=`
										<p>课程：<span class="stk">${data.data.demolist[i].demo_lesson}</span></p>
										<p>教师：<span class="teachers">${data.data.demolist[i].listen_teacher}</span></p>
										<p>地址：<span class="address">${data.data.demolist[i].address}</span></p>
										<p>
											<span class="datas">${data.data.demolist[i].end_date}</span>
										</p>
										<a class="appointment book-class"><img src="../../img/yuyue.png" alt="" class='yuImg'/></a>
									`
									$('.kc').append(stk)
									console.log(data.data.demolist[i].sfyy)
									if(data.data.demolist[i].sfyy> 0){
//									
										$('.yuImg').attr('src','../../img/yiyueyue.png')
									}else{
										$(document).on("click", ".yuImg", function() {
											$('.massage').show()
											$(document).on("click", ".affirm", function() {
									//			弹窗确认
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
															"stkid":classInfoId,
															"cid": zcid,
															"xyid":xyid,
															"name":names,
															"tel":tells
														},
														success: function(data) {
															console.log(data)
															mui.confirm(data.msg, '提示', ['我知道了'], null)
															$('.yuImg').attr('src','../../img/yiyueyue.png')
															$('.massage').hide()
														}
													})
													$('.yuImg').attr('src','../../img/yueyue.png')
										
											});
										});
									}
									
//									弹窗取消
										$(document).on('click','.cancels',function(){
											$('.massage').hide()
										})
								}
							
								for(var i=0;i<data.data.videolist.length;i++){
									console.log(data.data.videolist[i].link)
									var str=''
									str+=`
										<div id="isPlay" class="stop"><img src="../../img/play.png" alt=""  class="isplays"/></div>
										<video class="video_show" id="video_show" controls  style="width:100%; height:100%; object-fit:fill;" poster="${imgSrc}${data.data.videolist[i].videoimg}">
										<source src="${data.data.videolist[i].link}"  type="video/mp4" />
										</video>
									`
									$('.sksj').append(str)
								}
								
							}

					},
					
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开小差了 请稍后重试');
				}
			});
			
		$(document).on('click','.stop',function(){
		
		 	var video = $('.video_show')
		 	if(video[0].paused) {
		 		video[0].play()
		 		$('.isplays').attr('src', '../../img/paused.png')
		 	} else {
		 		video[0].pause();
		 		$('.isplays').attr('src', '../../img/play.png')
		 	}
	 	
		})
			

})
	