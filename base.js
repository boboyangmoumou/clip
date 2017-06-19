window.onload=function(){
    document.onselectstart=new Function('event.returnValue=false;');
    //取消图片的默认事件
    document.getElementById('img1').onmousedown = function(e){
        e.preventDefault()
    };
    document.getElementById('img2').onmousedown = function(e){
        e.preventDefault()
    };
    document.getElementById('img3').onmousedown = function(e){
        e.preventDefault()
    };
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
    var mouseOffsetX="";
    var mouseOffsetY="";
    var moveX=""; //元素新位置，先初始化
    var moveY="";
    box.onmousedown=function(e){
        var e = e || window.event;
        e.stopPropagation();
        key=true;
        content="MOVE";
        var moveX=0; //元素新位置，先初始化
        var moveY=0;
        mouseOffsetX = e.clientX-box.offsetLeft;//鼠标位置
        mouseOffsetY = e.clientY-box.offsetTop;
        e.onselectstart = function(){//防止底层图片拖动
            return false;
        }
    }

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
    window.onmouseup = function(e){
        e.stopPropagation();
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
                case "MOVE": boxMove(e);break;
            }
        }
        choose();
        see();
    }

    //boxmove拖拽
    function boxMove(e){
        var oWidth=main.offsetWidth-box.offsetWidth;
        var oHeight=main.offsetHeight-box.offsetHeight;
        console.log(main.offsetWidth);
        var e = e || window.evnet;

        var mouseX = e.clientX;//鼠标当前位置
        var mouseY = e.clientY;


        if(key===true){
            moveX=mouseX-mouseOffsetX;
            moveY=mouseY-mouseOffsetY;
        }
        if(moveX<0){
            moveX=0;
        }else if(moveX>oWidth){
            moveX=oWidth;
        }
        if(moveY<0){
            moveY=0;
        }else if(moveY>oHeight){
            moveY=oHeight;
        }
        box.style.left=moveX+ "px";
        box.style.top=moveY+ "px";
        if(e.stopPropagation){
            e.stopPropagation();
        }
        return false;
    }



    //leftMove
    function leftMove(e){
        var x=e.clientX;//鼠标x
        if(x<local(main).left){
            x=local(main).left;
        }else if(x>(local(main).left+main.offsetWidth-2)){
            x=local(main).left+main.offsetWidth-2
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
        }else if(x<local(main).left){
            x=local(main).left;
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
        }else if(y>(main.offsetHeight+local(main).top-2)){
            y=(main.offsetHeight+local(main).top-2)
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
        }else if(y<local(main).top){
            y=local(main).top;
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