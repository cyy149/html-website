/**
 * 用在列表页中关闭广告
 * @type {[type]}
 */
window.addEventListener("load",function(){
	var btnclose = document.getElementById("btnclose");
	btnclose.onclick = function(){
		document.getElementById("advbox").style.dislilay = "none";
	}
});
