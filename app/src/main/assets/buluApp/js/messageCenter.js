var activeUrl = "http://192.168.0.159:8080/";
$(function() {
	//实现全选反选
	$("#theadInp").on('click', function() {
		$(".gray input:checkbox").prop("checked", $(this).prop('checked'));
	})
	$(".gray input:checkbox").on('click', function() {
		//当选中的长度等于checkbox的长度的时候,就让控制全选反选的checkbox设置为选中,否则就为未选中
		if($(".gray input:checkbox").length === $(".gray input:checked").length) {
			$("#theadInp").prop("checked", true);
		} else {
			$("#theadInp").prop("checked", false);
		}
	})

	$('.inpt, .quanxuan').hide()

	$("#bian").click(function(e) {

		if($(".quanxuan").css("display") == "none") {
			$('.inpt').show()
			$(this).html('完成')
			$('.quanxuan').show()

		} else {
			$(this).html('编辑')
			$('.quanxuan').hide()
			$('.inpt').hide()
		}
	});

	//messageCenter.html 消息中心列表
	$.ajax({
		type: "post",
		url: activeUrl + "/mine/MessageList",
		data: {
			"xyid": xyid,
			"cid": zcid,
			"startPage": 0,
			"endPage": 10
		},
		async: false,
		dataType: "json",
		success: function(data) {
//			console.log(data)
			for(var i = 0; i < data.data.length; i++) {
				var newday = (data.data[i].createtime).substr(0, 16)
				var stx = ''
				stx += `<a onclick="onClickMessageInfo(id=${data.data[i].id})">
				<div class="gray clearfix">
					<div class="mui-input-row mui-checkbox mui-left">
						<p>
							<label class="labela">${data.data[i].type}</label>
							<input style="display: none;" id="inputs" class="inpt" value="${data.data[i].id}" type="checkbox" :checked/> 
							<span class="rigitspam">${newday}</span>
						</p>
					</div>
					<p class="chec">${data.data[i].content}</p>
				</div>
			</a>`
				$('#messagecenters').append(stx)
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("服务器开小差了 请稍后重试！");
		}
	});

	//messageCenter.html 消息中心列表 删除消息通知
	$(document).on("click", ".deletexiaoxi", function() {

		var ids = "";

		$("input:checkbox:checked").each(function() {
			ids = ids + $(this).val() + ',';
		})
		ids = ids.substring(0, ids.length - 1);
		$.ajax({
			url: activeUrl + "/mine/DeleteMessage",
			type: "post",
			data: {
				'id': ids
			},
			success: function(data) {
//				console.log(data)
				if($('#inputs').is(':checked')) {
					mui.confirm(data.msg + "，", '提示', ['我知道了'], null)
//					console.log($(this))
					$('.gray').remove()

				} else {
					mui.confirm("删除失败" + "，请选中", '提示', ['我知道了'], null)
				}
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("服务器开小差了 请稍后重试！");
			}
		})
	});
})