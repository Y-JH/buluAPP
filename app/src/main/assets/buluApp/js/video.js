$(function(){
	//点击播放暂停
	$('.stop').click(function() {
		var video = $('.video_show')
		if(video[0].paused) {
			video[0].play()
			$('.isplays').attr('src', '../../img/paused.png')
		} else {
			video[0].pause();
			$('.isplays').attr('src', '../../img/play.png')
		}
	})
	
		function praisebox() {
				//获取赞数量容器
				var praise = document.getElementsByClassName("zan-num")[0];
				console.log(praise)
				//获取容器当前total值
				var total = parseInt(praise.getAttribute("total"));

				//创建一个新的total存储用
				var newtotal;
				//判断点击的文字内容
				if($('zan-img').attr('src', '../../img/aixin.png')) {
					//total值+1 因为我还没点击赞，所以要点击的时候就多了一个人 total+1
					newtotal = total + 1;
					praise.innerHTML = newtotal
					//                      praise.innerHTML = newtotal == 1 ? "我觉得很赞": "我和" + total + "个人觉得很赞";
					//                      el.innerHTML = "取消赞";
				} else {
					//反之total值-1
					newtotal = total - 1;
					praise.innerHTML = newtotal
					$('zan-img').attr('src', '../../img/aixin.png')
				}
				//更新total值
				praise.setAttribute("total", newtotal);

			}

			//操作回复
			function operateReply(el) {
				//留言板的内容
				var liuyan = $('.pl-text').val()
				//留言区内容
				var liuyanqu = $('.prents')

				liuyanqu.text(liuyan)
			}

			var lists = $('#pn').children()
			console.log(lists)
			//遍历所有状态消息
			for(var i = 0; i < lists.length; i++) {
				//全部事件代理
				lists[i].onclick = function(e) {
					//获取当前点击事件
					var e = e || window.event;
					var el = e.srcElement;
					if(!el) {
						el = e.target; //兼容火狐
					}
					//判断点击的类名
					switch(el.className) {
						//关闭整个状态
						case "pinglun":
							$('.textareas').show()
							break;
							//上面的点赞
						case "zan":
							praisebox();
							break;
							//回复点击评论
						case "pl-send":
							operateReply();
							$('.textareas').hide()
							break;
					}
				}
			}
})
