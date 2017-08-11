/**
 * 在主页中使用的轮播的效果
 * @type {[type]}
 */
window.addEventListener("load",function(){
	var itemlistul = document.getElementById('itemlistul');
	var dx = 90;
	var currentIndex = 0 ; //当前是第1屏
	//向左移动,减少left。
	//思路
	//动画控制ul移动一屏，当完成移动后，停3秒，再进行下一屏。
	//go();
	//只移动一屏
	function move(){
		//请你把ul从 -currentIndex*1170  ----> -(currentIndex+1)*1170
		//从0屏到1屏 ：left 从 0 ---> -1170
		//从1屏到2屏 ：left 从 -1170 --->  -1170*2
		//从2屏到3屏 ：left 从 -1170*2 ---> -1170*3
		//从3屏到4屏 ：left 从 -1170 --->  -1170*2
		currentIndex++;
		if(currentIndex == 4){
			//把ul的left设置为0
			//currentIndex = 1;
			itemlistul.style.left = "0px";
			currentIndex = 1;
		}
		var timer = null;
		var target = -1 * currentIndex *1170;
		timer =setInterval(function(){
			//1.获取oldleft
			var oldleft = itemlistul.offsetLeft
			// 只考虑目标从右向左移动
			// If(oldleft <=target) //
			// {
			//   达到了（超过了目标 ）
			// }
			if(oldleft <=target){
				//达到了（超过了目标 ） 
				//停止定时器
				clearInterval(timer);
				//休息3s再来执行一次move()
				setTimeout(function(){
					move();
				},3000)

			}else{
				//2.把值减少newleft = oldleft - dx;
				var newleft = oldleft -dx;
				//3.把新的left设置给ul
				itemlistul.style.left =newleft + "px";
			}
		},25);
	}

	move();

	//第一次调用 move，currentIndex是0，相当是从0屏到第1屏。
	//第二次调用 move，currentIndex是1，相当是从1屏到第2屏。
});
