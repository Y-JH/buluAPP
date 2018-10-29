$(function() {
	//myjob.html 个人资料 
	function myjob(b){
		$.ajax({
			type: "post",
			url: activeUrl + "/xxtd/xxtdZyList",
			data: {
				"xyid": xyid,
				"state": b,
				"startPage": 0,
				"endPage": 4
			},
			async: false,
			dataType: "json",
			success: function(data) {
//				console.log(data)
				if(b == 0) {
					$('.mydai').html('')
					for(var i = 0; i < data.data.length; i++) {
						var newdateu = (data.data[i].date).substr(0, 16)
						var newdatei = (data.data[i].time_bucket).substr(11, 5)
						var sda = ''
						sda += `<li class="mui-table-view-cell" style="line-height: 1.5rem;">
								<div class="main_booking ">
									<h4 class="her">${data.data[i].class_name}   ${data.data[i].class_hour}</h4>
									<p>讲课老师: ${data.data[i].teachername}${data.data[i].assistantname}</p>
									<p>教室: 教学楼${data.data[i].classroom}</p>
									<p>学生: ${data.data[i].study}</p>
									<p>作业要求: ${data.data[i].lesson_summary}</p>
									<p style="color: rgb(153,153,153);">${newdateu}-${newdatei}</p>
								</div>
							</li>
							<div class="profile-photo">
					<div class="head-photos"><img src="../../img/camera.png" /></div>
					上传作业
				</div>`
						$('.mydai').append(sda)

					}
				} else {
					$('.myyi').html('')
					for(var i = 0; i < data.data.length; i++) {
						var sdb = ''
						sdb += `<div class="scrolls dianping">
						<ul class="mui-table-view booking">
							<li class="mui-table-view-cell" style="line-height: 1.5rem;">
								<div class="main_booking ">
									<h4 class="her">声乐一班   声乐基础教学</h4>
									<p>讲课老师: 李薇薇、李洋</p>
									<p>教室: 教学楼302</p>
									<p>学生: 王梓欣</p>
									<p style="color: rgb(153,153,153);">2018-06-18 14:30-16:30</p>
								</div>
							</li>
						</ul>
						<img class="dianpings" src="../../img/jiaji.png" />
					</div>
					<div class="hr" style="width: 95%; height: 0.1rem; border-bottom: 0.1rem solid #EEEEEE; margin: 0 auto;"></div>
					<div class="scrolls">
						<ul class="mui-table-view booking">
							<li class="mui-table-view-cell" style="line-height: 1.5rem;">
								<div class="main_booking ">
									<p class="vide">作业描述: 这是奶奶监督我完成作业，还帮我拍的视频</p>
									<div class="videos">
										<img src="../../img/fengmian3.png" />
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="hr" style="width: 95%; height: 0.1rem; border-bottom: 0.1rem solid #EEEEEE; margin: 0 auto;"></div>
					<div class="scrolls">
						<ul class="mui-table-view booking">
							<li class="mui-table-view-cell" style="line-height: 1.5rem;">
								<p class="vide">作业点评: 王梓欣上课很认真，完成的非常好，课后作业也完成的非常好，每节课都积极发言，很勇敢的 展现自己，希望以后继续保持！
								</p>
							</li>
						</ul>
					</div>
					<div class="liness"></div>
					<div class="hr" style="width: 95%; height: 0.1rem; border-bottom: 0.1rem solid #EEEEEE; margin: 0 auto;"></div>
					<div class="scrolls dianping">
						<ul class="mui-table-view booking">
							<li class="mui-table-view-cell" style="line-height: 1.5rem;">
								<div class="main_booking ">
									<h4 class="her">声乐一班   声乐基础教学</h4>
									<p>讲课老师: 李薇薇、李洋</p>
									<p>教室: 教学楼302</p>
									<p>学生: 王梓欣</p>
									<p style="color: rgb(153,153,153);">2018-06-18 14:30-16:30</p>
								</div>
							</li>
						</ul>
						<img class="dianpings" src="../../img/dianping.png" />
					</div>
					<div class="hr" style="width: 95%; height: 0.1rem; border-bottom: 0.1rem solid #EEEEEE; margin: 0 auto;"></div>
					<div class="scrolls">
						<ul class="mui-table-view booking">
							<li class="mui-table-view-cell" style="line-height: 1.5rem;">
								<div class="main_booking ">
									<p class="vide">作业描述: 这是奶奶监督我完成作业，还帮我拍的视频</p>
								</div>
							</li>
						</ul>
					</div>
					<div class="mui-slider-item mui-control-content mui-active mobile" style="margin-left: 1rem !important;">
						<ul class="mui-table-view mui-grid-view mui-grid-9 ss">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3 jcsps">
								<img src="../../img/fengmian1.png" alt="" />
							</li>
						</ul>
					</div>
					<div class="hr" style="width: 95%; height: 0.1rem; border-bottom: 0.1rem solid #EEEEEE; margin: 0 auto;"></div>
					<div class="publish">
						<textarea id="hcqk" class="form" rows="5" placeholder="作业点评:请填写作业点评"></textarea>
					</div>
					<div class="liness"></div>
					<div class="publish">

					</div>`
						$('.myyi').append(sdb)
					}
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("服务器开小差了 请稍后重试！");
			}
		});
	}
	myjob(0)
	
	//dianji
	$('.fafa').click(function() {
		var state = $(this).attr('datas_type')
		myjob(state)
	})
})