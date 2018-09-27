
//日历
let arr = []
 	getSevenDay(7)
 	// var strs = 
			//获取最近7天日期
			function getSevenDay( num ){
				for( var i = 0 ; i < num; i++ ){



//					console.log( parseInt(getDay(i).split("-")[2]) )
					arr.push(
					{
						sj:parseInt(getDay(i).split("-")[2]),
						z:"日一二三四五六".charAt(new Date(getDay(i)).getDay())

					})
				}
			}
			//获取最近3天日期
			getDay(0);//当天日期
//			console.log('a',getDay(1))
			getDay(-3);//3天前日期
			function getDay(day){  
				   var today = new Date();  
					 
				   var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
			  
				   today.setTime(targetday_milliseconds); //注意，这行是关键代码
					 
				   var tYear = today.getFullYear();  
				   var tMonth = today.getMonth();  
				   var tDate = today.getDate();  
				   tMonth = doHandleMonth(tMonth + 1);  
//				   console.log(tMonth)
				   tDate = doHandleMonth(tDate);  
				   return tYear+"-"+tMonth+"-"+tDate;  
			}  
			function doHandleMonth(month){  
				   var m = month;  
				   if(month.toString().length == 1){  
					  m = "0" + month;  
				   }  
				   return m;  
			}

//			console.log('a',arr)
			let str = '';
			for(let i = 0; i<arr.length; i++){
				str += `<div class="boxa">${arr[i].z}<br><span>${arr[i].sj}</span></div>`

			}
			box.innerHTML = str

			var myDate = new Date();
			var year=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
			var month=myDate.getMonth()+1;       //获取当前月份(0-11,0代表1月)
			var date=myDate.getDate();   
//				console.log(new Date())

			     //获取当前日(1-31)
			//console.log(year+"-"+month+"-"+date)
			var strs = "星期" + "日一二三四五六".charAt(new Date().getDay());
//			console.log(arr)
var odom = document.getElementById('item1mobile');
			var unixTimestamp = new Date(1526007949000);
				commonTime = unixTimestamp.toLocaleString(1535594400000);

			//获取时间和日期
			Date.prototype.toLocaleString = function() {
				return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate();
			};
			Date.prototype.toLocaleString1 = function() {
				return this.getHours() + ":" + this.getSeconds() + "";
			};
			

