/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
function getValue() {
	var str = decodeURIComponent(window.location.search),
		obj = {},
		item = [];
	if(str && ~str.indexOf('?')) {
		str = str.slice(1)
	}


	if(str != null && str != "") {
		if(str.indexOf("&") != -1) {
			item = str.split("&");
			for(var i = 0; i < item.length; i++) {
				var itemValue = item[i].split("=");
				obj[itemValue[0]] = itemValue[1];
			}
		} else {
			item = str.split("=");
			obj[item[0]] = item[1];
		}

		return obj;
	}
}
   function ycTips(text){
//       	$(".tips-wrap").show()
            if(timer){clearTimeout(timer);}
            if($(".tips-wrap")){$(".tips-wrap").remove();}
            var w = - parseInt(text.length*14/2)+"px";
//          var p="<section class='tips-wrap'><p class='tips-boxs'>"+text+"</p></section>";
            var p="<div class='tips-wrap'><div class='tips-boxs'><p>提示</p><p class='tipss'>"+text+"</p><a href='#' class='isee'>我知道了</a></div></div>";
            $("body").append(p);
          
            var timer = setTimeout(function(){
                $(".tips-wrap").remove();
            },2000)
        }
//var activeUrl = "http://c.service.bulu.aikaoen.com/buluc";
//var activeZq = "http://c.service.bulu.aikaoen.com/buluc/";
var imgSrc = "http://file.bulu.aikaoen.com/";
//var activeUrl = "http://192.168.0.132:8080";
var activeUrl = "http://c.service.bulu.aikaoen.com";
//var activeUrl = "http://c.service.bulu.aikaoen.com";

//zcid=localStorage.getItem('zcid')
//xyid=localStorage.getItem('xyid')
//console.log('注册用户id为' +zcid)
//console.log('学员id为' +xyid)
// 删除节点
function remodeNode(node) {
	node.parentNode.removeChild(node);
}

function getScrollTop() {
	var scrollTop = 0;
	if(document.documentElement && document.documentElement.scrollTop) {
		scrollTop = document.documentElement.scrollTop;
	} else if(document.body) {
		scrollTop = document.body.scrollTop;
	}
	return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight() {
	var clientHeight = 0;
	if(document.body.clientHeight && document.documentElement.clientHeight) {
		clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
	} else {
		clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	}
	return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
	return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}
//var activeUrl="http://c.service.bulu.aikaoen.com/buluc";
//var activeZq="http://c.service.bulu.aikaoen.com/buluc/";
//var imgSrc="http://file.bulu.aikaoen.com/";
(function($, owner) {
	/**
	 * 用户登录
	 **/
	//获取参数

	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if(loginInfo.account.length < 5) {
			return callback('账号最短为 5 个字符');
		}
		if(loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});
		if(authed) {
			return owner.createState(loginInfo.account, callback);
		} else {
			return callback('用户名或密码错误');
		}
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};
	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if(regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if(regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if(!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return(email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if(!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	/**
	 * 获取本地是否安装客户端
	 **/
	owner.isInstalled = function(id) {
		if(id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if(mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch(e) {}
		} else {
			switch(id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));