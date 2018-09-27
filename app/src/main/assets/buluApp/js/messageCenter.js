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
})
$('.inpt, .quanxuan').hide()

$("#bian").click(function(e) {

	if( $(".quanxuan").css("display") == "none") {
		$('.inpt').show()
		$(this).html('完成')
		$('.quanxuan').show()
		

	} else {
		$(this).html('编辑')
		$('.quanxuan').hide()
		$('.inpt').hide()
	}
});

