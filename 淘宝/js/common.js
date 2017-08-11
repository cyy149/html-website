//页面载入事件
$(function(){
	//判断.uesr-nav-right有无二级子菜单，如果有则加上鼠标移开和移上事件
	$('.user-nav-right>li').each(function(index, el){
		// console.log($(el).children('.sub-menu').length);
		if($(el).children('.sub-menu').length>0){
			$(el).mouseenter(function(e){
				$(this).addClass('on');
			});
			$(el).mouseleave(function(e){
				$(this).removeClass('on');
			});
		}
	});
});
