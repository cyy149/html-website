// common.js
// js效果在所有的页面中都会用到。

/**
 * 实现顶部下拉菜单效果
 * @type {[type]}
 */


window.addEventListener("load",function(){
	var li1 = document.getElementById("li1");
	li1.onmouseover = function(){
		//把类名改成 toggeli on
		this.className = "toggleli on";
	}
	li1.onmouseout = function(){
		//把on去掉
		this.className = "toggleli";
	}

	var li2 = document.getElementById("li2");
	li2.onmouseover = function(){
		//把类名改成 toggeli on
		this.className = "toggleli on";
	}
	li2.onmouseout = function(){
		//把on去掉
		this.className = "toggleli";
	}
});


/**
 * 选项卡效果
 * @type {[type]}
 */
window.addEventListener("load",function(){
	var linknav = document.getElementById("linknav");
	var lis = linknav.getElementsByTagName("li");
	var divs = linknav.getElementsByTagName("div");
	console.info(lis);
	//给每一个li添加事件响应，点击时，显示对应的那个div
	for (var i = 0; i < lis.length; i++) {
		lis[i].index = i;
		lis[i].onclick = function(){
			console.info(i);
			//让对应的div显示。
			//第一步，把所有的div隐藏
			for (var i = 0; i < divs.length; i++) {
				divs[i].style.display = "none";
			}
			//第二步，把当前的div显示
			divs[ this.index ].style.display ="block"; 
		}
	}
});

/**
 * 全类分类的下拉效果
 * @type {[type]}
 */
window.addEventListener("load",function(){
	var cateitemlist = document.getElementById("cateitemlist");
	var lis = cateitemlist.getElementsByTagName("li");
	lis.onclick = function(){

	}
	console.info(lis);
	for (var i = 0; i < lis.length; i++) {
		lis[i].onmouseover = function(){
			//添加一个on类 ->cateitem on
			this.className =  "cateitem on";
		};
		lis[i].onmouseout = function(){
			//去掉on类 ->cateitem
			this.className =  "cateitem";
		}
	}
});
