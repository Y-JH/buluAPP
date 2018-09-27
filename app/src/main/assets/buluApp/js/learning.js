
//选项卡
			var gallery = mui('.mui-slider');
			gallery.slider({
				interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
			});
			//弹出框
			//拨打电话
			document.getElementById("telephone").addEventListener('tap',function(){
            var btnArray=['拨打','取消'];
            var phone="13122222222";
            mui.confirm('是否拨打'+phone+'?','提示',btnArray,function(e){
                if(e.index == 0){
                    plus.device.dial(phone,false);
                }
                });
			});

			document.getElementById("telephonea").addEventListener('tap',function(){
            var btnArray=['拨打','取消'];
            var phone="13122222222";
            mui.confirm('是否拨打'+phone+'?','提示',btnArray,function(e){
                if(e.index == 0){
                    plus.device.dial(phone,false);
                }
                });
			});
			document.getElementById("telephones").addEventListener('tap',function(){
            var btnArray=['拨打','取消'];
            var phone="13122222222";
            mui.confirm('是否拨打'+phone+'?','提示',btnArray,function(e){
                if(e.index == 0){
                    plus.device.dial(phone,false);
                }
                });
			});	
