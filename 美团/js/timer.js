/**
* 倒计时效果
*/
window.addEventListener("load",function(){
	//获取span
	var timer = document.getElementById('timer');
	var spans = timer.getElementsByTagName('span');
	var totaltime = 60-55;//单位是秒：倒计时从12小时开始
	//思路
	//1.每隔一秒就去把totaltime值减一
	//2.把totaltime拆分成小时，分，秒
	//3.填到相应的span当中
	
	var timestick = setInterval(function(){
		if(totaltime > 0){
			totaltime--; //每隔一秒就去把totaltime值减一
			
						//2.把totaltime拆分成小时，分，秒
			var hour   = Math.floor( totaltime/(60*60) ) ;//只保留整数
			var minute = Math.floor( (totaltime - hour*60*60)/60 );//分
			var second = totaltime%60;
			//console.info(hour,minute,second);


			//console.info(spans);
			//一共有6个 span，小时，分，秒各分两个。
			//如果某一个值是个数，则前面补0
			spans[0].innerHTML = Math.floor(hour/10);//保存小时的十位数
			spans[1].innerHTML = hour%10;			//保存小时的个位数
			spans[2].innerHTML = Math.floor(minute/10);//保存分的十位数
			spans[3].innerHTML = minute%10;				//保存分的个位数
			spans[4].innerHTML = Math.floor(second/10);//保存秒的十位数
			spans[5].innerHTML = second%10;				//保存秒的个位数
		}
		else{
			//时间 已经 用完了,停止定时器
			clearInterval(timestick);
		}
	},1000);


		
	//如果是：x = 21
	// 得到x的十位：Math.floor( x/10);  21/10 -->2.1 -- >2
	// 得到x的个位：x%10;  21%10 --1>
	// 
	// 
	//如果是：x = 2
	// 得到x的十位：Math.floor( x/10);  2/10 -->0.2 -- >0
	// 得到x的个位：x%10;  2%10 --2
});