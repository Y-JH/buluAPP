		window.onload=function() {
				strYYYY = document.form1.YYYY.outerHTML;
				strMM = document.form1.MM.outerHTML;
				strDD = document.form1.DD.outerHTML;
				MonHead = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				//年下拉框赋值
				var y = new Date().getFullYear();
				
				var str = strYYYY.substring(0, strYYYY.length - 9);
				for(var i = (y-40); i < (y+10); i++) //以今年为准，后30年
				{
					str += "<option value='" + i + "'> " + i +"年"+ "</option>\r\n";
				}
				document.form1.YYYY.outerHTML = str + "</select>";
				//月份下拉框赋值
				var str = strMM.substring(0, strMM.length - 9);
				for(var i = 1; i < 13; i++) {
					str += "<option value='" + i + "'> " + i+"月" + "</option>\r\n";
				}
				document.form1.MM.outerHTML = str + "</select>";
				document.form1.YYYY.value = y;
				// http://www.codefans.net 
				document.form1.MM.value = new Date().getMonth() + 1;
				var n = MonHead[new Date().getMonth()];
				if(new Date().getMonth() == 1 && IsPinYear(YYYYvalue)) n++;
				writeDay(n); //日期下拉框赋值
				document.form1.DD.value = new Date().getDate();
			}

			function YYYYMM(str) //年发生变化时日期发生变化(主要是判断闰平年)
			{
				var MMvalue = document.form1.MM.options[document.form1.MM.selectedIndex].value;
				if(MMvalue == "") {
					DD.outerHTML = strDD;
					return;
				}
				var n = MonHead[MMvalue - 1];
				if(MMvalue == 2 && IsPinYear(str)) n++;
				writeDay(n)
			}

			function MMDD(str) //月发生变化时日期联动
			{
				var YYYYvalue = document.form1.YYYY.options[document.form1.YYYY.selectedIndex].value;
				if(str == "") {
					DD.outerHTML = strDD;
					return;
				}
				var n = MonHead[str - 1];
				if(str == 2 && IsPinYear(YYYYvalue)) n++;
				writeDay(n)
			}

			function writeDay(n) //据条件写日期的下拉框
			{
				var s = strDD.substring(0, strDD.length - 9);
				for(var i = 1; i < (n + 1); i++)
					s += "<option value='" + i + "'> " + i+"日" + "</option>\r\n";
				document.form1.DD.outerHTML = s + "</select>";
			}

			function IsPinYear(year) //判断是否闰平年
			{
				return(0 == year % 4 && (year % 100 != 0 || year % 400 == 0))
			}