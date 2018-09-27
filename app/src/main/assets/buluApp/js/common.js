/* 
* @Author: fangJin
* @Date:   2018-05-16 15:27:03
* @Last Modified by:   fangJin
* @Last Modified time: 2018-06-15 17:01:40
*/

$(document).ready(function(){
    // 移动端rem自适应js 
    !function(e,t){ function n(){var n=l.getBoundingClientRect().width;t=t||540,n>t&&(n=t);var i=100*n/e;r.innerHTML="html{font-size:"+i+"px;}"}var i,d=document,o=window,l=d.documentElement,r=document.createElement("style");if(l.firstElementChild)l.firstElementChild.appendChild(r);else{var a=d.createElement("div");a.appendChild(r),d.write(a.innerHTML),a=null}n(),o.addEventListener("resize",function(){clearTimeout(i),i=setTimeout(n,300)},!1),o.addEventListener("pageshow",function(e){e.persisted&&(clearTimeout(i),i=setTimeout(n,300))},!1),"complete"===d.readyState?d.body.style.fontSize="16px":d.addEventListener("DOMContentLoaded",function(e){d.body.style.fontSize="16px"},!1)}(750,750);

    // 提示弹窗

        var tabs = {
            $el: $(".body"),
            init: function(){
                var me = this;
                var num = me.$el.find(".ptNumber p");
                $.each(num,function(i){
                    // console.log(num)
                    num.eq(i).click(function(){

                        $(this).siblings().parent().parent().parent().find('p').removeClass('borders');    
                        $(this).addClass('borders');      
                        console.log( $(this).text()  )
                        // var nn=$(this).siblings().parent().parent().parent().find('p').text()

                        // alert( $(this).text())
                    })

                })
            }
        }
        tabs.init();

        // 开关
        function showHideCode(){
                
            if(bool){
                $('.pc_text1').css('height','auto')
                $('.bor').css('height','auto')
                bool = false;
            }
            else{
                $('.pc_text1').css('height','2rem')
                $('.bor').css('height','3.5rem')
                bool = true;
            }
        } 
        
        // tab切换
        var tab = {
            $el: $(".body"),
            init: function(){
                var me = this;
                var items = me.$el.find(".tab-list>li");
                var oDiv = me.$el.find(".tab-con>ul");
                var oDivs = me.$el.find(".tab-conn>ul");

                $.each(items,function(i){
                    items.eq(i).click(function(){

                        $(oDiv).eq(i).show().siblings().hide()
                        $(oDivs).eq(i).show().siblings().hide()
                        $(this).addClass('tab-on').siblings().removeClass('tab-on')
                    })

                })
                // $(oDiv).hide()
            },
            
        }
        tab.init();

        $('.search-Num').click(function(){
            $('.results').show()
        })
        // 验证用户输入信息
      
//		$('.isee').click(function(){
//          	alert(1)
//          	$(".tips-wrap").hide()
//          })
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
    
        // 判断选中状态
//      var checks = $('input[name="checks"]');
//      checks.click(function(){
//          if(this.checked==true){
//              $('.searchNumbers').show()
//          }else{
//              $('.searchNumbers').hide()
//          }
//      })
//      var swiper = new Swiper('.swiper-container', {
//          // pagination: '.swiper-pagination',
//          nextButton: '.swiper-button-next',
//          prevButton: '.swiper-button-prev',
//          paginationClickable: true,
//          centeredSlides: true,
//          autoplay: 2500,
//          loop:true,
//          centeredSlides : true,
//          pagination: {
//              el: '.swiper-pagination',
//              // type: 'fraction',
//              dynamicBullets:false
//              // type : 'progressbar',
//              //type : 'custom',
//            },
//          observer:true,//修改swiper自己或子元素时，自动初始化swiper
//          observeParents:true,//修改swiper的父元素时，自动初始化swiper
//          autoplayDisableOnInteraction: false
//          // $('.pages').text(swiper.activeIndex)
//      });
//  
//  });


        

    // 提示弹窗
//  function ycTips(text){
//      if(timer){clearTimeout(timer);}
//      if($(".tips-wrap")){$(".tips-wrap").remove();}
//      var w = - parseInt(text.length*14/2)+"px";
//      var p="<section class='tips-wrap'><p class='tips-boxs'>"+text+"</p></section>";
//      $("body").append(p);
//      var timer = setTimeout(function(){
//          $(".tips-wrap").remove();
//      },2500)
//  }

    
// 复制功能
    // var targetText=$("#target").text();    
    // var clipboard = new Clipboard('#copy_btn');    
    //     clipboard.on('success', function(e) {    
    //         console.info('Action:', e.action);    
    //         console.info('Text:', e.text);    
    //         console.info('Trigger:', e.trigger);    
    //             ycTips('复制成功')
    //             e.clearSelection();    
    //         });
// var mode = $('input[name="b"]:checked').val();