/**
 * 全部分类隐藏 显示效果
 */
window.addEventListener("load",function(){
	var catebox = document.getElementById('catebox');
	catebox.onmouseover = function(){
		//让cateitemlist显示
		document.getElementById('cateitemlist').style.display="block";
	};
	catebox.onmouseout = function(){
		//让cateitemlist显示
		document.getElementById('cateitemlist').style.display="none";
	};
});
