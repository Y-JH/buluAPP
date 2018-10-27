var activeUrl="http://c.service.bulu.aikaoen.com/buluc";
var activeZq="http://c.service.bulu.aikaoen.com/buluc/";

function getValue(){
  var str = decodeURIComponent( window.location.search ),
    obj = {},
    item = [];
  if(str && ~str.indexOf('?')){ str = str.slice(1) }  
  if(str !=null && str !=""){
    if(str.indexOf("&") != -1){
      item = str.split("&");
      for(var i=0;i<item.length;i++){
        var itemValue = item[i].split("=");
        obj[itemValue[0]]=itemValue[1];
      }
    }else{
      item = str.split("=");
      obj[item[0]]=item[1];
    }
    return obj;
  }
}
$(function() {
//	首页-请求课程按钮
	var str= document.getElementsByClassName('class-item')
	
	$.ajax({
		type: "post",
		url: activeUrl+"/course/queryAll",
		data: {
			
		},
		async: false,
		dataType: "json",
		success: function(data) {
			//console.log(data)
			for(var i = 0; i < data.data.length; i++) {
//				console.log(data.data[i].id)
				var str = ''
				str += `
								<dl class="class-item">
									<dt>
										<a onclick="onClickClassButton('id=${data.data[i].id}')"  class='class-items'>
											<img src="../../img/ke1.png" alt="" />
										</a>
									</dt>
									<dd>${data.data[i].courseName}</dd>
								</dl>
								`
				//							str+="<dl class='class-item'><dt><a href='classInfo.html?id=' "+data.data[i].id+" class='class-items'><img src='../../img/ke1.png' alt='' /></a></dt><dd>"+data.data[i].courseName+"</dd></dl>"
				$('.pic-class').append(str)
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求失败！");
		}
	});
	
//	首页--活动演出页面  ActivitiesPerformed/queryAll
		
		$.ajax({
			type: "post",
			url: activeUrl+"/ActivitiesPerformed/queryAll",
			data: {
				
			},
			async: false,
			dataType: "json",
			success: function(data) {
				console.log(data.data[0].activitieCover)
				for(var i = 0; i <4; i++) {
					var act='';
					console.log(act.length)
					
					act+=`
							<dl class="yc-info" onclick="onClickPerformItem('id=${data.data[i].id}')">
								<dt><a ><img src="${activeUrl}${data.data[i].activitieCover}" alt="" /></a></dt>
								<dd>${data.data[i].activityName}</dd>	
							</dl>
					`
					$('#active').append(act)
				}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("请求失败！");
		}
	});
	
	//	首页跳转进来--活动演出-更多-列表  ActivitiesPerformed/queryAll

		$.ajax({
				type: "post",
				url: activeUrl+"/ActivitiesPerformed/queryAll",
				data: {
					
				},
				async: false,
				dataType: "json",
				success: function(data) {
					console.log(data);
					for(var i=0;i<data.data.length;i++){
						Date.prototype.toLocaleString = function() {
								return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
							};
						var unixTimestamp = new Date( data.data[i].time  ) ;//获取日期
								commonTime = unixTimestamp.toLocaleString();
						var actMore='';
						actMore+=`
									<div class="bc-center clearfix">
										<a onclick="window.android.showAndroidNewFirstPage('file:///android_asset/buluApp/templates/home/activeInfo.html?id=${data.data[i].id}')" class="yanList-l"> <img src="../../img/yanchu.png" alt="" /> </a>
										<div class="yanList-r">
											<h5>《${data.data[i].activityName}》</h5>
											<p>演出时间：<span class="yanchu-time">${commonTime}</span>
											</p>
											<p><i class='visibs'>票务信息：</i><span class="yanchu-time">${commonTime}</span>

											</p>
											<p>演出剧场：<span class="jc">${data.data[i].theater}</span></p>
											<p>剧场地址：<span class="dz">${data.data[i].theatreAddress}</span></p>
										</div>
									</div>
									<div class="lines" style="margin-top: 0rem;">
									</div>
						`
						$('#actMore').append(actMore)
					}
					
	//				
	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("请求失败！");
			}
		});
		
		//	首页--演出详情详情页面请求  
//		$.ajax({
//				type: "post",
//				url: activeUrl+"/ActivitiesPerformed/queryById",
//				data: {
//					
//				},
//				async: false,
//				dataType: "json",
//				success: function(data) {
//					console.log(data)
//					for(var i=0;i<data.data.length;i++){
//						var activeList='';
//						activeList+=`
//									<div class="clearfix">
//										<img src="../../img/news.png" alt="" class="active-img"/>
//										<div class="yanList-r clearfix">
//											<p class="new-tit">《咘噜戏剧教育之深海奇遇记》</p>
//											<p>演出时间：<span class="yanchu-time">2018-8-24</span>
//											</p>
//											<p><i>票务信息：</i><span class="yanchu-time">10:00</span>
//												<span>14:30</span>
//												<span>19:00</span>
//											</p>
//											<p>演出剧场：<span class="jc">北京东图剧场</span></p>
//											<p>剧场地址：<span class="dz">东城区交道口东大街85号</span></p>
//											<p class="ticketing clearfix">
//												<span class="piaowu">票务信息：</span><span class="xx yuanjia">原价：90元  180元 280元</span><br /><span class="transp">票务信息：</span><span class="xx zhekou">六折：54元  108元 168元(购买180元及280元档演出票两张以上可赠公仔一个)</span>  
//											</p>
//											<p>特别提示：<span>儿童成人均需购票入场,时间以现场为准</span></p>
//										</div>
//									</div>
//						`
//						$('#activeList').append(activeList)
//					}
//					
//	//				
//	
//			},
//			error: function(XMLHttpRequest, textStatus, errorThrown) {
//				alert("请求失败！");
//			}
//		});
//	
//	首页--新闻页面数据请求


		$.ajax({
				type: "post",
				url: activeUrl+"/news/queryAll",
				data: {
					
				},
				async: false,
				dataType: "json",
				success: function(data) {
						console.log(data.data)
						for(var i = 0; i <2; i++) {
							Date.prototype.toLocaleString = function() {
          			return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
   			 			};
							var unixTimestamp = new Date( data.data[i].createTime  ) ;//获取日期
								commonTime = unixTimestamp.toLocaleString();
							var news='';
							news+=`
								<a onclick="onClickNewsItem('id=${data.data[i].id}')"><div class="consulta" style="margin-top: 0;">
									<div class="consultas clearfix">
										<div class="consulta-l">
											<img src="../../img/zixun1.png" alt="" />
										</div>
										<div class="consulta-r">
											<p class='overels'>${data.data[i].headline}</p>
											<div class="consulta-pic clearfix">
												<p><i><img src="../../img/zixun.png" alt="" /></i> 咘噜教育</p>
												<span>${commonTime}</span>
											</div>
										</div>
									</div>
								</a>
							`
							$('#news').append(news)
//							var textLen=$('.overels').text().length							
//							var maxwidth=20;
//							if(textLen.length>maxwidth){
//									textLen.substring(0,maxwidth);
//									textLen.text(textLen.text()+'...');
//								}

						}
							
					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}
			});
//			首页--新闻动态--列表页
			$.ajax({
				type: "post",
				url: activeUrl+"/news/queryAll",
				data: {
					
				},
				async: false,
				dataType: "json",
				success: function(data) {
						console.log(data.data)
						for(var i = 0; i <data.data.length; i++) {
							Date.prototype.toLocaleString = function() {
          			return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
   			 			};
							var unixTimestamp = new Date( data.data[i].createTime  ) ;//获取日期
									commonTime = unixTimestamp.toLocaleString();
							var consulta='';
							var fileUrl="file:///android_asset/buluApp/templates/home/newCondition.html?id=${data.data[i].id}";
							consulta+=`
								<a onclick="window.android.showAndroidNewFirstPage('file:///android_asset/buluApp/templates/home/newCondition.html?id=${data.data[i].id}')"><div class="consulta" style="margin-top: 0;">
									<div class="consultas clearfix">
										<div class="consulta-l">
											<img src="../../img/zixun1.png" alt="" />
										</div>
										<div class="consulta-r">
											<p class='overels'>${data.data[i].headline}</p>
											<div class="consulta-pic clearfix">
												<p><i><img src="../../img/zixun.png" alt="" /></i> 咘噜教育</p>
												<span>${commonTime}</span>
											</div>
										</div>
									</div>
								</a>
								
							`
							$('#consulta').append(consulta)
//							var textLen=$('.overels').text().length							
//							var maxwidth=20;
//							if(textLen.length>maxwidth){
//									textLen.substring(0,maxwidth);
//									textLen.text(textLen.text()+'...');
//								}

						}
							
					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}
			});
			
//			新闻详情页面
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
								Date.prototype.toLocaleString = function() {
          			return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
   			 			};
							var unixTimestamp = new Date( data.data.createTime  ) ;//获取日期
									commonTime = unixTimestamp.toLocaleString();
							var consulta='';
							newsInfoId+=`
								<p class="news-title">${data.data.headline}</p>
								<div class="new-data">${commonTime}</div>
								<img src="../../img/studentsstar.png" alt="" />			
							`
							$('#newsInfoId').append(newsInfoId)


					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}
			});
	
//	classInfo.html 课程详情页面请求
			Date.prototype.toLocaleString = function() {
          		return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
   			 };
   			 Date.prototype.toLocaleString1 = function() {
          		return  this.getHours() + ":" + this.getSeconds() + "";
   			 };
   			
	
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
				url: activeUrl+"/course/queryCourseById?id="+classInfoId,
				data: {
					"id": classInfoId
				},
				async: false,
				dataType: "json",
				success: function(data) {
//						console.log(data.data)
						for(i = 0 ;i < data.data.length;i++){
							if(data.data[i].id==classInfoId){
								console.log(data.data[i].id)
								$('.kc-title').text(data.data[i].courseName)
									//${data.data[i].file}	http://192.168.0.215:8080/${data.data[i].file}			
									//../../img/yanchu2.png
								var kcxq=''
								kcxq+=`								
									<div class="kc-img"><img src="../../img/yanchu2.png" alt="" /></div>
									<p>
										${data.data[i].courseDescription}
									</p>
								`
								$('.kc-info').append(kcxq)
								
								//获取时间与日期相关代码
								Date.prototype.toLocaleString = function() {
					          		return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() ;
					   			 };
								var unixTimestamp = new Date( data.data[i].demoClasses[i].startDate  ) ;//获取日期
								commonTime = unixTimestamp.toLocaleString();//
								
								var unixTimestamp1 = new Date( data.data[i].demoClasses[i].startDate  ) ;//获取开始时间
								commonTime1 = unixTimestamp1.toLocaleString1();//
									
								var unixTimestamp2 = new Date( data.data[i].demoClasses[i].endDate  ) ;//获取开始时间
								commonTime2 = unixTimestamp2.toLocaleString1();//
								
								var stk='';
								stk+=`
									<p class="xgkc">
										<i><img src="../../img/shu.png" alt="" class="xgkc-img" /></i><span>相关试听课程</span>
									</p>
									<p>课程：<span class="stk">${data.data[i].courseName}</span></p>
									<p>教师：<span class="teachers">${data.data[i].demoClasses[i].listenTeacher}</span></p>
									<p>地址：<span class="address">${data.data[i].demoClasses[i].address}</span></p>
									<p>
										<span class="datas">${commonTime}</span>
										<span class="times"><img src="../../img/aixin.png" alt="" />${commonTime1}-${commonTime2}</span>
									</p>
									<a href="#" class="appointment book-class"><img src="../../img/yuyue.png" alt="" /></a>
								`
								$('.jc-class-info').append(stk)
								
							}
							
						}	

					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}
			});
		
		
//		listenInfo.html 试听课请求
	
	
		$('.subscribe').click(function(){
				$(this).addClass('aa')
				$(this).html('已预约')

			})
			$.ajax({
				type: "post",
				url: activeUrl+"/demoClass/queryAll",
				data: {
//					"id": 1
				},
				async: false,
				dataType: "json",
				success: function(data) {
						for(var i = 0; i < data.data.length; i++) {
//							console.log(data.data)
					
							Date.prototype.toLocaleString = function() {
								return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
							};
							var unixTimestamp = new Date(data.data[i].startDate); //获取日期
							commonTime = unixTimestamp.toLocaleString(); //
				
							var unixTimestamp1 = new Date(data.data[i].startDate); //获取开始时间
							commonTime1 = unixTimestamp1.toLocaleString1(); //
				
							var unixTimestamp2 = new Date(data.data[i].endDate); //获取开始时间
							commonTime2 = unixTimestamp2.toLocaleString1(); //
							var tea=''
							tea+=`
								<div class="hui-bg">
									<h5>${data.data[i].demoLesson}</h5>
									<p>教师：<span>${data.data[i].listenTeacher}</span></p>
									<p>地址：<span>${data.data[i].address}</span></p>
									<p>
										<span class="st-time">${commonTime}</span>
										<span class='st-time'>${commonTime1}-${commonTime2}</span>
									</p>
									<a href="#" class="subscribe">预约</a>
								</div>
								`
							$('.stk-class').append(tea)
							
					}
							
					
					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}
			});
			


})
//		明星教师页面   
	$.ajax({
					type: "post",
					url: activeZq+"starTeachers/queryAllTeachers",
					data: {
						"id": 1
					},
					async: false,
					dataType: "json",
					success: function(data) {
							console.log(data.data)
							var datas=data.data
							for(var i=0;i<datas.length;i++){
								var teaStar='';
								teaStar+=`
										<div class="stars-items">
											<a onclick="onClickStarTeacherItem('id=${datas[i].id}')" class="stars-img">
												<img src="../../img/jiaoshi1.png" alt="" />
												<p class="star-text"> ${datas[i].teachername} <span> ${datas[i].label} </span></p>
											</a>
										</div>
								`
								$('.stars-con1 ').append(teaStar)

							}

						},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert("请求失败！");
					}

				});


//			明星学员  starStudent/starStudentlist

/*			$.ajax({
				type: "post",
				url:"http://192.168.0.132:8080/starStudent/starStudentlist",
				data: {
//					"id": 1
				},
				async: false,
				dataType: "json",
				success: function(data) {
						console.log(data.data)
						var datas=data.data
						for(var i=0;i<datas.length;i++){
							var stuStar='';
							stuStar+=`
									<div class="stars-items">
										<a href="window.android.showAndroidHomeNewPage('file:///android_asset/buluApp/templates/bulu/studentInfo.html?id=${datas[i].id},2')" class="stars-img">
											<img src="../../img/xueyuan1.png" alt="" />
											<p class="star-text"> ${datas[i].studentName} <span> ${datas[i].label} </span></p>
										</a>
									</div>
							`
							$('.stars-con2 ').append(stuStar)

						}

					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}

			});*/
				var  studentId= getValue()['id'] || '';
			//明星学员详情  starStudent/updateStudentById

			$.ajax({
				type: "post",
				url: activeZq+"/starStudent/updateStudentById",
				data: {
					"id": studentId
				},
				async: false,
				dataType: "json",
				success: function(data) {
						console.log(data)
						var datas=data.data
							console.log(datas[0].studentName)
//						banner详情页
							var stuBanner='';
							stuBanner+=`
									<a  class=" mui-icon mui-icon-left-nav mui-pull-left config-return" onclick="onBack();"  style="color: rgb(102,102,102);"></a>
									<div class="banners"><img src="../../img/teachers.png" alt="" /></div>
									<div class="banner-mask">
										<span class="bulu-name">${datas[0].studentName}</span>
										<span class="bulu-names">${datas[0].label}</span>
									</div>
							`
							$('#stuBanner').append(stuBanner)

//						学员简介详情页
							var stuIntroduce=''
							stuIntroduce+=`
									<div class="jieshao">
										<img src="../../img/shu.png" alt="" />
										<span>学员简介</span>
									</div>
										${datas[0].profile}
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
										${datas[0].process}
									</p>
							`
							$('#process').append(process)

					},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert("请求失败！");
				}

			});