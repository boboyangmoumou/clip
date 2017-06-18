window.onload=function(){
    var main=document.getElementById("main");
    var box=document.getElementById("box");
    var mainbox=document.getElementById("mainbox");
    var left=document.getElementById("left");
    var right=document.getElementById("right");
    var key=false;//鼠标按下状态
    var content = "";//表示被按下的触点

    left.onmousedown=function(e){
        e.stopPropagation();
        key=true;
        content="left";
    }

    right.onmousemove=function(e){
        e.stopPropagation();
        key=true;
        content="right";
    }

    //鼠标松开事件
    window.onmouseup = function(){
        key= false;
    }

    //鼠标移动事件
    window.onmousemove=function(e){
        if(key==true){
            switch (content){
                case "left": leftmove(e);break;
                case "right": rightmove(e);break;
                
            }
        }
    }

    //leftmove
    function leftmove(e){
        var x=e.clientX;//鼠标x
        var mainX = local(box).left;
        var addWidth = mainX-x; //增加的宽度
        var widthbefore=box.offsetWidth-2;//原来的宽度
        box.style.width= widthbefore+addWidth+"px";
        box.style.left=box.offsetLeft-addWidth+"px";
    }

    //rightmove
    function rightmove(e){
        var x = e.clientX;
        var addWidth = "";//鼠标移动后选取框增加的宽度
        var widthbefore = box.offsetWidth - 2;//选取框变化前的宽度
        addWidth = x - local(box).left - widthbefore ;//鼠标移动或增加的宽度
        box.style.width = addWidth + widthbefore + "px";
    }

    //获取元素相对于屏幕左边的距离
    function local(item){
        var left=item.offsetLeft;
        var top=item.offsetTop;
        var parent=item.offsetParent;//元素最近的经过定位(position不等于static)的父级元素
        while(parent != null){
            left += parent.offsetLeft;
            top += parent.offsetTop;
            parent=parent.offsetParent;
        }
        return {"left":left,"top":top};
    }


    //选中区域
    // function choose(){
    //     var top=box.offsetTop;
    //     var right=box.offsetLeft+box.offsetWidth;
    //     var bottom=box.offsetTop+box.offsetHeight;
    //     var left=box.offsetLeft;
    //     var img2=document.getElementById("img2");
    //     img2.style.clip="rect("+top+"px,"+right+"px,"+bottom+"px,"+left+"px)";
    // }

};