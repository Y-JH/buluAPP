mui.plusReady(function() {

	if(plus.storage.getItem('src') == null) {
		mui('.head-photos')[0].src = 'img/hao.png';
	} else {
		mui('.head-photos')[0].src = plus.storage.getItem('src');
	}

	//点击头像框 遮罩层显示
	mui('.profile-photo')[0].addEventListener('tap', function() {
		$(".masks").show();
	})

	//点击拍照更换头像
	mui('.photo-btn')[0].addEventListener('tap', function() {

		var cm = plus.camera.getCamera(1);
		cm.captureImage(function(path) {
			mui('.photos')[0].src = "file://" + plus.io.convertLocalFileSystemURL(path);
			plus.storage.setItem("src", "file://" + plus.io.convertLocalFileSystemURL(path));
			$('.masks').hide()
		});
	})


	//点击从相册中选择更换头像
//	mui('.album-btn')[0].addEventListener('tap',function(){
//		plus.gallery.pick(function(url){
//			var path=plus.io.convertLocalFileSystemURL(url);
//			mui('.photos')[0].src="file://" +path
//			plus.storage.setItem('src',"file://" + plus.io.convertLocalFileSystemURL(url))
//			$('.masks').hide()
//			
//		}, {filter:"image",multiple:true})
//
//	})
//	
//})

	//点击空白地方遮罩层消失
	$('.cancel').click(function() {
		$('.masks').hide()
	})
	


mui('.album-btn')[0].addEventListener('tap',function(){

    plus.gallery.pick( function(e){
    	for(var i in e.files){
    		var path=plus.io.convertLocalFileSystemURL(e.files[i]);
    		mui('.photos')[0].src="file://" +path
    		plus.storage.setItem('src',"file://" + plus.io.convertLocalFileSystemURL(e.files[i]))
	    	console.log(e.files[i]);
    	}
    }, function ( e ) {
    	console.log( "取消选择图片" );
    },{filter:"image",multiple:true});

	})
})