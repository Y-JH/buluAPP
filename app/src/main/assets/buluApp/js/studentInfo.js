$(function(){
	//明星学员详情  starStudent/updateStudentById
			var  studentId= getValue()['id'] || ''; 
			
			$.ajax({
				type: "post",
				url: activeUrl+"/starStudent/queryById",
				data: {
					"id": studentId,
					"xyid":xyid
				},
				async: false,
				dataType: "json",
				success: function(data) {
						var datas=data.data
						var studentIds=datas.studentinfo.id
						console.log(datas)
//						var studentIds=data.data
//						banner详情页
							var stuBanner='';
							stuBanner+=`
									<a  class=" mui-icon mui-icon-left-nav mui-pull-left config-return" href="javascript:history.back(-1)" style="color: rgb(102,102,102);"></a>
									<div class="banners"><img src="${imgSrc}${datas.studentinfo.cover}" alt="" class='stuImg'/></div>
									<div class="banner-mask">
										<span class="bulu-name">${datas.studentinfo.studentName}</span>
										<span class="bulu-names">${datas.studentinfo.label}</span>
									</div>
							`
							if(datas.studentinfo.cover==' '){
								$('.stuImg').attr('src','../../img/xueyuan1.png')
							}
							$('#stuBanner').append(stuBanner)
							
//						学员简介详情页
							var stuIntroduce=''
							stuIntroduce+=`
									<div class="jieshao">
										<img src="../../img/shu.png" alt="" />
										<span>教学亮点</span>
									</div>
									<p class="jieshao-text">
										${datas.studentinfo.profile}
									</p>
									
							`
							$('#stuIntroduce').append(stuIntroduce)
							
//						学员亮点
							var process=''
							process+=`
									<div class="jieshao">
										<img src="../../img/shu.png" alt="" />
										<span>教学亮点</span>
									</div>
									<p class="jieshao-text">
										${datas.studentinfo.process}
									</p>
							`
							$('#process').append(process)
							console.log( datas.zplist[0].id )
	//						明星学员作品
							var xyzp=''
							xyzp+=`
								<a href='../me/greatvideo.html?videoId=${datas.zplist[0].id}'>
									<div class="jieshao" style='margin-bottom:0.5rem;'>
										<img src="../../img/shu.png" alt="" />
										<span>学员作品</span>
									</div>
									<div class="videos jcsp">
									<div id="isPlay" class="stop"><img src="../../img/play.png" alt="" class="isplays" /></div>
										<video class="video_show" id="video_show" controls poster="${imgSrc}${datas.zplist[0].videoimg}">
											<source src="${datas.zplist[0].link}" type="video/mp4" />
										</video>
					
									</div>
									<p class="p-description">
										${datas.zplist[0].describes}
									</p>
									<div class="userinfos clearfix">
										<div class="userinfo-l">
											<span class="userinfo-name">${datas.zplist[0].upload_person}</span>
											<span class="userinfo-data">${datas.zplist[0].upload_time}</span>
										</div>
					
										<div class="userinfo-r">
											<a href="../me/greatvideo.html?videoId=${datas.zplist[0].id}" class="zan"> <img src="../../img/aixin.png" alt="" class="img" /> <span class="z-num">${datas.zplist[0].like_number}</span> </a>
											<a href="../me/greatvideo.html?videoId=${datas.zplist[0].id}" class="pinglun"> <img src="../../img/pingluin.png" alt="" /> <span>${datas.zplist[0].comentcount}</span> </a>
											<a href="../me/greatvideo.html?videoId=${datas.zplist[0].id}" class="share"> <img src="../../img/zhuanfa.png" alt="" /> <span>${datas.zplist[0].fxcount}</span> </a>
										</div>
									
					
									</div>
								</a>
							`
							$('.xyzp').append(xyzp)
						
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开销差了 请稍后重试');
				}
				
			});

			
//			明星教师详情
			var  teacherId= getValue()['id'] || ''; 
			$.ajax({
				type: "post",
				url: activeUrl+"/starTeachers/queryById",
				data: {
					"id": teacherId
				},
				async: false,
				dataType: "json",
				success: function(data) {
						var data=data.data
//						banner详情页
							var teaban='';
							teaban+=`
									<a  class=" mui-icon mui-icon-left-nav mui-pull-left config-return" href="javascript:history.back(-1)" style="color: rgb(102,102,102);"></a>
									<div class="banners"><img src="${imgSrc}${data.cover}" alt="" class='teaImg'/></div>
									<div class="banner-mask">
										<span class="bulu-name">${data.teachername}</span>
										<span class="bulu-names">${data.label}</span>
									</div>
							`
							if(data.cover==' '){
								$('.teaImg').attr('src','../../img/jiaoshi1.png')
							}
							$('#banner').append(teaban)
							
//						老师简介详情页
							var introduce=''
							introduce+=`
									<div class="jieshao">
										<img src="../../img/shu.png" alt="" />
										<span>老师简介</span>
									</div>
									<p class="jieshao-text" >
										${data.introduce}
									</p>
									
							`
							$('#introduce').append(introduce)
							
//						教师亮点
							var lightspot=''
							lightspot+=`
									<div class="jieshao">
										<img src="../../img/shu.png" alt="" />
										<span>教学亮点</span>
									</div>
									<p class="jieshao-text">
										${data.lightspot}
									</p>
							`
							$('#lightspot').append(lightspot)
						
//						
					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开销差了 请稍后重试');
				}
				
			});
			
		
})
