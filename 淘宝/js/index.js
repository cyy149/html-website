//页面载入事件
$(function(){
//当用户点击宝贝搜索的时候，给.searchbox添加.baobei-on
//当用户点击天猫搜索选项的时候，给.searchbox添加.tmall-on
//当用户点击店铺搜索选项的时候，给.searchbox添加.store-on
	$('.search-top li').click(function(e){
		$(this).addClass('cur').siblings().removeClass('cur');
	

		if($(this).hasClass('baobei')){
			$('.search-box').attr('class','search-box baobei-on');
		}else if($(this).hasClass('tmall')){
			$('.search-box').attr('class','search-box tmall-on');
		}else{
			$('.search-box').attr('class','search-box store-on');
		}
	});

	//当点击相机的时候，触发上传文件事件
	$('.search-center i').click(function(e){
		$('#upload').click();
	});

	//当单击搜索框上放大镜和上面文字时，让搜索框获取焦点
	$('.search-center span,.search-center em').click(function(e){
		//触发搜索框获取焦点事件
		$('#q').focus();
	});
	//当#q 中输入内容input改变时，内容不为空时，em隐藏否则显示
	$('#q').bind('input',function(e){
		if($(this).val()!=''){
			$('.search-center').addClass('q-noempty');
		}else{
			$('.search-center').removeClass('q-noempty');
		}
	});

	//当窗口滚动的时候，判断是否吸顶
	var search_center_top = $('.search-center').offset().top;
	$(window).bind('scroll',function(e){
		console.log($('.search-center').offset().top);
		//如果浏览器上方隐藏部分高度scrolltop()大于等于搜索框文档纵坐标offset().top，则吸顶
		if( $(window).scrollTop()>=search_center_top ){
			$('.search-wrapper>div').addClass('search-fixed');
			//搜索框吸顶的时候，触发用户单击当前搜索框选项
			$('.search-top>li.cur').click();
		}else{
			$('.search-wrapper>div').removeClass('search-fixed');
		}
	});

	//吸顶后，当鼠标移上搜索框的时候，显示所有搜索选项
	$('.search-top').bind('mouseenter',function(e){
		$(this).addClass('hover');
	});
	$('.search-top').bind('mouseleave',function(e){
		$(this).removeClass('hover');
	});
	
	//当单击某个搜索选项的时候，让其成为父级的第一个孩子(只有吸顶的时候)
	// $('.search-top li').bind('click',function(e){
	// 	if( $('.search-wrapper>div').hasClass('.search-fixed') ){			//吸顶状态
	// 		$(this).parent().prepend( $(this) );
	// 		console.log($(this));
	// 	}
	// });
	$('.search-top li').bind('click', function(e){
		if( $('.search-wrapper>div').hasClass('search-fixed') ){  //吸顶状态
			// $(this).prependTo( $(this).parent() );
			$(this).parent().prepend( $(this) );
		}		
	});
	//单击关闭按钮，二维码关闭
	$('#qr span').bind('click',function(e){
		$(this).parent().hide();
	});

	//主题市场事件
	//当用户移上某个li时候，给他加on，其他不加on
	$('.market-list>li').bind('mouseenter',function(e){
		$(this).addClass('on').siblings().removeClass('on');
	});
	$('.market-list>li').bind('mouseleave',function(e){
		$(this).removeClass('on');
	});

	//当鼠标第一次移上主题市场的时候，二级菜单淡入
	$('.market-list').mouseenter(function(e){
		$(e.target).children('.market-submenu').css({opacity:0}).stop().animate({opacity:1},1000);
	});

	//main-service开始
	$('.main-right-center2 li span').each(function(index, el){
		$(el).css({'background-position':'0 -'+44*index+'px'});
	});
	$('.main-right-center2 li').mouseenter(function(e){
		$(this).addClass('on').siblings().removeClass('on');
	});
	$('.main-right-center2 li').mouseleave(function(e){
		$(this).removeClass('on');
	});

	
	// $('.main-right-center2 li:lt(8):gt(3)').mouseenter(function(e){
	// 	$(this).children('.main-services1').css('top','139px');
	// });
		$('.main-right-center2 li').filter(function(idx){
			if(idx<=7 && idx>3){
				return true;
			}
		}).mouseenter(function(e){
		$(this).children('.main-services1').css('top','139px');
	    });

	$('.main-right-center2 li:gt(7)').mouseenter(function(e){
			$(this).children('.main-services1').css('top','21px');
		});
	$('.main-services1 i').click(function(e){
		$(this).parent().parent().removeClass('on');
	});
	//main-service结束
});

//焦点图1开始
$(function(){
	var idx=0;
	var timer;
	var $banner1_span = $('#banner1>span');
	var $banner1_rbtn = $('#banner1>span.r-btn');
	var $banner1_ul = $('#banner1>ul');
	var $banner1_ol_li = $('#banner1>ol>li');
	//复制banner1下的第一个图片li，放到ul最后一个作为第一个图片li的替身。
	var $first_li = $banner1_ul.children(':nth-of-type(1)');
	// console.log($first_li);
	$banner1_ul.append( $first_li.clone() );

	
	//鼠标移上div,左右按钮显示，否则隐藏
	$('#banner1').mouseenter(function(e){
		$banner1_span.show();
		//鼠标移上停止播放事件，清除定时即可
		clearInterval(timer);
	}).mouseleave(function(e){
		$banner1_span.hide();
		//鼠标离开，图片自动轮播，可以视为触发单击右按钮事件
		//用定时器，3秒触发一次
		timer = setInterval(function(e){
			$banner1_rbtn.click();
		},2000);				
	}).mouseleave(); //上来就触发一次鼠标离开时事件，自动开始播放。

	//点击右侧按钮，图片往右滑动，下图标也往右移动
	$banner1_rbtn.bind('click',function(e){	
		//当用户单击按钮时，判断焦点图是否处于运动状态，如果是，则阻止下一步的点击事件，比stop(true)更好
		if( $banner1_ul.is(':animated') ){
			return; //终止函数运行作用
		}
		
		idx++;
		if( idx>=5){  //特殊情况1
			//角标的工作
			idx=0;
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			//图片的工作
			$banner1_ul.animate({left:'-500%'}, 1000, 'swing', function(e){
				//回调函数：当动画执行完毕的时候，执行这个代码。图1的替身出现后瞬间替换为1的本尊
				//$('ul').css({left:'0%'});
				$banner1_ul.css({left:'0%'});
			});
		}else{    //正常状态
		//小图标的工作
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
		//图片的工作
			$banner1_ul.animate({left:'-'+idx+'00%'},1000);
		}
	});

	//点击左侧按钮，角标向左依次变化，图片向左滚动
	$banner1_span.eq(0).bind('click',function(e){
		if( $banner1_ul.is(':animated') ){
			return; //终止函数运行作用
		}
		idx--;
		if(idx<0){   //特殊情况
			//角标的工作
			idx=4;
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			//图片的工作 瞬间替换为图片5
			$banner1_ul.css({left:'-500%'}).animate({left:'-400%'},1000);
		}else{   //正常情况
			//角标的工作
			$banner1_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			//图片的工作
			$banner1_ul.animate({left:'-'+idx+'00%'},1000);
		}
	});

	//单击角标时，正常情况显示对应idx的图片
	//特殊时刻，分情况1：当前最后一个角标，下一个准备点第一个角标；触发右侧按钮点击事件即可
	//情况2：当前为最前一个角标，准备点最后一个角标；触发左侧按钮触发事件即可

	$banner1_ol_li.bind('click',function(e){
		if( $banner1_ul.is(':animated') ){
			return; //终止函数运行作用
		}
	
		if(idx==4 && $(this).index()==0){ //情况1

			$banner1_rbtn.click();
		}else if(idx==0 && $(this).index()==4){ //情况2
			$banner1_span.eq(0).click();
		}else{
			idx = $(this).index();
			//正常情况
			//角标工作
			$(this).addClass('cur').siblings().removeClass('cur');
			//图片的工作
			$banner1_ul.animate({left:'-'+idx+'00%'},1000);
		}	
	});
});	
//焦点图1结束

//焦点图2开始
$(function(){
	var idx=0;
	var timer;
	var $banner2_span = $('#banner2>span');
	var $banner2_ul   = $('#banner2>ul');
	var $banner2_ol_li= $('#banner2>ol>li');
	//$banner2_ol_li.length=6;
	//$banner2_ol_li.length-1=5;
	
	//取第一个li复制添加到ul最后
	$banner2_ul.children(':eq(0)').clone().appendTo($banner2_ul);

	$('#banner2').mouseenter(function(){
		$banner2_span.show();
		clearInterval(timer);
	});
	$('#banner2').mouseleave(function(){
		$banner2_span.hide();
		timer=setInterval(function(e){
		$banner2_span.eq(1).click();
	},3000);
	}).mouseleave();

	//单击鼠标向后按钮时，播放下一张图片
	$banner2_span.eq(1).bind('click',function(e){
		if( $banner2_ul.is(':animated')==true ){
			return;
		}

		idx++;
		if( idx<=($banner2_ol_li.length-1) ){  //正常状态
			//角标工作
			$banner2_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			//图片工作
			$banner2_ul.animate({left:'-'+idx+'00%'},1000);
			$('.banner2-header em i').html(idx+1);

		}else if(idx>( $banner2_ol_li.length-1) ){		//idx>5，
			idx=0;
			//角标工作
			$banner2_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			//图片工作
			$banner2_ul.animate({left:'-'+$banner2_ol_li.length+'00%'}, 1000 , 'swing', function(e){
				$banner2_ul.css({left:'-'+idx+'00%'});
			});
			$('.banner2-header em i').html(idx+1);
		}

	});
	//单击鼠标向前按钮时，播放上一张图片
	$banner2_span.eq(0).bind('click',function(e){
		if( $banner2_ul.is(':animated')==true ){
			return;
		}
		idx--;
		if(idx>=0){  //正常情况
		//角标工作
			$banner2_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
		//图片工作
			$banner2_ul.animate({left:'-'+idx+'00%'},1000);
			$('.banner2-header em i').html(idx+1);
		}else if(idx<0){
			//角标工作
			idx= $banner2_ol_li.length-1;
			$banner2_ol_li.eq(idx).addClass('cur').siblings().removeClass('cur');
			//图片工作
			$banner2_ul.css({left:'-600%'}).animate({left:'-'+($banner2_ol_li.length-1)+'00%'},1000);
			$('.banner2-header em i').html(idx+1);
		}
	});
	//角标事件，点击角标图标，对应index的图片为当前
	$banner2_ol_li.bind('click',function(e){
		if( $banner2_ul.is(':animated')==true ){
			return;
		}
		if(idx==($banner2_ol_li.length-1) && $(this).index()==0){
			$banner2_span.eq(1).click();
			$('.banner2-header em i').html(idx);
		}else if(idx==0 && $(this).index()==( $banner2_ol_li.length-1) ){
			$banner2_span.eq(0).click();
			$('.banner2-header em i').html(idx+1);
		}else{
			idx = $(this).index();
			$(this).addClass('cur').siblings().removeClass('cur');
			$banner2_ul.animate({left:'-'+idx+'00%'},1000);
			$('.banner2-header em i').html(idx+1);
		}
	});

})
//焦点图2结束

// 下部各区域开始
$(function(){
	var aside_nav = $('#aside-nav');
	var aside_nav_li = $('#aside-nav li');
	var aside_nav_toTop = $('#aside-nav .toTop');
	//当鼠标单击aside-nav下的li的时候，给他active类
	aside_nav_li.bind('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
	//当鼠标移到aside-nav的时候，给他一个hover类
	aside_nav_li.hover(function(){
		if( $(this).hasClass('active')==false ){
			$(this).addClass('hover').css({opacity:0}).stop().animate({opacity:100},2000);
		}
	},function(){
		$(this).removeClass('hover');
	});

	var aside_tops=[
		$('#favorite').offset().top-49,
		$('#fashion').offset().top-49,
		$('#life').offset().top-49,
		$('#special').offset().top-49,
		$('#sales').offset().top-49,
		$('#guess').offset().top-49,
		0,
	];
	//当侧边栏导航条滚动到搜索框下方时，他应该吸顶
	var aside_nav_top = aside_nav.position().top;
	$(window).scroll(function(e){
		if( $(window).scrollTop()>=aside_nav_top-49){
			aside_nav.css({position:'fixed',top:49});
		}else{
			// $('#aside-nav').css({position:'absolute',top:$('#aside-nav').offset().top});
			aside_nav.css({position:'absolute',top:aside_nav_top});
		}
		
		//当窗口滚动的时候，如果上方隐藏的高度》=一屏的高度的时候，顶部应该显示
		if( $(window).scrollTop()>=$(window).height() ){
			aside_nav_toTop.show();
		}else{
			aside_nav_toTop.hide();
		}
	});
	//当窗口滚动高度大于某一个块的文档定位高度时，该侧导航对应块高亮显示。
	$(window).scroll(function(e){
		var which;
		for(var i = 0; i<aside_tops.length-1; i++ ){
			if( $(window).scrollTop()>aside_tops[i] ){
				which=i;
			}
		}
		$('#aside-nav>li').eq(which).addClass('active').siblings().removeClass('active');
	});
//点击导航条那一块，文档就滚动到对应哪一块区域。
	aside_nav_li.click(function(e){
		var idx = $(this).index();
		$('html,body').animate({
			scrollTop:aside_tops[idx]},500);
	});
})
// 下部各区域结束



