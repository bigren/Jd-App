window.onload=function () {
//    顶部通栏滚动效果
    headerScroll();
//    倒计时效果
    cutDownTime();
//    轮播图效果
    banner();
}
function headerScroll() {
    var navDom =document.querySelector(".jd_nav");
    var maxDistance = navDom.offsetTop + navDom.offsetHeight;
    var headerDom = document.querySelector(".jd_header");
    window.onscroll =function () {
        var scrollDistance =document.documentElement.scrollTop;
        var percent = scrollDistance/maxDistance;

        if(percent>1){
            percent =1;
        }
        /*rgba元素是用逗号,连接*/
        headerDom.style.background ="rgba(201,21,35,"+percent+")";

    }
}

function cutDownTime() {
    var totalHour =3;
    var totalSec = 3*60*60;
    var liArr =document.querySelectorAll(".main_content:nth-child(1) li");
    var timer = setInterval(function () {
        //判断是否小于0
        if(totalSec<=0){
            clearInterval(timer);
            return false;
        }
        totalSec--;
        var hour = Math.floor(totalSec/3600);
        var minute =Math.floor(totalSec%3600/60);
        var sec = totalSec%60;
        liArr[0].innerHTML =Math.floor(hour/10);
        liArr[1].innerHTML =hour%10;
        liArr[3].innerHTML =Math.floor(minute/10);
        liArr[4].innerHTML =minute%10;
        liArr[6].innerHTML =Math.floor(sec/10);
        liArr[7].innerHTML =sec%10;
    },1000)
}
//轮播图方法
//获取必须知道的变量，不考虑过度效果，直接刷刷刷切换，定时器中index++判断是否越界,修改轮播图ul的位置
function banner() {
    //1获取变量
    //屏幕宽度
    var width = document.body.offsetWidth;
//    获取轮播图的UL
   var moveUl = document.querySelector(".banner_images");

   var indexLiArr = document.querySelectorAll(".banner_index li");
    // 定义index记录当前的索引值
    var index = 1;
    var timer = setInterval(function () {
        // 累加
        index++;

        // 将 过渡开启 管你三七二十一 只要进来 就开启过渡 保证 过渡效果一直存在
        moveUl.style.transition = 'all 0.5s';

        // 修改 ul的位置
        moveUl.style.transform = 'translateX('+index*width*-1+'px)';

    },1000);


    // 过渡 结束事件 用来 修正 index的值 并修改索引


    moveUl.addEventListener('webkitTransitionEnd',function () {
        console.log('过渡结束');

        //  如果 index 太大了
        if (index>3) {
            index = 1;

            // 关闭过渡
            moveUl.style.transition = '';

            // 瞬间 修改一下 ul 的位置
            moveUl.style.transform = 'translateX('+index*width*-1+'px)';
        }else if(index<1){
            // 跳到倒数第二张
            index= 3;

            // 关闭过渡
            moveUl.style.transition = '';

            // 瞬间 修改一下 ul 的位置
            moveUl.style.transform = 'translateX('+index*width*-1+'px)';
        }

        // 修改 索引li标签的 class
        for (var i = 0; i < indexLiArr.length; i++) {
            indexLiArr[i].className = '';
        }

        // 有一个 1的 差值
        indexLiArr[index-1].className = 'current';

    });

    //定义变量 记录开始的X
    var startX = 0;
    var moveX =0;
    var distanceX = 0;
    // 触摸开始
    moveUl.addEventListener('touchstart',function (event) {
        // 关闭定时器
        clearInterval(timer);

        // 关闭过渡效果
        moveUl.style.transition = '';

        // 记录开始值
        startX = event.touches[0].clientX;

    })

    // 触摸中
    moveUl.addEventListener('touchmove',function (event) {
        // 计算移动的值
        moveX = event.touches[0].clientX - startX;

        // 移动ul
        // 默认的移动值是 index*-1*width
        moveUl.style.transform = 'translateX('+(moveX+index*-1*width)+'px)';
    })
    //触摸结束时
    // 手指松开的时候 判断 移动的距离 进行 是否吸附
    // 由于 不需要考虑 正负 只需要考虑 距离 Math.abs()
    // 吸附回的值是 index*-1*width
    // 如果移动的距离较大
    // 需要判断正负
    // index++;
    // index--;
    // index*-1*width

    moveUl.addEventListener("touchend", function (event) {
            var maxDistance = width/2;
            if(Math.abs(moveX)>maxDistance){
                if (moveX>0) {
                    index--;
                }else{
                    index++;
                }
                moveUl.style.transition ="all 0.5s";
                moveUl.style.transform = 'translateX('+(index*-1*width)+'px)'
            }else{
        //        说明没有超过一半宽度吸附回去即可
        //        开启过渡好看
                moveUl.style.transition ="all 0.5s";
                moveUl.style.transform = 'translateX('+(index*-1*width)+'px)';

        }
    //    记录结束时
    //    开启定时器
         timer = setInterval(function () {
             index++;

             // 将 过渡开启 管你三七二十一 只要进来 就开启过渡 保证 过渡效果一直存在
             moveUl.style.transition = 'all 0.5s';

             // 修改 ul的位置
             moveUl.style.transform = 'translateX('+index*width*-1+'px)';
         },1000)
    })
}
