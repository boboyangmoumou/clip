window.onload=function(){
    document.onselectstart=new Function('event.returnValue=false;');
    var main=document.getElementById("main");
    var box=document.getElementById("box");
    var mainbox=document.getElementById("mainbox");
    var left=document.getElementById("left");
    var right=document.getElementById("right");
    var top = document.getElementById("top");
    var bottom = document.getElementById("bottom");
    var leftTop =document.getElementById("left-top");
    var rightTop =document.getElementById("right-top");
    var leftBottom =document.getElementById("left-bottom");
    var rightBottom =document.getElementById("right-bottom");
    var key=false;//鼠标按下状态
    var content = "";//表示被按下的触点

    left.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        content="left";
    }

    right.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        content="right";
    }

    top.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        content="top";
    }

    bottom.onmousedown=function(e) {
        e.stopPropagation();
        key=true;
        content="bottom";
    }

    leftTop.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        content="left-top";
    }

    leftBottom.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        content="left-bottom";
    }

    rightTop.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        content="right-top";
    }

    rightBottom.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        content="right-bottom";
    }

    //鼠标松开事件
    window.onmouseup = function(){
        key= false;
    }

    //鼠标移动事件
    window.onmousemove=function(e){
        if(key==true){
            switch (content){
                case "left": leftMove(e);break;
                case "right": rightMove(e);break;
                case "top" : topMove(e); break;
                case "bottom": bottomMove(e);break;
                case "left-top":leftMove(e); topMove(e);break;
                case "left-bottom":leftMove(e); bottomMove(e);break;
                case "right-top":rightMove(e); topMove(e);break;
                case "right-bottom":rightMove(e); bottomMove(e);break;
            }
        }
        choose();
        see();
    }

    //leftMove
    function leftMove(e){
        var x=e.clientX;//鼠标x
        if(x<local(main).left){
            x=local(main).left;
        }
        var mainX = local(box).left;
        var addWidth = mainX-x; //增加的宽度
        var widthbefore=box.offsetWidth-2;//原来的宽度
        //设置拖动后的宽高和位置
        box.style.width= widthbefore+addWidth+"px";
        box.style.left=box.offsetLeft-addWidth+"px";
    }

    //rightMove
    function rightMove(e){
        var x = e.clientX;
        if(x>(local(main).left+main.offsetWidth-2)){
            x=local(main).left+main.offsetWidth-2;
        }
        var addWidth = "";//鼠标移动后选取框增加的宽度
        var widthbefore = box.offsetWidth - 2;//选取框变化前的宽度
        addWidth = x - local(box).left - widthbefore ;//鼠标移动或增加的宽度

        //设置拖动后的宽高和位置
        box.style.width = addWidth + widthbefore + "px";
    }

    //topMove
    function topMove(e){
        var y=e.clientY;
        if(y<local(main).top){
            y=local(main).top;
        }
        var Heightbefore=box.offsetHeight-2;//选取框之前的高度
        var mainY=local(box).top;
        var addHeight=mainY-y;//增加的高度

        //设置拖动后的宽高和位置
        box.style.height = Heightbefore+addHeight + "px";
        box.style.top = box.offsetTop-addHeight + "px";
    }

    //bottomMove
    function bottomMove(e){
        var y=e.clientY;
        if(y>(main.offsetHeight+local(main).top-2)){
            y=main.offsetHeight+local(main).top-2;
        }
        var Heightbefore=box.offsetHeight-2;//选框之前的高度
        var mainY=local(box).top;

        var addHeight=y-mainY-Heightbefore;//增加的高度
        //设置拖动后的宽高和位置
        box.style.height = (Heightbefore + addHeight) + "px";
    }

    //获取元素相对于屏幕左边的距离
    function local(item){
        var left=item.offsetLeft;
        var top=item.offsetTop;
        var parent=item.offsetParent;//元素最近的经过定位(position不等于static)的父级元素
        while(parent != null){ // 一直循环直到根元素
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent=parent.offsetParent;
        }
        return {"left":left,"top":top};
    }


    //选中区域
    function choose(){
        var top=box.offsetTop;
        var right=box.offsetLeft+box.offsetWidth;
        var bottom=box.offsetTop+box.offsetHeight;
        var left=box.offsetLeft;
        var img2=document.getElementById("img2");
        img2.style.clip="rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
    }
    //预览
     function see() {
         var img3=document.getElementById("img3");
         var top=box.offsetTop;
         var right=box.offsetLeft+box.offsetWidth;
         var bottom=box.offsetTop+box.offsetHeight;
         var left=box.offsetLeft;
         img3.style.top= -top+ "px";
         img3.style.left= -left + "px";
         img3.style.clip="rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
     }
};