$(function(){
spid=0;
personName=0;
userName=0; //用户评论的名字
headImg=0;
ispraise=0;
//		首页--精彩视屏页面
		$.ajax({
				type: "post",
				url: activeUrl+"/video/queryAllPage",
				data: {
					'type':1,
					'startPage':0,
					'endPage':3,
					'cid':zcid
				},
				async: false,
				dataType: "json",
				success: function(data) {
//					console.log(data.data)
					for(var i = 0; i < data.data.length; i++){

						var str=''
						str+=`
						<div class='gVideo' style='height:6.5rem;'>
							<a onclick="viewMovie('videoId=${data.data[i].id}')" style='display:inline-block;'>
								<div class="jcsps">
									<div class="jc-pic homeVideos">
										<img src='${imgSrc}${data.data[i].videoimg}' class='videoimg'/>
										<i class="plays"><img src="../../img/snajiao.png" alt="" /></i>
										<p class="clearfix"><img src="../../img/love.png" alt="" /> <span class="love-num">${data.data[i].like_number}</span></p>
									</div>
								</div>
							</a>
						</div>
						`
					}
					
					$('.home-video').append(str)
					
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开小差了 请稍后重试');
				}
			});
			

//	首页--精彩视屏--查看更多视屏
	$.ajax({
		type: "post",
		url: activeUrl+"/video/queryAllPage",
		data: {
			'type':1,
			'startPage':0,
			'endPage':5,
			'cid':zcid
		},
		async: false,
		dataType: "json",
		success: function(data) {
			for(var i = 0; i < data.data.length; i++) {
//				console.log(data.data[i])
				spid=data.data[i].id
				personName=data.data[i].upload_person
				ispraise=data.data[i].ispraise
//				console.log(ispraise)
				var moreVideo='';
				moreVideo+=`
					<a onclick="viewMovie('videoId=${data.data[i].id}')">
					<div class="videos jcsp">
						<div id="isPlay" class="stop"><img src="../../img/play.png" alt="" class="isplays" style='border-radius:0.4rem;' /></div>
							
							<img src='${imgSrc}${data.data[i].videoimg}'/>
						
						</div>
						<p class="p-description">
							${data.data[i].describes}
						</p>
						<div class="userinfos clearfix">
							<div class="userinfo-l">
								<span class="userinfo-data">${data.data[i].upload_time}</span>
							</div>
	
							<div class="userinfo-r">
								<a onclick="viewMovie('videoId=${data.data[i].id}')" class="zan"> <img src="../../img/hieixing1.png" alt="" class="img"/> <span class="z-num">${data.data[i].like_number}</span> </a>
								<a onclick="viewMovie('videoId=${data.data[i].id}')" class="pinglun "> <img src="../../img/pingluin.png" alt="" /> <span>${data.data[i].comentcount}</span> </a>
								<a onclick="viewMovie('videoId=${data.data[i].id}')" class="share"> <img src="../../img/zhuanfa.png" alt="" /> <span>${data.data[i].fxcount}</span> </a>
							</div>
						</div>
						</div>
						
					</div>
					</a>
					<div class="lines"></div>
				`
				$('#moreVideo').append(moreVideo)
				if(ispraise==1){ 
					$('.img').attr('src',"../../img/aixin.png")
				}
				else{
					$('.img').attr('src',"../../img/hieixing1.png")
				}
				
			}
			

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			mui.alert('服务器开小差了 请稍后重试');
		}
	});
	
	
//	精彩视频详情页面
///video/queryByid
	var videoId=getValue()['videoId']||''
//	console.log(videoId)
		$.ajax({
				type: "post",
				url: activeUrl+"/video/queryByid",
				data: {
					"id":videoId,
					"cid":zcid
				},
				async: false,
				dataType: "json",
				success: function(data) {
//					console.log(data.data)
//					for(var i=0; i<data.data.length; i++){
						ispraise=data.data.ispraise
						var str=''
						str+=`
							<div class="videos jcsp">
							<div id="isPlay" class="stop"><img src="../../img/play.png" alt="" class="isplays" style='border-radius:0.4rem;' /></div>
								<video class="video_show" id="video_show"  style="width:100%; height:100%; object-fit:fill;" controls poster="${imgSrc}${data.data.videoimg}">
									<source src="${data.data.link}" type="video/mp4" />
								</video>
							</div>
							
							<p class="p-description">
								${data.data.describes}
							</p>
							<div class="userinfos clearfix">
								<div class="userinfo-l">
									<span class="userinfo-data">${data.data.upload_person}  ${data.data.upload_time}</span>
								</div>
		
								<div class="userinfo-r">
									<a href="#" class="zan"> <img src="" alt=""  class="img"/> <span class="z-num">${data.data.like_number}</span> </a>
									<a href="#" class="pinglun comments"> <img src="../../img/pingluin.png" alt="" /> <span>${data.data.comentcount}</span> </a>
									<a onclick="shareWithSDK()" class="share"> <img src="../../img/zhuanfa.png" alt="" /> <span>${data.data.fxcount}</span> </a>
									
								</div>
							</div>
							
						`
//					}
					
					$('.gVideos').append(str)
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开小差了 请稍后重试');
				}
			});
			
// $('.userinfo-r').on('click','.zan',function(){
//	alert(44444)
// })
		//点击播放暂停
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

		//点赞状态
		//

		console.log(ispraise)
		if(ispraise==1){ 
			$('.img').attr('src',"../../img/aixin.png")
			}
		else{
			$('.img').attr('src',"../../img/hieixing1.png")
		}
		
		let likeType = true;
		if(ispraise==1){ 
			$('.img').attr('src',"../../img/aixin.png") 
			likeType=false
		}else{
			$('.img').attr('src',"../../img/hieixing1.png") 
			likeType=true
		}
//		if(ispraise==1){ likeType=}else{$('.img').attr('src',"../../img/heixing.png")}
		
//		$(document).on(".userinfo-r","click", ".zan", function() {
        $('.userinfo-r').on('click','.zan',function(){
        	
        	let zNum = $(this).find('.z-num');
            let znums=$(this).find('.z-num').text()
            console.log(likeType)
            if(likeType){
            	likeType=false;
            	$.ajax({
					type: "post",
					url: activeUrl+"/video/videoPraise",
					data: {
						"id":videoId,
						'cid':zcid
					},
					async: false,
					dataType: "json",
					success: function(data) {
						console.log(data)
			            $('.img').attr('src',"../../img/aixin.png")
			            zNum.html(++znums);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						mui.alert('服务器开小差了 请稍后重试');
					}
				})
            }else{
            	likeType=true;
            	
            	$.ajax({
					type: "post",
					url: activeUrl+"/video/videoCanclePraise",
					data: {
						"id":videoId,
						'cid':zcid
					},
					async: false,
					dataType: "json",
					success: function(data) {
						console.log(data)
							$('.img').attr('src',"../../img/hieixing1.png")
			                zNum.html(--znums);
			                
			
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						mui.alert('服务器开小差了 请稍后重试');
					}
				})
            }
        	
        
        })

		//
		//评论内容数组
		//
		let comments_arr = [
//			{
//				text:"我是第一条评论",
//				time:timestampToTime(Date.parse(new Date())),
//				name:"小金金",
//				headImg:"../../img/e.png"
//			}
		]

		//
		//渲染评论内容函数
		//

		function renderComments(){
			let commentsAll = "";
			for (let i in comments_arr){
				commentsAll+= `<div class="videosa">
					<p class="prent" style="font-size: 1rem;">
						<img style="vertical-align: middle !important; margin-right: 0.1rem;width: 1.8rem;
						height: 1.8rem; border-radius:50%;" src="${comments_arr[i].headImg}" />
						${comments_arr[i].name}
					</p>
					<p class="prents" style="width: 90%; margin-left: 2rem;">
						${comments_arr[i].text}
					</p>
					<p class="prents parent" style="width: 90%; margin-left: 2rem;">
						${comments_arr[i].time}
					</p>
				</div>`
			}
			$("#ping").html(commentsAll)
		}
		
	//时间戳转换日期
//		function timestampToTime(timestamp) {
//  		if(!timestamp){
//  			return 0
//  		}
//	        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
//	        var Y = date.getFullYear() + '-';
//	        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
//	        var D = date.getDate() > 10 ? date.getDate() + ' ' : '0' + date.getDate() + ' ';
//	        var h = date.getHours() > 10 ? date.getHours() + ':': '0' + date.getHours() + ':';
//	        var m = date.getMinutes() > 10 ? date.getMinutes() + ':' : '0' + date.getMinutes() + ':';
//	        var s = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();
//	        return Y+M+D+h+m+s;
//	    }
	//	评论列表数据请求
//		let timestamp = timestampToTime(Date.parse(new Date())); //获取当前时间
		
		function pl(){
			$.ajax({
				type: "post",
				url: activeUrl+"/video/videoCommentListById",
				data: {
					'id':videoId,
					'startPage':0,
					'endPage':20
				},
				async: false,
				dataType: "json",
				success: function(data) {
					userName=data.data.user_name
					for(let i in data.data){
						comments_arr.splice(0,0,{
							text:data.data[i].content,
							time:data.data[i].comment_time,
							name:data.data[i].user_name,  //用户名,
							headImg:imgSrc+data.data[i].picture   //用户头像
						})
						renderComments();
					}
					
					$(".pl-text").val('');
					$(".comments-text-wrap").hide();
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开小差了 请稍后重试');
				}
			});
		}
		pl()
		
		//
		//点击评论
		//
//		$('.userinfo-r').on('click','.zan',function(){
		$("#send_link").on("click",function(){
			let textVal = $(".pl-text").val();
			if(textVal == "") return ycTips("请输入评论内容再发表");
			$.ajax({
				type: "post",
				url: activeUrl+"/video/videoCommentAdd",
				data: {
					'cid':zcid,
					'id':videoId,
					'content':textVal
				},
				async: false,
				dataType: "json",
				success: function(data) {
						console.log(data)
						comments_arr = [];
						pl()
				//		comments_arr.splice(0,0,{
//							text:textVal,
//							time:timestamp,
//							name:userName,  //用户名,
//							headImg:"../../img/e.png"   //用户头像
//						})
//						renderComments();
//						$(".pl-text").val('');
//						$(".comments-text-wrap").hide();
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					mui.alert('服务器开小差了 请稍后重试');
				}
			});
			
		})

		//
		//点击出现评论框
        //
        
		$(".comments").on("click",function(){
			$(".comments-text-wrap").show();
		})
    
})





